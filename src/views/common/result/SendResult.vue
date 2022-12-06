<script lang="ts" setup>
import {ICrudDataTableHeader, IDataTableHeader} from "@/types/datagridview/crudDataTable";
import SearchTextBox from "@/components/CrudDataTable/EditHandlerGroup/SearchTextBox.vue";
import {reactive} from "vue";

interface IResultRows {
  index: number,
  timeOfReceptionDate: Date,
  content: string,
  resultStatus: string,
  sendCount: number
}

interface IResultDetailRow {
  index: number,
  timeOfReceptionDate: Date,
  number: string
  name: string
  statusCode: string
  sendResult: string
  messageType: string
}

const sendResultHeaders = [
  {
    value: 'index',
    text: '번호',
    align: 'center',
    width: '100px',
    searchAble: false
  },
  {
    value: 'timeOfReceptionDate',
    text: '수신일시',
    align: 'center',
    width: '200px',
    searchAble: true,
  },
  {
    value: 'content',
    text: '내용',
    align: 'center',
    width: '300px',
    searchAble: true,
  },
  {
    value: 'resultStatus',
    text: '전송결과',
    align: 'center',
    width: '150px',
    searchAble: true,
  },
  {

    value: 'sendCount',
    text: '발송건수',
    align: 'center',
    width: '150px',
    searchAble: true,
  },
] as ICrudDataTableHeader[];

const sendResultDetailHeaders = [
  {
    value: 'index',
    text: '번호',
    align: 'center',
    width: '100px',
    searchAble: false
  },
  {
    value: 'timeOfReceptionDate',
    text: '수신일시',
    align: 'center',
    width: '200px',
    searchAble: true,
  },
  {
    value: 'number',
    text: '연락처',
    align: 'center',
    width: '200px',
    searchAble: true,
  },
  {
    value: 'name',
    text: '이름',
    align: 'center',
    width: '150px',
    searchAble: true,
  },
  {
    value: 'statusCode',
    text: '상태코드',
    align: 'center',
    width: '150px',
    searchAble: true,
  },
  {
    value: 'sendResult',
    text: '전송결과',
    align: 'center',
    width: '150px',
    searchAble: true,
  },
  {
    value: 'messageType',
    text: '유형',
    align: 'center',
    width: '150px',
    searchAble: true,
  },
  {
    value: "feature",
    text: "재전송",
    align: 'center',
    width: '150px',
    searchAble: false
  }

] as ICrudDataTableHeader[];

const rows: IResultRows[] = [
  {
    index: 1,
    timeOfReceptionDate: new Date(),
    content: "안녕하십니까 나훈아대학교 정보통신 공학부입니다. {{이름}} 학생의 입학을 진심으로 축하합니다.금일 진행된 입학식에 참여해주셔서 감사드립니다. {{이름}} 학생의 학번은 {{학번}}입니다. 신입생프로그램을 안내드립니다. 선배와의만남 멘티&멘토에서 멘토를...",
    resultStatus: "성공82 실패30 대기2",
    sendCount: 114
  }, {
    index: 2,
    timeOfReceptionDate: new Date(),
    content: "안녕하십니까 나훈아대학교 정보통신 공학부입니다. {{이름}} 학생의 입학을 진심으로 축하합니다.금일 진행된 입학식에 참여해주셔서 감사드립니다. {{이름}} 학생의 학번은 {{학번}}입니다. 신입생프로그램을 안내드립니다. 선배와의만남 멘티&멘토에서 멘토를...",
    resultStatus: "성공82 실패30 대기2",
    sendCount: 30
  }, {
    index: 3,
    timeOfReceptionDate: new Date(),
    content: "안녕하십니까 나훈아대학교 정보통신 공학부입니다. {{이름}} 학생의 입학을 진심으로 축하합니다.금일 진행된 입학식에 참여해주셔서 감사드립니다. {{이름}} 학생의 학번은 {{학번}}입니다. 신입생프로그램을 안내드립니다. 선배와의만남 멘티&멘토에서 멘토를...",
    resultStatus: "성공82 실패30 대기2",
    sendCount: 12
  }]

function testGenerate(number:number){
  return new Array(number).fill(0).map((_,index)=>{
    return {
      index,
      timeOfReceptionDate: new Date(),
      number:"010-4164-5367",
      name: "박재홍",
      statusCode:"00001",
      sendResult:"성공",
      messageType:"PUSH",
    } as IResultDetailRow
  })
}
const data = reactive({
  selectedRow: [] as IResultRows[],
  resultDetailRows : [] as IResultDetailRow[]
})

function clickRow(row: IResultRows) {
  console.log(row);
  if (data.selectedRow.length === 0) {
    data.selectedRow.push(row);
    return;
  }
  if (data.selectedRow[0].index === row.index) {
    return;
  }
  data.resultDetailRows = testGenerate(row.sendCount);
  console.log(data.resultDetailRows);
  data.selectedRow.pop();
  data.selectedRow.push(row);
}
</script>

<template>
  <v-container>
    <v-card class="pa-3">
      <v-card-actions>
        <div>
          <span class="fw-semi-bold light-navy-blue fs-3">전송내역</span>
          <div>
            <span class="fs-5 warm-gry fw-regular">TOTAL : {{ rows.length }} 건</span>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex">
          <search-text-box :items="sendResultHeaders" class="mr-2 mt-1"></search-text-box>
        </div>
      </v-card-actions>
      <v-card-text>
        <v-data-table
            class="data-grid-view"
            :headers="sendResultHeaders"
            :items="rows"
            dense

            @click:row="clickRow"
            hide-default-footer>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text>엑셀로 내려받기</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-3 pa-3">
      <v-card-actions>
        <div>
          <span class="fw-semi-bold light-navy-blue fs-3">세부전송내역</span>
          <div>
            <span class="fs-5 warm-gry fw-regular">TOTAL : {{ data.resultDetailRows.length }} 건</span>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex">
          <search-text-box :items="sendResultHeaders" class="mr-2 mt-1"></search-text-box>
          <v-btn class="light-navy-button rounded-0">PUSH 실패 전체 재전송</v-btn>
        </div>
      </v-card-actions>
      <v-card-text>
        <v-data-table
            class="data-grid-view"
            :headers="sendResultHeaders"
            :items="data.selectedRow"
            dense
            @click:row="clickRow"
            hide-default-footer>
        </v-data-table>
      </v-card-text>
      <v-card-text>
        <v-data-table class="data-grid-view"
                      :headers="sendResultDetailHeaders"
                      :items="data.resultDetailRows"
                      disable-sort
                      disable-pagination
                      hide-default-footer
                      dense
                      height='650'
        ></v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text>엑셀로 내려받기</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
@import "~@/styles/common/dataTable/crudDataTable.scss";
</style>
