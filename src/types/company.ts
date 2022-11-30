import {IMessageCount} from "@/types/index";

export interface ICompany{
    id: string
    name: string
    abbreviation: string

    remainMessage:IMessageCount
}

export interface IResponseCompanyDto{
    companyId:string
    companyName:string
}
