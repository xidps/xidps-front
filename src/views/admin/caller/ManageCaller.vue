<script lang="ts" setup>

import EditHandler from "@/components/CrudDataTable/EditHandlerGroup/EditHandler.vue";
import {EditHandlerStyle, IEditHandler} from "@/types/datagridview/EditHandlerGroup/EditHandler/IEditHandler";
import SearchTextBox from "@/components/CrudDataTable/EditHandlerGroup/SearchTextBox.vue";
import {EditStatus, EInputStatus, ICrudDataTable, ICrudRow} from "@/types/datagridview/crudDataTable";
import {reactive} from "vue";
import {useModal} from "@/composables/useModal";
import CustomModal from "@/components/CustomModal";
import CallerUploadForm from "@/views/admin/caller/CallerUploadForm.vue";
import {ICaller, IEditCaller} from "@/views/admin/caller/type";


/**
 * @description page types
 */
interface IManageCallerPage {
  editCallerId: IEditCaller;
  table: ICrudDataTable;
  index: number;
}

/**
 * create default edit caller method
 */
function createDefaultEditCaller(): IEditCaller {
  return {
    status: '',
    manager: '',
    department: '',
    memo: '',
  }
}

/**
 * component use data
 */
const state = reactive<IManageCallerPage>({
  table: {
    rows: [],
    headers: [{
      value: 'callerNumber',
      text: '발신번호',
      align: 'center',
      width: '100px',
      searchAble: true,
    },
      {
        value: 'manager',
        text: '담당자',
        align: 'center',
        width: '200px',
        searchAble: true,
      },
      {
        value: 'department',
        text: '조직',
        align: 'center',
        width: '150px',
        searchAble: true,
      },
      {
        value: 'status',
        text: '상태',
        align: 'center',
        width: '150px',
        searchAble: true,
      },
      {
        value: 'memo',
        text: '메모',
        align: 'center',
        width: '150px',
        searchAble: true,
      },
      {
        value: '',
        text: '관리',
        align: 'center',
        width: '150px',
        searchAble: false,
      }],
    usePageable: true,
    tableTitle: '발신번호 관리',
    selectedKey: 'key',
  },
  editCallerId: createDefaultEditCaller(),
  index: 0,
})
const {modal, handleOpenModal, handleCloseModal} = useModal({
  title: "발신번호 관리",
  isShow: false,
  width: 900
});

const page = reactive({
  pageCount: 0,
  nowPage: 1,
  keys: [],
})

/**
 * create default caller
 * @param index now data index
 * @param callerId use caller id
 */
function createDefaultCaller(index: number, callerId: string): ICaller {
  return {
    key: index,
    inputStatus: EInputStatus.INSERT,
    editStatus: EditStatus.EDIT_COMPLETION_STATUS,
    callerId: callerId,
    manager: '',
    department: '',
    status: '',
    memo: '',
  };
}

/**
 * 임시 데이터 집어넣기
 */
for(let i = 0 ; i < 150;i++){
  state.table.rows.push(createDefaultCaller(state.index++,"1"))
}

/**
 * 새로운 발신번호를 하나 생성합니다.
 * 이미 모달 창이 열려있는 상태기 때문에 해당 모달창을 닫습니다
 * */
function insertNewCaller(callerNumber: string) {
  state.table.rows.unshift(createDefaultCaller(state.index += 1, callerNumber));
  handleCloseModal();
}

/**
 * 테이블 마다 가지는 고유한 키를 통해서 해당 row를 가져옵니다.
 * @param key
 */
function findIndexByKey(key: number) {
  return state.table.rows.findIndex(caller => caller.key === key);
}

/**
 * row 의 편집 모드를 활성화 합니다.
 * @param key
 */
function handleEditStart(key: number) {
  const findCaller = state.table.rows[findIndexByKey(key)] as ICaller;

  Object.assign(findCaller, {
    editStatus: EditStatus.EDITING_STATUS
  });

  Object.assign(state.editCallerId, {
    ...findCaller as IEditCaller
  });
}

/**
 * row 의 편집 모드를 종료 시키며 해당 내용을 저장합니다/
 * @param key
 */
function handleEditEnd(key: number) {
  const findCaller = state.table.rows[findIndexByKey(key)] as ICaller;

  Object.assign(findCaller, {
    ...state.editCallerId,
    inputStatus: findCaller.inputStatus === EInputStatus.SELECT ? EInputStatus.UPDATE : findCaller.inputStatus,
    editStatus: EditStatus.EDIT_COMPLETION_STATUS
  })
}

/**
 * row 의 편집 모드를 취소 시키며 해당 내용을 저장하지 않습니다.
 * @param key
 */
function handleEditCancel(key: number) {
  const findIndex = findIndexByKey(key);
  state.table.rows[findIndex].editStatus = EditStatus.EDIT_COMPLETION_STATUS;
}

/**
 * handle methods
 */

function handleSave() {
  state.table.rows.forEach((row) => {
    Object.assign(row, {inputStatus: EInputStatus.SELECT});
  })
}

function handleRemove() {
  page.keys.reverse().forEach((caller) => {
    state.table.rows.splice(state.table.rows.indexOf(caller), 1);
  })
  page.keys = [];
}

const updatedRow = (item: ICrudRow) => {
  if (item.inputStatus === EInputStatus.UPDATE) {
    return {updated: true}
  }
  return {updated: false};
}
/**
 * @description edit handler group
 */
const handlerGroup: Record<string, IEditHandler> = {
  delete: {
    handlerStyle: EditHandlerStyle.DELETE,
    text: "삭제하기",
    event: handleRemove
  },
  add: {
    handlerStyle: EditHandlerStyle.IMPORT,
    icon: 'mdi-plus',
    text: "발신번호 추가",
    event: handleOpenModal
  },
  save: {
    handlerStyle: EditHandlerStyle.SAVE,
    text: "저장하기",
    event: handleSave
  }
}

const searchHeaders = state.table.headers.filter(header=> header.searchAble).map(header=> ({
  text: header.text,
  value: header.value
}))


</script>

<template>
  <v-card class="pa-3">
    <custom-modal :modal="modal" @close="handleCloseModal">
      <caller-upload-form @approve:number="insertNewCaller"></caller-upload-form>
    </custom-modal>
    <v-card-actions>
      <div>
        <span class="fw-semi-bold light-navy-blue fs-3">발신번호 관리</span>
        <div>
          <span class="fs-5 warm-gry fw-regular">TOTAL : {{state.table.rows.length}} 건</span>
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <search-text-box :items="searchHeaders" class="mr-2 mt-1"></search-text-box>
        <edit-handler v-for="(handler,key) in handlerGroup" class="mr-2" :handler="handler" :key="key"></edit-handler>
      </div>
    </v-card-actions>

    <v-data-table
        v-model="page.keys"
        class="data-grid-view"
        height="755"
        item-key="key"
        selectable-key="key"
        :disable-pagination="false"
        :show-select="true"
        :headers="state.table.headers"
        :items="state.table.rows"
        :page.sync='page.nowPage'
        :footer-props="{'items-per-page-options': [20]}"
        @page-count='page.pageCount = $event'
        hide-default-footer dense
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
            <td>{{ item.callerId }}</td>
            <td>
              <v-text-field hide-details outlined :value="item.manager" v-model='state.editCallerId.manager'
                            dense></v-text-field>
            </td>
            <td>
              <v-text-field hide-details outlined :value="item.department" v-model='state.editCallerId.department'
                            dense></v-text-field>
            </td>
            <td>
              <v-text-field hide-details outlined :value="item.status" v-model='state.editCallerId.status'
                            dense></v-text-field>
            </td>
            <td>
              <v-text-field hide-details outlined :value="item.dense" v-model='state.editCallerId.memo'
                            dense></v-text-field>
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
            <td>{{ item.callerId }}</td>
            <td>{{ item.manager }}</td>
            <td>{{ item.department }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.memo }}</td>
            <td>
              <v-btn @click="handleEditStart(item.key)" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </td>
          </template>
        </tr>
      </template>
    </v-data-table>

    <v-pagination v-model='page.nowPage' :length='page.pageCount' :total-visible='10'></v-pagination>
  </v-card>
</template>

<style lang="scss" scoped>
@import "~@/styles/common/dataTable/crudDataTable.scss";

.updated {
  border-left: 6px solid #8e9bff !important;
  margin-left: 6px !important;
}
</style>
