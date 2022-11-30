import AxiosService from "@/api";
import companyService from "@/api/CompanyService";
import {ref,shallowRef} from "vue";
import {AxiosError} from "axios";

async function useApi() {
    const service = AxiosService.instance;
    const data = await service.get("/company")
    return data;
}


export default useApi;

