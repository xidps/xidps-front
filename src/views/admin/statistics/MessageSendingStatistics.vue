<script lang="ts" setup>

import {reactive} from "vue";
import MessageCountIndicator from "@/views/admin/statistics/MessageCountIndicator.vue";
import BarChart from "@/components/chart/BarChart/BarChart.vue";

const data = reactive({
  date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
  menu1: false,
  header: [
    {
      value: 'date',
      text: '날짜',
      align: 'center',
      width: '200px',
    }, {
      value: 'sms',
      text: 'SMS',
      align: 'center',
      width: '150px',
    }, {
      value: 'lms',
      text: 'LMS',
      align: 'center',
      width: '150px',
    },
    {
      value: 'mms',
      text: 'MMS',
      align: 'center',
      width: '150px',
    },
    {
      value: 'push',
      text: 'PUSH',
      align: 'center',
      width: '150px',
    },
    {
      value: 'count',
      text: '전체 메세지 수',
      align: 'center',
      width: '150px',
    }],
  dates: [],
  tab: null,

});

/**
 * header
 */
const headers = {
  dayOfDay: [],
  monthly: [],
  individual: []
}
</script>

<template>
  <v-row>
    <v-col cols='4'>
      <v-card class='pa-5'>
        <v-card-actions>
          <span class='fs-6 light-navy-blue'>구분별 메시지 사용량</span>
          <v-spacer></v-spacer>
          <v-select outlined dense class="rounded-0" hide-details :value='[1,2,3,4]'></v-select>
        </v-card-actions>
        <v-card-text>
          <bar-chart></bar-chart>
          <message-count-indicator :lms="1200" :sms="1200" :mms="1200" :push="1200"></message-count-indicator>
        </v-card-text>
      </v-card>
      <v-card class="mt-5">
        <v-card-text>전체발송량</v-card-text>
        <v-card-text>
          <message-count-indicator :lms="1200" :sms="1200" :mms="1200" :push="1200"></message-count-indicator>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols='8'>
      <v-card class='pa-5'>
        <v-card-actions>
          <span class="fw-semi-bold fs-4 light-navy-blue">발송량 내역</span>
          <v-spacer></v-spacer>
          <span class="fw-semi-bold fs-4 light-navy-blue">엑셀로 내려받기</span>
        </v-card-actions>
        <v-card-actions class="pt-0 pb-0">
          <v-tabs v-model="data.tab">
            <v-tab href="#tab1">일별</v-tab>
            <v-tab href="#tab2">월별</v-tab>
            <v-tab href="#tab3">개인별</v-tab>
          </v-tabs>
          <v-spacer></v-spacer>
          <v-menu
              ref="menu1"
              v-model="data.menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  class="rounded-0"
                  dense
                  outlined
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                no-title
                v-model="data.dates"
                range
            ></v-date-picker>
          </v-menu>
        </v-card-actions>
        <v-card-text>
          <v-tabs-items v-model="data.tab">
            <!-- 일별 -->
            <v-tab-item value="tab1">
              <v-data-table :footer-props='{"items-per-page-options": [20]}'
                            class="data-grid-view"
                            :height="700"
                            :headers="data.header"
                            :disable-pagination="true"
                            hide-default-footer
                            dense>
                <template v-slot:[`body.prepend`]>
                  <tr class="text-center">
                    <td>총과금액</td>
                    <td>4,375</td>
                    <td>2,111</td>
                    <td>2,000</td>
                    <td>2,333</td>
                    <td>1,000,000</td>
                  </tr>
                </template>
              </v-data-table>
            </v-tab-item>

            <!-- 월별 -->
            <!-- 월별-->
            <v-tab-item value="tab2">
              <v-data-table :footer-props='{"items-per-page-options": [20]}'
                            class="data-grid-view"
                            :height="700"
                            :headers="data.header"
                            :disable-pagination="true"
                            hide-default-footer
                            dense>
                <template v-slot:[`body.prepend`]>
                  <tr class="text-center">
                    <td colspan="3">합계</td>
                    <td>4,375</td>
                    <td>2,111</td>
                    <td>2,111</td>
                  </tr>
                </template>
              </v-data-table>
            </v-tab-item>
            <!-- 개인별 -->
            <v-tab-item value="tab3">
              <v-data-table :footer-props='{"items-per-page-options": [20]}'
                            class="data-grid-view"
                            :height="700"
                            :headers="data.header"
                            :disable-pagination="true"
                            hide-default-footer
                            dense>
                <template v-slot:[`body.prepend`]>
                  <tr class="text-center">
                    <td>초과금액</td>
                    <td>4,375</td>
                    <td>2,111</td>
                    <td>2,000</td>
                    <td>2,333</td>
                    <td>1,000,000</td>
                  </tr>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
@import "~@/styles/common/dataTable/crudDataTable.scss";

::v-deep .v-tabs {
  border: 1px solid $light-gray;
  max-width: 310px !important;
  padding: 0px !important;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}

::v-deep .v-tab {
  background-color: $white !important;
  color: $light-navy-blue !important;
}

::v-deep .v-tab--active {
  background-color: #e4e7ff !important;

}
</style>
