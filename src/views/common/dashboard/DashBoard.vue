<script lang="ts" setup>
import LineChart from "@/components/chart/LineChart/LineChart.vue";
import BarChart from "@/components/chart/BarChart/BarChart.vue";


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
  options: {
    responsive: false,
    maintainAspectRatio:true,
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        대쉬보드
      </v-col>
      <v-col cols="9">
        <v-row>
          <v-col cols="2">
            <v-select solo class="rounded-0"></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-text-field solo class="routed-0"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card class="pa-3">
          <v-list subheader two-line>

            <v-subheader>7일간 전체 통계</v-subheader>
            <template v-for="(item,key) in [1,2,3]">
              <v-list-item :key="key">
                <v-list-item-avatar>
                  <v-icon>mdi-message</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>전체 사용량</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-title>333000</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
              <v-divider :key="key"></v-divider>
            </template>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span>발송량관리 바로가기
              <v-icon>
                mdi-arrow-right
              </v-icon>
            </span>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card class="pa-3" style="width:100%">
            <line-chart :data="shipment"></line-chart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <v-card class="pa-3">
          <line-chart :data="shipment"></line-chart>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-list subheader two-line>
            <v-subheader>7일간 전체 통계</v-subheader>
            <template v-for="(item,key) in [1,2,3]">
              <v-list-item :key="key">
                <v-list-item-avatar>
                  <v-icon>mdi-message</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>전체 사용량</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-title>333000</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
              <v-divider :key="key"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card class="pa-3">
          <bar-chart></bar-chart>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-list subheader two-line>
            <v-subheader>7일간 전체 통계</v-subheader>
            <template v-for="(item,key) in [1,2,3]">
              <v-list-item :key="key">
                <v-list-item-avatar>
                  <v-icon>mdi-message</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>전체 사용량</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-title>333000</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
              <v-divider :key="key"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <bar-chart></bar-chart>
        </v-card>
        <v-btn outlined style="width: 100%; height: 20%" class="mt-3">
          엑셀 보고서 다운로드
        </v-btn>

      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped></style>
