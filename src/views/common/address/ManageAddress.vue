<script lang="ts" setup>

import {IUserRow} from "@/types/views/admin/user";
import {computed, reactive} from "vue";
import AddressBook from "@/views/common/address/AddressBook.vue";
import {
  IAddressBook,
  IClickItemPayload,
  IEditAddressPayload
} from "@/types/views/common/address";
import {EditStatus, EInputStatus, ICrudDataTable, ICrudDataTableHeader} from "@/types/datagridview/crudDataTable";
import {useModal} from "@/composables/useModal";
import CustomModal from "@/components/CustomModal/CustomModal.vue";
import SearchTextBox from "@/components/CrudDataTable/EditHandlerGroup/SearchTextBox.vue";
import EditHandlerGroup from "@/components/CrudDataTable/EditHandlerGroup/EditHandlerGroup.vue";
import EditHandler from "@/components/CrudDataTable/EditHandlerGroup/EditHandler.vue";
import {EditHandlerStyle, IEditHandler} from "@/types/datagridview/EditHandlerGroup/EditHandler/IEditHandler";
import FindUserForm from "@/views/common/address/FindUserForm.vue";
import {useLoggerStore} from "@/store/logger/useLoggerStore";

/**
 * declare ManageAddress page type
 */
interface ManagedAddressPage extends ICrudDataTable {
  /**
   * 주소록의 전체 데이터 입니다.
   */
  addressBook: IAddressBook[],
  /**
   * 주소록의 고유 식별 인덱스 입니다.
   */
  addressIndex: number,

  /**
   * 현재 선택한 트리뷰의 항목입니다.
   */
  selectedAddress: IAddressBook | null;
  /**
   * 주소록에서 선택된 사용자의 목록을 표시해주는 헤더입니다.
   */
  findUserHeaders: ICrudDataTableHeader[],

  selected: boolean;
  selectedTable: IUserRow[]
}

/**
 * declare ManageAddress page data
 */
const data = reactive<ManagedAddressPage>({
  rows: [{}] as IUserRow[],
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
    }] as ICrudDataTableHeader[],
  selectedKey: 'key',
  usePageable: true,
  tableTitle: '주소록관리',
  selected: false,
  selectedTable: [],
  addressBook: [],
  addressIndex: 0,
  selectedAddress: null,
  findUserHeaders: [
    {
      text: 'ID', value: 'id', width: '100px', align: 'center', searchAble: true,
    },
    {
      text: '이름', value: 'name', width: '150px', align: 'center', searchAble: true,
    },
    {
      text: '연락처', value: 'number', width: '150px', align: 'center', searchAble: true,
    },
    {
      text: '구분값', value: 'position', width: '100px', align: 'center', searchAble: true,
    },
  ],
});
/**
 * modal
 */
const importModalSelect = useModal({isShow: false, title: '', width: 530});
const excelImportModal = useModal({isShow: false, title: '엑셀로 불러오기'});
const userImportModal = useModal({isShow: false, title: '사용자 추가로 주소록 생성', width: 680});

/**
 * page
 */
const page = reactive({
  pageCount: 0,
  nowPage: 1,
  keys: [],
});
const createDefaultAddress = (): IAddressBook => ({
  id: data.addressIndex += 1,
  name: '(제목없음)',
  children: [],
  users: [],
  editStatus: EditStatus.EDIT_COMPLETION_STATUS
});

const addNewAddressBook = () => {
  if (data.selectedAddress === null) {
    data.addressBook.push(createDefaultAddress());
    return;
  }

  data.selectedAddress.children.push(createDefaultAddress());
};


const updateTableName = (payload: IClickItemPayload) => {
  data.selectedAddress = payload.item;

  if (payload.item === null) {
    data.tableTitle = '선택되지 않음';
    data.selectedTable = [];
    data.selected = false;
    return;
  }
  data.tableTitle = payload.item.name;
  data.selectedTable = payload.item.users;
  data.selected = true;
};

function createDefaultUser(): IUserRow {
  return {
    inputStatus: EInputStatus.INSERT,
    editStatus: EditStatus.EDIT_COMPLETION_STATUS,
    userId: '',
    divisionValue: '',
    name: '',
    key: data.addressIndex += 1,
    var1: '',
    var2: '',
    var3: '',
    var4: '',
    phoneNumber: '',
    individualMessage: null
  };
}

function handleAddUser() {
  console.log(data.selectedTable);
  data.selectedTable?.unshift(createDefaultUser());
}

function handleEditStart(item: IAddressBook) {
  item.editStatus = EditStatus.EDITING_STATUS;
}

function handleAddressEndEdit(payload: IEditAddressPayload) {
  data.tableTitle = payload.editText;
  payload.item.editStatus = EditStatus.EDIT_COMPLETION_STATUS;
  payload.item.name = payload.editText;

}

function handleAddressCancelEdit(item: IAddressBook) {
  item.editStatus = EditStatus.EDIT_COMPLETION_STATUS;
}

function handleDeleteAddress(item: IAddressBook) {
  if (item.children.length) {
    useLoggerStore().error({
      message: "해당 그룹은 삭제할 수 없는 그룹으로 포함하는 다른 그룹들을 먼저 삭제하세요."
    })
    return;
  }
}

const handlerGroup: Record<string, IEditHandler> = {
  delete: {
    handlerStyle: EditHandlerStyle.DELETE,
    icon: 'mdi-delete',
    text: "삭제",
    event: () => 1,
  },
  excel: {
    handlerStyle: EditHandlerStyle.IMPORT,
    icon: 'mdi-plus',
    text: "사용자 / 엑셀 추가",
    event: () => {
      importModalSelect.handleOpenModal();
    },
  },
  add: {
    handlerStyle: EditHandlerStyle.IMPORT,
    icon: 'mdi-plus',
    text: "추가",
    event: handleAddUser
  },
  save: {
    handlerStyle: EditHandlerStyle.SAVE,
    text: "저장하기",
    icon: 'mdi-content-save',
    event: () => 1,
  }
}

const handlerDisable = computed(() => !data.selected)
</script>

<template>
  <v-row>
    <custom-modal :modal="importModalSelect.modal" @close='importModalSelect.handleCloseModal()'>
      <v-row>
        <v-col>
          <v-btn class='import-select-btn light-navy-button'
                 @click='importModalSelect.handleCloseModal();userImportModal.handleOpenModal()'>
            <div>
              <v-icon size='64'>mdi-file</v-icon>
              <div>엑셀 불러오기</div>
            </div>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn class='import-select-btn float-right'
                 @click='importModalSelect.handleCloseModal();userImportModal.handleOpenModal()'>
            <div>
              <v-icon size='64'>mdi-account-plus</v-icon>
              <div> 사용자 불러오기</div>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </custom-modal>
    <custom-modal :modal="userImportModal.modal" @close="userImportModal.handleCloseModal">
      <find-user-form @close="userImportModal.handleCloseModal"></find-user-form>
    </custom-modal>
    <v-col md='3'>
      <address-book
          @click:add='addNewAddressBook'
          @click:item='updateTableName'
          @click:edit-start="handleEditStart"
          @click:edit-end="handleAddressEndEdit"
          @click:edit-cancel="handleAddressCancelEdit"
          :address-items='data.addressBook'
      ></address-book>
    </v-col>
    <v-col md='9'>
      <v-card class='pa-5'>
        <v-card-actions>
          <div>
            <span class="fw-semi-bold light-navy-blue fs-3">{{ data.tableTitle }}</span>
            <div>
              <span class="fs-5 warm-gry fw-regular">TOTAL : 건</span>
            </div>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex">
            <search-text-box class="mr-2 mt-1"></search-text-box>
            <edit-handler v-for="(handler,key) in handlerGroup"
                          class="mr-2"
                          :disable="handlerDisable"
                          :handler="handler"
                          :key="key"></edit-handler>
          </div>
        </v-card-actions>
        <v-data-table
            dense
            :headers="data.headers"
            :items="data.selectedTable"
            class="data-grid-view"
            :height="755"

            v-model="page.keys"
            item-key="key"
            :disable-pagination="false"
            :show-select="true"
            :footer-props="{itemsPerPageOptions:[20]}"
            hide-default-footer
        >
          <template v-slot:item="{item,index,isSelected,select}">
            <tr :key='index'>
              <td class='fixed'>
                <v-checkbox
                    :input-value='isSelected'
                    @click='select(item)'
                    dense hide-details></v-checkbox>
              </td>
              <template v-if="item.editStatus === EditStatus.EDITING_STATUS">
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
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang='scss' scoped>
@import "~@/styles/common/dataTable/crudDataTable.scss";

.import-select-btn {
  width: 170px !important;
  height: 160px !important;
  border-radius: 14px !important;
  background-color: $white;
}
</style>
