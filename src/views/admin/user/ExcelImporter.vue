<script lang='ts' setup>
import {reactive} from 'vue';
import {IDataTableHeader} from "@/types/datagridview/crudDataTable";
import FileUploader from "@/components/FileUploader/FileUploader.vue";
import {EFileType} from "@/components/FileUploader/type";

interface IExcelUser {
  index: number;
  id: string;
  name: string;
  number: string;
  position: string
  var1: string;
  var2: string;
  var3: string;
  var4: string
}

interface IUserExcelLoader {
  selectedFile: string[];
  isSelecting: boolean;
  uploading: boolean;
  uploadedRows: IExcelUser[];
  headers: IDataTableHeader[]
  sampleRow: IExcelUser[]
}

const state = reactive<IUserExcelLoader>({
  selectedFile: [],
  uploadedRows: [],
  uploading: false,
  headers: [
    {
      value: 'index', text: '', align: 'center', width: '50px',
    },
    {
      value: 'id', text: '아이디', align: 'center', width: '100px',
    },
    {
      value: 'name', text: '이름', align: 'center', width: '100px',
    },
    {
      value: 'number', text: '휴대폰번호', align: 'center', width: '100px',
    },
    {
      value: 'position', text: '구분값', align: 'center', width: '100px',
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
</script>

<template>
  <div v-if='state.uploading'>
    <span>기존데이터</span>
    <v-data-table :headers='state.headers'
                  :items='state.sampleRow'
                  disable-sort
                  disable-pagination
                  hide-default-footer
                  dense
                  height='158'
                  class="excel-data-viewer">
    </v-data-table>
    <span>중복데이터</span>
    <div>
      <v-btn>취소</v-btn>
      <v-btn>저장</v-btn>
    </div>
  </div>
  <div v-else>
    <v-data-table :headers='state.headers'
                  :items='state.sampleRow'
                  disable-sort
                  disable-pagination
                  hide-default-footer
                  dense
                  height='158'
                  class="excel-data-viewer">
    </v-data-table>
    <file-uploader :file-type="EFileType.EXCEL"></file-uploader>
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
