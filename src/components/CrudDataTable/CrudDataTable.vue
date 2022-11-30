<script lang="ts" setup>
import {reactive} from "vue";
import {EditStatus, EInputStatus, ICrudDataTableHeader, ICrudRow} from "@/types/datagridview/crudDataTable";


interface Page {
  pageCount?: number,
  newPage?: number,
  keys?: string[]
}

interface ICrudDataTableProps {
  tableTitle?: string
  rows: Array<ICrudRow>,
  headers: Array<ICrudDataTableHeader>,
  selectedKey?: string
  useSelector?: boolean,
  usePageable?: boolean,
  useHeader?: boolean
  height?: number,
}

const props = withDefaults(defineProps<ICrudDataTableProps>(), {
  height: 750,
  useHeader: true,
})


const page = reactive<Page>({
  keys: [],
  pageCount: 0,
  newPage: 1,
})

function updatedRow(item: ICrudRow) {
  return {
    updated: item.inputStatus == EInputStatus.UPDATE
  }
}

function handleRemove() {
  return 1;
}


</script>

<template>
  <div>
    <v-card-actions>
      <div v-show="useHeader">
        <span class='fw-semi-bold light-navy-blue fs-3 ' data-test='title'></span>
        <div class=''>
          <span class='fs-5 warm-grey fw-regular' data-test='count'>TOTAL : 건</span>
        </div>
      </div>
      <v-spacer></v-spacer>
      <slot name="edit-handler-group" v-bind="{item:page.keys}">
      </slot>
    </v-card-actions>
    <div>
      <v-data-table
          :value="page.keys"
          :disable-pagination='!props.usePageable'
          :footer-props='{"items-per-page-options": [20]}'
          :headers='props.headers'
          :items='props.rows'
          :height="props.height"
          :selectable-key='props.selectedKey'
          :show-select='props.useSelector'

          class='data-grid-view'
          dense
          hide-default-footer
          item-key='key'
          @page-count='$event'
      >
        <template v-slot:item='{item,index,isSelected,select,active}'>
          <tr :key='index' :class='updatedRow(item)'>
            <td class='fixed'>
              <v-checkbox
                  :input-value='isSelected'
                  @click='select(item)'
                  dense hide-details></v-checkbox>
            </td>
            <slot v-if='item.editStatus === EditStatus.EDITING_STATUS' name='state-edit'
                  v-bind='{item:item,active}'></slot>
            <slot v-else name='state-basic' v-bind='{item:item,active}'></slot>
          </tr>
        </template>
      </v-data-table>
      <v-pagination :value='page.nowPage' :length='page.pageCount' :total-visible='10'></v-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/styles/common/dataTable/crudDataTable.scss";
</style>
