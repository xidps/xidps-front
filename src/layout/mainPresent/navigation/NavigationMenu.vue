<script lang='ts' setup>
import {IMenu} from "@/store/menu/useMenuStore";
import NavMenuLink from "@/layout/mainPresent/navigation/NavMenuLink.vue";
import NavigationMenuGroup from "@/layout/mainPresent/navigation/NavigationMenuGroup.vue";

interface Props{
  menus: IMenu[]
}

const props = withDefaults(defineProps<Props>() ,{});
</script>

<template>
  <v-list>
    <span class="white--text ml-6 fs-6">ADMIN</span>
    <template v-for="(menu,index) in menus">
      <navigation-menu-group v-if="menu.children" :menu="menu" :key="index"></navigation-menu-group>
      <nav-menu-link v-else :menu="menu" :key="index"></nav-menu-link>
    </template>
  </v-list>
</template>

<style lang='scss' scoped>
</style>
