import { defineStore } from "pinia";
import useApi from "@/composables/useApi";

interface IResponseCompany {
  id: string;
}
const useInitializeCompany = defineStore("company", {
  state: () => ({
    company: [] as IResponseCompany[],
  }),

  getters: {
    existsCompanyId: (state) => (id: string) => {
      return state.company.filter((company) => company.id === id).length !== 0;
    },
  },

  actions: {
    async initializeCompany() {
      const { data } = await useApi();
      this.company = data;
    },
  },
});

export default async function () {
  const useCompany = useInitializeCompany();
  await useCompany.initializeCompany();
  return useCompany;
}
