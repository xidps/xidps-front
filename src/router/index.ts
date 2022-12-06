import VueRouter, { RouteConfig } from "vue-router";

import CompanyAuhPage from "@/views/home/CompanyAuthPage.vue";
import CommonAuthPage from "@/views/home/CommonAuthPage.vue";
import { ERouter } from "@/types/router";
import {
  useOnlyAuthenticationUserGuard,
  useOnlyUnAuthenticationUserGuard,
} from "@/router/routerGuard";
import statistics from "@/views/admin/statistics/MessageSendingStatistics.vue";
import Dashboard from "@/views/common/dashboard/DashBoard.vue";
import example1 from "@/views/common/example/XidExample/example1/XidExample.vue";
import sendMessage from "@/views/common/message/send/SendMessage.vue";

const routes: Array<RouteConfig> = [
  {
    path: ERouter.HOME,
    component: CommonAuthPage,
    beforeEnter: useOnlyUnAuthenticationUserGuard,
  },
  {
    path: ERouter.COMPANY_AUTH,
  },
  {
    path: ERouter.COMPANY_AUTH,
    component: CompanyAuhPage,
    beforeEnter: useOnlyUnAuthenticationUserGuard,
  },
  /* 관리자 기능을 위한 라우터입니다. */
  {
    path: ERouter.DASHBOARD,
    component: Dashboard,
    beforeEnter: useOnlyAuthenticationUserGuard,
  },
  {
    path: ERouter.MANAGE_CALLER,
    component: () => import("@/views/admin/caller/ManageCaller.vue"),
    beforeEnter: useOnlyAuthenticationUserGuard,
  },
  {
    path: ERouter.MANAGE_USER,
    component: () => import("@/views/admin/user/index"),
    beforeEnter: useOnlyAuthenticationUserGuard,
  },
  {
    path: ERouter.MANAGE_ADDRESS,
    component: () => import("@/views/common/address/ManageAddress.vue"),
    beforeEnter: useOnlyAuthenticationUserGuard,
  },
  {
    path: ERouter.MANAGE_SHIPMENT,
    component: statistics,
    beforeEnter: useOnlyAuthenticationUserGuard,
  },
  /**
   * 일반 관리자를 위한 기능
   */
  {
    path: ERouter.SEND_MESSAGE,
    component: sendMessage,
    beforeEnter: useOnlyAuthenticationUserGuard,
  },
  {
    path: ERouter.MANAGE_TEMPLATE,
    component: () => import("@/views/common/template/ManageTemplate.vue"),
    beforeEnter: useOnlyAuthenticationUserGuard,
  },
  {
    path: ERouter.MANAGE_ADDRESS,
    component: () => import("@/views/common/address/ManageAddress.vue"),
    beforeEnter: useOnlyAuthenticationUserGuard,
  },
  {
    path: ERouter.SEND_RESULT,
    component: () => import("@/views/common/result/SendResult.vue"),
    beforeEnter: useOnlyAuthenticationUserGuard,
  },
  {
    path: ERouter.RESERVATION_RESULT,
    component: () => import("@/views/common/result/ReservationResult.vue"),
    beforeEnter: useOnlyAuthenticationUserGuard,
  },
  /**
   * 예시 라우터
   */
  {
    path: "/example/1",
    component: example1,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
