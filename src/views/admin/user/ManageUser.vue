<script lang="ts" setup>
import {EditStatus, EInputStatus, ICrudDataTable, ICrudRow} from "@/types/datagridview/crudDataTable";
import {EMessageDivision} from "@/views/admin/user/index";
import {computed, onMounted, reactive} from "vue";
import {EditHandlerStyle, IEditHandler} from "@/types/datagridview/EditHandlerGroup/EditHandler/IEditHandler";
import SearchTextBox from "@/components/CrudDataTable/EditHandlerGroup/SearchTextBox.vue";
import EditHandler from "@/components/CrudDataTable/EditHandlerGroup/EditHandler.vue";
import {useAxios} from "@vueuse/integrations/useAxios";
import AxiosService from "@/api";
import {useModal} from "@/composables/useModal";
import CustomModal from "@/components/CustomModal/CustomModal.vue";
import ExcelImporter from "@/views/admin/user/ExcelImporter.vue";
import {
  IEditIndividualMessage,
  IEditUser,
  IManageUserPage,
  IMessageDivision,
  IResponseDivisionValueList, IUserRow
} from "@/types/views/admin/user";


function createDefaultEditUser(): IEditUser {
  return {
    name: '',
    phoneNumber: '',
    divisionValue: '',
    var1: '',
    var2: '',
    var3: '',
    var4: '',
  };
}

function createDefaultIndividualMessage(): IEditIndividualMessage {
  return {
    useAble: false,
    limitMessage: {
      PUSH: 0,
      LMS: 0,
      MMS: 0,
      SMS: 0
    }
  }
}


const state = reactive<IManageUserPage>({
  entireDivisionValue: {
    [EMessageDivision.PUSH]: 300,
    [EMessageDivision.SMS]: 3000,
    [EMessageDivision.LMS]: 3000,
    [EMessageDivision.MMS]: 3000,
  },
  table: {
    rows: [],
    headers: [
      {
        text: 'ID', value: 'id', width: '100px', align: 'center', searchAble: true,
      },
      {
        text: '이름', value: 'name', width: '200px', align: 'center', searchAble: true,
      },
      {
        text: '연락처', value: 'number', width: '200px', align: 'center', searchAble: true,
      },
      {
        text: '구분값', value: 'position', width: '200px', align: 'center', searchAble: true,
      },
      {
        text: '변수1', value: 'var1', width: '200px', align: 'center', searchAble: true,
      },
      {
        text: '변수2', value: 'var2', width: '200px', align: 'center', searchAble: true,
      },
      {
        text: '변수3', value: 'var3', width: '200px', align: 'center', searchAble: true,
      },
      {
        text: '변수4', value: 'var4', width: '200px', align: 'center', searchAble: true,
      },
      {
        text: '관리', value: '', width: '150px', align: 'center', searchAble: false,
      }],
  },
  editUser: createDefaultEditUser(),
  editIndividualMessage: createDefaultIndividualMessage(),
  index: 0,
})
const limitMessageState = reactive({
  entireDivision: [{}] as IMessageDivision[]
})
const page = reactive({
  pageCount: 0,
  nowPage: 1,
  keys: [],
});

const {modal, handleCloseModal, handleOpenModal} = useModal({isShow: false, title: "엑셀블러오기", width: 900})
onMounted(async () => {
  const {execute} = useAxios<IResponseDivisionValueList>(AxiosService.instance);
  const {response: {value}} = await execute("/user/mbs/max", {
    method: "GET"
  });
  if (!value) {
    return;
  }
  limitMessageState.entireDivision = value.data;
})
const entireDivision = computed(() => limitMessageState.entireDivision.map(i => i.divisionValue))

function createDefaultUser(): IUserRow {
  // eslint-disable-next-line no-return-assign
  return {
    key: state.index += 1,
    editStatus: EditStatus.EDIT_COMPLETION_STATUS,
    inputStatus: EInputStatus.INSERT,
    userId: '',
    name: '',
    phoneNumber: '',
    divisionValue: '',
    var1: '',
    var2: '',
    var3: '',
    var4: '',
    individualMessage: null
  };
}

function handleAddUser() {
  state.table.rows.unshift(createDefaultUser());
}

function findIndexByKey(key: number) {
  return state.table.rows.findIndex((user) => user.key === key);
}

function handleEditStart(key: number) {
  const findIndex = findIndexByKey(key);
  const findUser = state.table.rows[findIndex] as IUserRow;
  findUser.editStatus = EditStatus.EDITING_STATUS;
  Object.assign(state.editUser, {
    ...findUser as IEditUser,
  });
}

function handleEditEnd(key: number) {
  const findIndex = findIndexByKey(key);
  Object.assign(state.table.rows[findIndex], {
    ...state.editUser,
    inputStatus: state.table.rows[findIndex].inputStatus === EInputStatus.SELECT && EInputStatus.UPDATE,
    editStatus: EditStatus.EDIT_COMPLETION_STATUS
  });
}

function handleEditCancel(key: number) {
  const findIndex = findIndexByKey(key);
  state.table.rows[findIndex].editStatus = EditStatus.EDIT_COMPLETION_STATUS;
}

/**
 * 사용자 데이터를 저장하는 함수 입니다.
 */
function handleSave() {
  state.table.rows.forEach((row) => {
    Object.assign(row, {inputStatus: EInputStatus.SELECT});
  });
}

function handleRemove() {
  page.keys.reverse().forEach((caller) => {
    state.table.rows.splice(state.table.rows.indexOf(caller), 1);
  });
  page.keys = [];
}

function handleChangeItems(item: string) {
  state.entireDivisionValue = limitMessageState.entireDivision
      .filter(i => i.divisionValue === item)[0]
      .limitMessage;
}

const updatedRow = (item: ICrudRow) => {
  return {updated: item.inputStatus === EInputStatus.UPDATE};
}

function handleEditStartIndividualMessage(key:number){
  const findIndex = findIndexByKey(key);
  const findUser = state.table.rows[findIndex] as IUserRow;

  Object.assign(state.editIndividualMessage,{
    ...createDefaultIndividualMessage()
  });

  state.editIndividualMessage = createDefaultIndividualMessage();
}

const handlerGroup: Record<string, IEditHandler> = {
  personalize: {
    handlerStyle: EditHandlerStyle.IMPORT,
    icon: "mdi-account-cog",
    text: "개인설정 사용자 모아보기",
    event: () => 1
  },
  delete: {
    handlerStyle: EditHandlerStyle.DELETE,
    icon: 'mdi-delete',
    text: "삭제하기",
    event: handleRemove
  },
  excel: {
    handlerStyle: EditHandlerStyle.IMPORT,
    icon: 'mdi-plus',
    text: "엑셀로 추가",
    event: handleOpenModal
  },
  add: {
    handlerStyle: EditHandlerStyle.IMPORT,
    icon: 'mdi-plus',
    text: "추가 하기",
    event: handleAddUser
  },
  save: {
    handlerStyle: EditHandlerStyle.SAVE,
    text: "저장하기",
    icon: 'mdi-content-save',
    event: handleSave
  }
}

</script>

<template>
  <div>
    <custom-modal :modal="modal" @close="handleCloseModal">
      <excel-importer></excel-importer>
    </custom-modal>
    <v-card class='division-setting'>
      <v-card-title>
        <span class='fs-4'>구분값 설정</span>
      </v-card-title>
      <v-card-text>
        <v-row class="align-center">
          <v-col mb='8' sm='2' style='flex-basis: 300px'>
            <v-select dense hide-details outlined :items="entireDivision" @change="handleChangeItems"></v-select>
          </v-col>
          <v-col v-for="(item,key) in state.entireDivisionValue" :key="key">
            <div class='d-flex' style="width: 172px !important;">
              <v-radio :label='key'></v-radio>
              <v-text-field suffix='건' dense hide-details :value="item" class='mb-2'></v-text-field>
            </div>
          </v-col>
          <v-col mb="1" sm="1">
            <v-btn class="ma-0 light-navy-button">저장</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-5 pa-5">
      <v-card-actions>
        <div>
          <span class="fw-semi-bold light-navy-blue fs-3">사용자 관리</span>
          <div>
            <span class="fs-5 warm-gry fw-regular">TOTAL : 건</span>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex">
          <search-text-box class="mr-2 mt-1"></search-text-box>
          <edit-handler v-for="(handler,key) in handlerGroup" class="mr-2" :handler="handler" :key="key"></edit-handler>
        </div>
      </v-card-actions>
      <v-data-table
          v-model="page.keys"
          class="data-grid-view"
          item-key="key"
          height="755"
          :disable-pagination="false"
          :show-select="true"
          :headers="state.table.headers"
          :items="state.table.rows"
          :footer-props="{itemsPerPageOptions:[20]}"
          hide-default-footer dense


          :page.sync='page.nowPage'
          selectable-key='key'
          @page-count='page.pageCount = $event'
      >
        <template v-slot:item="{item,index,isSelected,select}">
          <tr :key='index' v-if="!item.individualMessage">
            <td class='fixed' :class='updatedRow(item)'>
              <v-checkbox
                  :input-value='isSelected'
                  @click='select(item)'
                  dense hide-details></v-checkbox>
            </td>
            <template v-if="item.editStatus === EditStatus.EDITING_STATUS">
              <td>{{ item.userId }}</td>
              <td>
                <v-text-field dense outlined hide-details v-model='state.editUser.name'
                              :value='item.name'></v-text-field>
              </td>
              <td>
                <v-text-field dense outlined hide-details v-model='state.editUser.phoneNumber'
                              :value='item.phoneNumber'></v-text-field>
              </td>
              <td>
                <v-text-field dense outlined hide-details v-model='state.editUser.divisionValue'
                              :value='item.divisionValue'></v-text-field>
              </td>
              <td>
                <v-text-field dense outlined hide-details v-model='state.editUser.var1'
                              :value='item.var1'></v-text-field>
              </td>
              <td>
                <v-text-field dense outlined hide-details v-model='state.editUser.var2'
                              :value='item.var2'></v-text-field>
              </td>
              <td>
                <v-text-field dense outlined hide-details v-model='state.editUser.var3'
                              :value='item.var3'></v-text-field>
              </td>
              <td>
                <v-text-field dense outlined hide-details v-model='state.editUser.var4'
                              :value='item.var4'></v-text-field>
              </td>
              <td>
                <v-btn @click="handleEditEnd(item.key)" icon>
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn @click="handleEditCancel(item.key)" icon>
                  <v-icon>mdi-cancel</v-icon>
                </v-btn>
              </td>
            </template>
            <template v-else>
              <td>{{ item.userId }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.phoneNumber }}</td>
              <td>{{ item.divisionValue }}</td>
              <td>{{ item.var1 }}</td>
              <td>{{ item.var2 }}</td>
              <td>{{ item.var3 }}</td>
              <td>{{ item.var4 }}</td>
              <td>
                <v-btn @click="handleEditStart(item.key)" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon @click="item.individualMessage=true">mdi-cog</v-icon>
                </v-btn>
              </td>
            </template>
          </tr>
          <tr v-else>
            <td :class='updatedRow(item)' colspan="9">
              <div class="d-flex justify-space-between">
                <v-checkbox label="개인설정사용" hide-details dense></v-checkbox>
                <div v-for="(item,key) in state.entireDivisionValue" :key="key">
                  <div class='d-flex' style="width: 172px !important;">
                    <v-checkbox :label='key' dense hide-details></v-checkbox>
                    <v-text-field suffix='건' dense hide-details :value="item" class='mb-2'></v-text-field>
                  </div>
                </div>

              </div>
            </td>
            <td>
              <v-btn icon>
                <v-icon>mdi-content-save-cog</v-icon>
              </v-btn>
              <v-btn icon @click="item.individualMessage=false">
                <v-icon>mdi-cancel</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/styles/common/dataTable/crudDataTable.scss";

.updated {
  border-left: 6px solid #8e9bff !important;
  margin-left: 6px !important;
}

.division-setting {
  min-height: 150px;

  span {
    color: $light-navy-blue;;
  }
}
</style>

