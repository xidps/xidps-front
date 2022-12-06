<script lang='ts' setup>
import {defineProps, reactive, withDefaults,} from 'vue';

interface IAddressBook {
  id: number,
  selectedId: -1,
  tree: [],
  selectedNode: null,
  children: IAddressBook[]
}

interface Props {
  addressItems?: IAddressBook[]
  title?: string
}

const prop = withDefaults(defineProps<Props>(), {
      title: "",
      addressItems: () => ([])
    }
)

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
      <span class='light-navy-blue fs-5 fw-bold'>{{ title }}</span>
      <v-spacer></v-spacer>
      <v-checkbox dense hide-details></v-checkbox>
    </v-card-actions>
    <div class='treeview-wrap scroll'>
      <v-treeview
          v-model='data.tree'
          :items='prop.addressItems'
          activatable
          class='address-book'
          dense
          overflow-x-auto
          return-object
          selectable
          transition
      >
      </v-treeview>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.treeview-wrap{
  overflow: auto;
  height: 360px;
}
.address-book-wrap {
  overflow: initial;
  text-overflow: initial;
  height: 100%;
  border: 1px solid $light-gray;

  .address-book-title {
    border-bottom: 1px solid $light-gray;
  }
}
.v-treeview{
  min-width: max-content;
  max-width: 100%;
}

</style>
