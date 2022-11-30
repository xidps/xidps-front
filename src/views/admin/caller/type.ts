import { ICrudRow } from "@/types/datagridview/crudDataTable";

export interface IEditCaller {
  manager: string;
  department: string;
  status: string;
  memo: string;
}

export interface ICaller extends ICrudRow, IEditCaller {
  callerId: string;
}
