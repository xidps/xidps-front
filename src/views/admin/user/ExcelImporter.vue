<script lang='ts' setup>
import {reactive} from 'vue';
import {IDataTableHeader} from "@/types/datagridview/crudDataTable";
import FileUploader from "@/components/FileUploader/FileUploader.vue";
import {EFileType} from "@/components/FileUploader/type";
import {useExcel, useUploadExcel} from "@/composables/useExcel";
import {IExcelUser} from "@/types/views/admin/user";


interface IUserExcelLoader {
  selectedFile: string[];
  isSelecting: boolean;
  uploading: boolean;
  uploadedRows: IExcelUser[];
  headers: IDataTableHeader[]
  sampleRow: IExcelUser[]
}

const emit = defineEmits<{ (e: 'insert-excel-data', rows: IExcelUser[]): void }>()

const state = reactive<IUserExcelLoader>({
  selectedFile: [],
  uploadedRows: [],
  uploading: false,
  headers: [
    {
      value: 'index', text: '', align: 'center', width: '50px',
    },
    {
      value: 'userId', text: '아이디', align: 'center', width: '100px',
    },
    {
      value: 'name', text: '이름', align: 'center', width: '100px',
    },
    {
      value: 'phoneNumber', text: '휴대폰번호', align: 'center', width: '100px',
    },
    {
      value: 'divisionValue', text: '구분값', align: 'center', width: '100px',
    },
    {
      value: 'var1', text: '변수1', align: 'center', width: '100px',
    },
    {
      value: 'var2', text: '변수2', align: 'center', width: '100px',
    },
    {
      value: 'var3', text: '변수3', align: 'center', width: '100px',
    },
    {
      value: 'var4', text: '변수4', align: 'center', width: '100px',
    },
  ],
  sampleRow: [],
  isSelecting: false,
});

const sampleData = [
  {
    index: 0,
    id: "0",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 1,
    id: "1",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 2,
    id: "2",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 3,
    id: "3",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 4,
    id: "4",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 5,
    id: "5",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 6,
    id: "6",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 7,
    id: "7",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 8,
    id: "8",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 9,
    id: "9",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 10,
    id: "10",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 11,
    id: "11",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
  {
    index: 12,
    id: "12",
    name: "test1",
    number: "010-0000-0000",
    position: "position",
    var1: "",
    var2: "",
    var3: "",
    var4: ""
  },
]

function downloadExampleExcelFile() {
  useExcel(state.headers.map(header => ({
    header: header.text,
    key: header.value
  })), sampleData);
}

async function uploadExcelFile(file: File) {
  const data = await useUploadExcel(file);
  state.uploading = true;
  state.uploadedRows = data;
}

function saveExcelData() {
  emit('insert-excel-data', state.uploadedRows);
  state.uploadedRows = [];
  state.uploading = false;
}

</script>

<template>
  <div v-if='state.uploading'>
    <span>기존데이터</span>
    <v-data-table :headers='state.headers'
                  :items='state.uploadedRows'
                  disable-sort
                  disable-pagination
                  hide-default-footer
                  dense
                  height='158'
                  class="excel-data-viewer">
    </v-data-table>
    <span>중복데이터</span>
    <v-data-table :headers='state.headers'
                  :items='state.uploadedRows'
                  disable-sort
                  disable-pagination
                  hide-default-footer
                  dense
                  height='158'
                  class="excel-data-viewer">
    </v-data-table>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined class="rounded-0 salmon" width="200">취소</v-btn>
      <v-btn outlined class="rounded-0 white--text bg-light-navy-blue" width="200" @click="saveExcelData">저장</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

  </div>
  <div v-else>
    <v-data-table :headers='state.headers'
                  :items='sampleData'
                  disable-sort
                  disable-pagination
                  hide-default-footer
                  dense
                  height='158'
                  class="excel-data-viewer">
    </v-data-table>
    <file-uploader :file-type="EFileType.EXCEL" @download-sample="downloadExampleExcelFile"
                   @upload-excel="uploadExcelFile"></file-uploader>
    <div class='d-flex justify-space-between pt-3'>
      <p class='light-gray fs-6'>
        * 파일은 .csv .xlsx .xls 파일만 지원합니다.<br>
        업로드시 오류가 발생하는 경우 엑셀 샘플을 다운해 업로드 해주시길 바랍니다.
      </p>
      <v-btn class='light-navy-button'>저장하기</v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/styles/common/dataTable/crudDataTable.scss";

.excel-data-viewer {
  border: 1px solid #d6d6d6 !important;
  border-collapse: collapse;

  ::v-deep table {
    tr {
      white-space: nowrap;
    }

    td, th {
      border: 1px solid #d6d6d6 !important;
      vertical-align: middle !important;
      text-align: center;
    }

    td {
      font-size: $fs5;
      color: $warm-grey;
      max-width: 100px !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    th {
      color: $light-navy-blue !important;
      font-size: $semi-bold;
      border-spacing: 5px;
    }
  }

  ::v-deep .v-data-table-header {
    background-color: #ebebeb !important;
  }
}
</style>
