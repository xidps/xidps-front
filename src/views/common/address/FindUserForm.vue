<script lang="ts" setup>

import {computed, reactive} from "vue";
import {ICrudDataTableHeader} from "@/types/datagridview/crudDataTable";

interface IFindUser{
  id:string;
  name:string;
  number:string;
  position:string;
}
interface ISelectedUsers{
  id:string;
  name:string;
}
interface IFindUserForm{
  headers: ICrudDataTableHeader[]
  rows: IFindUser[],
  selectedUsers: ISelectedUsers[]
}
const data = reactive<IFindUserForm>({
  headers: [
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
  rows: [],
  selectedUsers:[]
})

const emits = defineEmits<{(e:'close'):void}>()
let index = 0;

function findUser() {
  index+=1;
  data.rows.push({
    id: 20000000+index,
    name: "테스트"+index,
    number: "3",
    position: "4"
  })
}

const findSearchHeaders = data.headers.map(item=> ({
  name: item.text,
  value:item.value
}));


function addUserData() {
  data.selectedUsers.push(...data.rows);
  data.rows = [];
}

function handleSaveSearchUser(){
  emits('close');
}
</script>

<template>
  <div>
    <v-row dense>
      <v-col md='4'>
        <v-select hide-details outlined :items="findSearchHeaders" item-text="name" item-value="value" dense class="rounded-0"></v-select>
      </v-col>
      <v-col>
        <v-text-field hide-details outlined dense class="rounded-0 user-search__text">
          <template v-slot:append>
            <v-btn icon width="24" height="24" @click="findUser">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <div class='table-wrap mt-4'>
      <v-card-actions class='table-wrap-header'>
        <span class='light-navy-blue fs-5 fw-bold'>동아리 공지</span>
        <v-spacer></v-spacer>
        <v-btn class='light-navy-button' @click="addUserData">추가하기</v-btn>
      </v-card-actions>
      <v-data-table
          disable-pagination
          :hide-default-footer='true'
          :items="data.rows"
          :height='200'
          :show-select='true'
          :headers='data.headers'
          dense
      ></v-data-table>
    </div>
    <div class='mt-4 search-result'>
      <v-chip v-for="(item,index) in data.selectedUsers" class="preview-user fw-semi-bold fs-6" :key="index">{{item.id}} - {{item.name}}</v-chip>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class='light-navy-button' @click="handleSaveSearchUser">저장하기</v-btn>
    </v-card-actions>
  </div>
</template>

<style lang="scss" scoped>

@import "~@/styles/common/dataTable/crudDataTable.scss";

.preview-user {
  width: 130px;
  margin:0 10px;
  color: $cornflower;
  background-color: white !important;
  border: 1px solid $cornflower;
  height: 18px;
}

.user-search__text {
  ::v-deep .v-input__slot {
    height: 40px !important;
  }
}

.table-wrap {
  border: 1px solid $light-gray;

  .table-wrap-header {
    border-bottom: 1px solid $light-gray;
  }
}

.search-result {
  background-color: $pale-grey;
  height: 100px;
  border-radius: 8px;
  padding: 9px 0px;
  overflow-y: auto;
}
</style>
