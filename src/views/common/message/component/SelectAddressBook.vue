<script lang='ts' setup>
import {
  reactive, withDefaults, defineProps, defineEmits,
} from 'vue';

interface IAddressBook{
  id:number,
  selectedId: -1,
  tree: [],
  items:[],
  selectedNode: null,
  children: IAddressBook[]
}

interface Props {
  addressItems?: IAddressBook[]
}

const prop = withDefaults(defineProps<Props>(), {
});

const data = reactive({
  id: 0,
  selectedId: -1,
  tree: [],
  items: [],
  selectedNode: null,
});

</script>

<template>
  <div class='address-book-wrap'>
    <v-card-actions class='address-book-title'>
      <span class='light-navy-blue fs-5 fw-bold'>동아리 공지</span>
      <v-spacer></v-spacer>
      <v-checkbox dense hide-details></v-checkbox>
    </v-card-actions>
    <div class='treeview-wrap'>
      <v-treeview
          :items='prop.addressItems'
          v-model='data.tree'
          activatable
          return-object
          dense
          class='address-book'
          transition
          expand-icon=''
      >
        <template v-slot:prepend='{open}'>
          <v-btn icon>
            <v-icon class='lavender'>{{open ? "mdi-folder-open" : "mdi-folder"}}</v-icon>
          </v-btn>
        </template>
        <template #append='{item}'>
          <v-checkbox v-model='data.items' dense  :value='item.id'></v-checkbox>
        </template>
      </v-treeview>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.address-book-wrap {
  border: 1px solid $light-gray;
  height:100%;
  .address-book-title{
    border-bottom:1px solid $light-gray;
  }
}

.treeview-wrap {
  overflow: auto;
}

.address-book {
  max-width: max-content;
}
</style>
