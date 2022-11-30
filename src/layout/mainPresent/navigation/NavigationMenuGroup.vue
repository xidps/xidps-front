<script lang="ts" setup>

import {IMenu} from "@/store/menu/useMenuStore";
import NavMenuLink from "@/layout/mainPresent/navigation/NavMenuLink.vue";

interface Props {
  menu: IMenu
}

const props = withDefaults(defineProps<Props>(), {})

</script>

<template>
  <v-list-group :value="true">
    <template v-slot:activator >
        <v-icon class='lavender fs-2'>{{ menu.icon }}</v-icon>
        <v-list-item-content class='ml-3 white--text fw-semi-bold'>{{ menu.title }}</v-list-item-content>
    </template>

    <nav-menu-link v-for="(childrenMenu, index) in menu.children" :menu="childrenMenu" :key="index"></nav-menu-link>
  </v-list-group>
</template>
<style lang="scss" scoped>
</style>
