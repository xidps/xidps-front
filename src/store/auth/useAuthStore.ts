import { defineStore } from "pinia";
import { IAuthStore, IResponseUserProfile } from "@/types/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    admin: null as IAuthStore | null,
  }),
  getters: {
    isAuthentication: (state) => {
      return !!state.admin;
    },
  },
  actions: {
    /**
     * 인증된 사용자 정보를 등록함
     * @param payload
     */
    registerAuthUserProfile(payload: IResponseUserProfile) {
      this.admin = {
        adminId: payload.userId,
        adminName: payload.username,
        authority: payload.authority,

        department: payload.department,

        individualMessageCount: payload.individualMessageCount,
        remainNotification: payload.remainNotification,

        affiliatedCompany: {
          id: payload.affiliatedCompany.id,
          name: payload.affiliatedCompany.name,
          abbreviation: payload.affiliatedCompany.abbreviation,
          remainMessage: payload.affiliatedCompany.remainMessage,
        },
      };
    },
    logout() {
      window.localStorage.removeItem("auth_token");
      this.admin = null;
    },
  },
});
