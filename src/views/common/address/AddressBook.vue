<script lang='ts' setup>
import {defineEmits, defineProps, reactive, withDefaults,} from 'vue';
import {
  IAddressBook,
  IAddressInsertPayload,
  IClickItemPayload,
  IEditAddressPayload
} from "@/types/views/common/address";
import {EditStatus} from "@/types/datagridview/crudDataTable";

interface Props {
  addressItems?: IAddressBook[]
}

const prop = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<{
  (e: 'click:add'): void,
  (e: 'click:item', payload: IClickItemPayload): void
  (e: 'click:edit-start', payload: IAddressBook): void
  (e: 'click:edit-end', payload: IEditAddressPayload): void
  (e: 'click:edit-cancel', payload: IAddressBook): void
  (e: 'click:item-delete', payload: IAddressBook): void
}>();

const data = reactive({
  id: 0,
  selectedId: -1,
  search: '',
  opens: [],
  tree: [],
  editText: '',
  items: [],
  selectedNode: null,
});

const handleClickAdd = () => {
  emit('click:add');
};
const handleChangeActive = (item: IAddressBook[]) => {
  if (item.length === 0) {
    emit('click:item', {item: null});
    return;
  }
  // eslint-disable-next-line prefer-destructuring
  emit('click:item', {item: item[0]});
};

function handleEditStart(item: IAddressBook) {
  data.editText = item.name;
  emit('click:edit-start', item);
}

function handleEditEnd(item: IAddressBook) {
  emit('click:edit-end', {
    item,
    editText: data.editText
  })
  data.editText = "";
}

function handleEditCancel(item: IAddressBook) {
  emit('click:edit-cancel', item);
  data.editText = "";
}

function handleDelete(item: IAddressBook) {
  emit('click:item-delete', item);
}
</script>

<template>
  <v-card class='pa-7'>
    <span class='fs-2 light-navy-blue'>공통 주소록 그룹 관리</span>
    <div class='address-book-wrap'>
      <v-text-field v-model='data.search' dense hide-details solo>
        <template v-slot:append>
          <v-btn icon @click='handleClickAdd'>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <div class='treeview-wrap scroll '>
        <v-treeview
            v-model='data.tree'
            :items='prop.addressItems'
            :open='data.opens'
            :search='data.search'
            activatable
            return-object
            dense
            class='address-book'
            transition
            @update:active='handleChangeActive'
        >
          <template v-slot:prepend='{open}'>

            <v-icon class="lavender">
              {{ open ? "mdi-folder-open" : "mdi-folder" }}
            </v-icon>

          </template>
          <template #label='{item,active}'>
            <div style="min-width:240px">
              <div v-if="item.editStatus === EditStatus.EDITING_STATUS" class="d-flex align-center">
                <div style="width:100px;margin-bottom:10px">
                  <v-text-field v-model="data.editText" dense hide-details outline @click.stop=""></v-text-field>
                </div>
                <v-btn class="light-navy-blue" icon @click.stop="handleEditEnd(item)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn class="light-navy-blue" icon @click.stop="handleEditCancel(item)">
                  <v-icon>mdi-cancel</v-icon>
                </v-btn>
              </div>
              <div v-else>
                <span style="margin-top:5px">{{ item.name }}</span>
                <v-btn v-show="active" class="light-navy-blue" icon @click.stop="handleEditStart(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn v-show="active" class="light-navy-blue" icon @click.stop="handleDelete(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </template>
        </v-treeview>
      </div>
    </div>
  </v-card>
</template>

<style lang='scss'>
.address-book-wrap {
  border: 1px solid $light-gray;
}

.treeview-wrap {
  overflow: auto;
}

.address-book {
  min-width: 270px;
  height: 300px;
}
</style>
