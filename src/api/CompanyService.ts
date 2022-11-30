import {AxiosInstance} from "axios";
import AxiosService from "@/api/index";


export interface IResponseCompany {
    companyId: string;
    companyName: string
}

class CompanyService {
    private readonly api: AxiosInstance

    private readonly GET_COMPANY_BY_CONSTANT = "/company/constant/"

    constructor(axiosInstance: AxiosInstance) {
        this.api = axiosInstance;
    }

    async getCompaniesByConstant(constant: string): Promise<IResponseCompany[]> {
        return await this.api.get(this.GET_COMPANY_BY_CONSTANT.concat(constant))
    }
}

export default new CompanyService(AxiosService.instance);
