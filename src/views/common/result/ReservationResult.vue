<script lang="ts" setup>
import SearchTextBox from "@/components/CrudDataTable/EditHandlerGroup/SearchTextBox.vue";
import {ICrudDataTableHeader} from "@/types/datagridview/crudDataTable";
import {reactive} from "vue";

const reservationResultHeaders = [
  {
    value: 'callerNumber',
    text: '번호',
    align: 'center',
    width: '100px',
    searchAble: true,
  },
  {
    value: 'reservationDate',
    text: '예약 일자',
    align: 'center',
    width: '200px',
    searchAble: true,
  },
  {
    value: 'content',
    text: '내용',
    align: 'center',
    width: '650px',
    searchAble: true,
  },
  {
    value: 'scheduledToBeSent',
    text: '발송예정건수',
    align: 'center',
    width: '150px',
    searchAble: true,
  },

  {
    value: 'feature',
    text: '예약관리',
    align: 'center',
    width: '150px',
    searchAble: false,
  }] as ICrudDataTableHeader[]

interface IReservationResultRows {
  index: number;
  reservationDate: Date,
  content: string;
  scheduledToBeSent: number;
}

interface IReservationResultPage {
  rows: IReservationResultRows[]
}

const data = reactive<IReservationResultPage>({
  rows: [
    {
      index: 1,
      reservationDate: new Date(),
      content: "안녕하십니까 나훈아대학교 정보통신 공학부입니다. {{이름}} 학생의 입학을 진심으로 축하합니다.금일 진행된 입학식에 참여해주셔서 감사드립니다. {{이름}} 학생의 학번은 {{학번}}입니다. 신입생프로그램을 안내드립니다. 선배와의만남 멘티&멘토에서 멘토를...",
      scheduledToBeSent: 1125,
    }
  ]
})
</script>
<template>
  <v-card class="pa-3">
    <v-card-actions>  
      <div>
        <span class="fw-semi-bold light-navy-blue fs-3">발신번호 관리</span>
        <div>
          <span class="fs-5 warm-gry fw-regular">TOTAL : {{data.rows.length}} 건</span>
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <search-text-box></search-text-box>
      </div>
    </v-card-actions>
    <v-card-text>
      <v-data-table
          class="data-grid-view"
          :headers="reservationResultHeaders"
          :items="data.rows"
          :height="750"
          dense
          hide-default-footer
      >
        <template v-slot:[`item.feature`]="{}">
          <v-btn icon>
            <v-icon color="red">mdi-close-circle</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>

  </v-card>
</template>

<style lang="scss" scoped>
@import "~@/styles/common/dataTable/crudDataTable.scss";
</style>
