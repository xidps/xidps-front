import { defineStore } from "pinia";
import { ERouter } from "@/types/router";
import { EAuthority } from "@/types/auth";

export interface IMenu {
  to?: ERouter;
  title: string;
  icon?: string;
  children?: IMenu[];
}

interface IMenuStore {
  adminMenu: IMenu[];
  manageMenu: IMenu[];
  all: IMenu[];
}

export const useMenuStore = defineStore("menu", {
  state: () =>
    ({
      adminMenu: [
        {
          to: ERouter.DASHBOARD,
          title: "대시보드",
          icon: "mdi-home",
        },
        {
          to: ERouter.MANAGE_CALLER,
          title: "발신번호 관리",
          icon: "mdi-phone",
        },
        {
          to: ERouter.MANAGE_USER,
          icon: "mdi-account-plus",
          title: "사용자 관리",
        },
        {
          to: ERouter.MANAGE_ADDRESS,
          icon: "mdi-folder-account",
          title: "주소록 관리",
        },
        {
          to: ERouter.MANAGE_SHIPMENT,
          icon: "mdi-view-dashboard",
          title: "발송량 관리",
        },
        {
          to: ERouter.MANAGE_UTILITY,
          icon: "mdi-cog",
          title: "기능 설정",
        },
      ],
      manageMenu: [
        {
          to: ERouter.DASHBOARD,
          title: "대시보드",
          icon: "mdi-home",
        },
        {
          title: "메시지발송",
          icon: "mdi-message",
          children: [
            {
              to: ERouter.SEND_MESSAGE,
              title: "메시지발송",
              icon: "",
            },
            {
              to: ERouter.SEND_RESULT,
              title: "간단 메시지 발송",
              icon: "",
            },
          ],
        },
        {
          title: "메시지 발송",
          icon: "mdi-card-account-mail",
          children: [
            {
              to: ERouter.MANAGE_ADDRESS,
              title: "주소록 관리",
            },
            {
              to: ERouter.MANAGE_RECEIPT_BLOCKING,
              title: "수신차단관리",
            },
          ],
        },
        {
          title: "템플릿 관리",
          icon: "mdi-grid",
          to: ERouter.MANAGE_TEMPLATE,
        },
        {
          title: "전송결과",
          icon: "mdi-file-search",
          children: [
            {
              to: ERouter.SEND_RESULT,
              title: "메시지 전송 결과",
            },
            {
              to: ERouter.RESERVATION_RESULT,
              title: "예약 내역",
            },
          ],
        },
      ],
      all: [{}],
    } as IMenuStore),

  getters: {
    menus: (state) => {
      return (authority: EAuthority | undefined): IMenu[] => {
        if (authority === EAuthority.ADMIN) {
          return state.adminMenu;
        }
        return authority === EAuthority.MANAGER ? state.manageMenu : [];
      };
    },
  },
});
