<!--
  차트에 대한 예제들 입니다.
 -->
<script lang="ts" setup>

import BarChart from "@/components/chart/BarChart/BarChart.vue";
import LineChart from "@/components/chart/LineChart/LineChart.vue";

const shipment = {
  chartData: {
    labels: ['2022-05-12', '2022-05-13', '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17', '2022-05-18'],
    datasets: [
      {
        label: "총 발송량",
        backgroundColor: "#6573f0",
        data: [4000, 6000, 3000, 4000, 6000, 8000, 7000]
      },
      {
        label: "발송성공",
        backgroundColor: "#6bcb77",
        data: [1000, 3000, 2000, 7000, 8000, 4000, 2000]
      },
      {
        label: "발송실패",
        backgroundColor: "#ff6b6b",
        data: [2000, 3000, 1500, 7000, 4200, 3000, 500]
      },
    ],
  },

}
</script>

<template>
  <div>
    <v-card style="width: 400px">
      <v-card-text >
        bar chart
      </v-card-text>
      <v-card-text>
        <bar-chart></bar-chart>
      </v-card-text>
    </v-card>
    <v-card >
      <v-card-text>
        Line chart
      </v-card-text>
      <div style="width: 500px; height:300px;">
        <line-chart :data="shipment" ></line-chart>
      </div>
    </v-card>

  </div>
</template>

<style lang="scss" scoped></style>
