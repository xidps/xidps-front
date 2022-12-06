<script lang='ts' setup>
import UserProfile from "@/layout/mainPresent/UserProfile.vue";
import {useAuthStore} from "@/store/auth/useAuthStore";
import {useMenuStore} from "@/store/menu/useMenuStore";
import {useLoggerStore} from "@/store/logger/useLoggerStore";
import NavMenuLink from "@/layout/mainPresent/navigation/NavMenuLink.vue";
import NavigationMenu from "@/layout/mainPresent/navigation/NavigationMenu.vue";


const useAuth = useAuthStore();
const useMenu = useMenuStore();

const authority = useAuth.admin?.authority;

const adminMenus= useMenu.menus(authority);

function handleLogout() {
  /*setTimeout(()=>{
    useAuth.logout();
  },1000);*/
}
</script>

<template>
  <div class="body-layout">
    <v-app-bar app class='none'></v-app-bar>
    <v-navigation-drawer app class='light-navy-blue' :floating='true' disable-resize-watcher width='310'>
      <!-- Navigation Header -->
      <div class='navigation-header d-flex items-center ps-6 pe-5 pt-5 pb-2'>
        <div>
          <v-icon color='white'>mdi-send</v-icon>
          <span class='ml-3 fw-bold fs-3'>XID 메시징 서비스</span>
        </div>
      </div>
      <div class='navigation--user-profile'>
        <user-profile @click:logout='handleLogout'></user-profile>
      </div>
      <navigation-menu :menus="adminMenus"></navigation-menu>
    </v-navigation-drawer>
    <v-main class='mt-10 ml-10 mr-10'>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<style lang='scss' scoped>
.body-layout{
  background-color: $pale-grey !important;
}
.v-app-bar {
  background-color: $light-navy-blue !important;
}

.v-navigation-drawer {
  background-color: $light-navy-blue;
  color: $white !important;

  .navigation-header {
    height: 64px;
  }

  .navigation--user-profile {
    background-color: $dark-indigo;
    height: 230px;
  }
}
</style>
