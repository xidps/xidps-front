<script lang="ts" setup>

import {IMenu} from "@/store/menu/useMenuStore";

interface Props {
  menu: IMenu
}

const props = withDefaults(defineProps<Props>(), {})
</script>
<template>
  <v-list-item link :to='menu.to'>
    <v-icon v-if="menu.icon" class='lavender fs-2'>{{ menu.icon }} </v-icon>
    <div v-else class="blank"></div>
    <v-list-item-title class='ml-3 white--text fw-semi-bold'>{{ menu.title }}</v-list-item-title>
  </v-list-item>
</template>

<style scoped lang='scss'>
.blank{
  width:20px;
}
.v-list {
  .v-list-item {
    &:hover {
      background-color: $dark-indigo;
    }
  }

  .v-list-item--active {
    border-left: 6px solid $lavender !important;
    .v-list-item-item--link{
      margin-left: 6px !important;
    }
  }
}
</style>
