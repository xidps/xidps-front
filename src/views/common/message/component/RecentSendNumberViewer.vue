<script lang="ts" setup>
import CrudDataTable from '@/components/common/CrudDataTable/CrudDataTable.vue';
import { reactive } from 'vue';


const data = reactive({
  rows: [],
  headers: [{
    text: '번호', value: 'id', width: '100px', align: 'center', searchAble: true,
  },
    {
      text: '수신일시', value: 'receptionTime', width: '150px', align: 'center', searchAble: true,
    },
    {
      text: '내용', value: 'content', width: '150px', align: 'center', searchAble: true,
    },
    {
      text: '전송결과', value: 'sendResult', width: '100px', align: 'center', searchAble: true,
    },
    {
      text: '발송건수', value: 'position', width: '100px', align: 'center', searchAble: true,
    },
  ],
  table: {
    tableTitle: '최근 발송량 관리',
    useButtons: {
      useAdd: false,
      useSave: false,
      useDelete: false,
      useSearch: false,
      useImportExcel: false,
      usePersonalizedUser: false,
    },
    usePageable: false,
    useSelector: false,
  },
});
</script>
<template>
  <v-data-table :height="423" :headers="data.headers">

  </v-data-table>
</template>

<style scoped>

</style>
