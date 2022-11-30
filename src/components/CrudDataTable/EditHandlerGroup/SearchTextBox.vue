<script lang="ts" setup>
import {defineProps, reactive} from "vue";

interface IColumn {
  text: string;
  value: string;
}
interface ISearchTextBoxProps{
  items: IColumn[]
}
interface ISearchTextBox {
  selectedColumn?: string;
  searchText?: string;
}

const emits = defineEmits<{
  (e: 'search', payload:ISearchTextBox): void
}>();

const props = withDefaults(defineProps<ISearchTextBoxProps>(),{

})
const data = reactive<ISearchTextBox>({
  selectedColumn: "",
  searchText: ""
})

function handleClearSearchText() {
  console.log("clear");
  data.searchText = "";
}

function handleSearch() {
  if (!data.searchText) {
    data.searchText = "";
  }
  console.log(data);
  emits("search", data);
}
</script>

<template>
  <v-text-field
      v-model="data.searchText"
      outlined
      clearable
      dense
      type="text"
      hide-details
      class='search-text-btn rounded-0'
      @click:clear="handleClearSearchText"
      @click:append="handleSearch"
  >
    <template v-slot:prepend-inner>
      <v-select
          v-model="data.selectedColumn"
          flat
          dense
          solo
          height="20px"
          key="value"
          :items="items"
          value="text"
          hide-details
          class='column-selector rounded-0'
      >
      </v-select>
    </template>
    <template v-slot:append>
      <v-btn icon width="16" height="18" @click="handleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<style scoped lang="scss">
::v-deep .v-input__icon--clear {
  padding-bottom: 6px !important;
}

::v-deep .v-input__icon--append {
  padding-bottom: 6px !important;
}

.search-text-btn {
  width: 400px !important;
}

.column-selector {
  width: 150px !important;
}
</style>
