<script lang="ts" setup>
import {computed, reactive} from "vue";
import {EMessageDivision} from "@/views/admin/user";
import {IMessageDivision} from "@/types/views/admin/user";
import {IMessage} from "@/types";
import {useLoggerStore} from "@/store/logger/useLoggerStore";

const data = reactive({
  entireDivisionValue: {
    [EMessageDivision.PUSH]: 300,
    [EMessageDivision.SMS]: 3000,
    [EMessageDivision.LMS]: 3000,
    [EMessageDivision.MMS]: 3000,
  },
  loading: false,
  saveLoading: false
})
const limitMessageState = reactive({
  entireDivision: [{}] as IMessageDivision[],
  editLimitMessage: {
    PUSH: 0,
    LMS: 0,
    SMS: 0,
    MMS: 0
  } as Record<EMessageDivision, number>
})
const entireDivision = computed(() => limitMessageState.entireDivision.map(i => i.divisionValue))

function process() {
  data.loading = true;
  setTimeout(() => {
    data.loading = false;
    limitMessageState.entireDivision = [{
      divisionValue: "학생",
      limitMessage: {
        PUSH: 1000,
        SMS: 1000,
        LMS: 1000,
        MMS: 10000
      }
    }]
  }, 1000)
}

function handleChangeItems(key: string) {
  const findDivision = limitMessageState.entireDivision.filter(division => division.divisionValue === key);

  if (findDivision.length === 0) {
    throw new Error("데이터가 존재하지 않습니다.");
  }

  Object.assign(limitMessageState.editLimitMessage, findDivision[0].limitMessage);

}

function handleSaveItems() {
  data.saveLoading = true;
  setTimeout(() => {
    useLoggerStore().info({message: "구분값이 저장되었습니다."});
    data.saveLoading = false;
  },2000);
}

process();

</script>

<template>
  <v-row class="align-center">
    <v-col mb='8' sm='2' style='flex-basis: 300px'>
      <v-select dense hide-details outlined :items="entireDivision" :loading="data.loading"
                @change="handleChangeItems"></v-select>
    </v-col>
    <v-col v-for="(item,key) in limitMessageState.editLimitMessage" :key="key">
      <div class='d-flex' style="width: 172px !important;">
        <v-radio :label='key'></v-radio>
        <v-text-field suffix='건' dense hide-details :value="item" class='mb-2 centered-input'></v-text-field>
      </div>
    </v-col>
    <v-col mb="1" sm="1">
      <v-btn class="ma-0 light-navy-button" :loading="data.saveLoading" @click="handleSaveItems" :disabled="data.saveLoading">저장</v-btn>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.centered-input input {
  text-align: right !important;
}
</style>
