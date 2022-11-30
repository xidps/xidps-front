import { EMessageDivision } from "@/views/admin/user";
import { ICrudDataTable, ICrudRow } from "@/types/datagridview/crudDataTable";

export interface IMessageDivision {
  divisionValue: string;
  limitMessage: Record<EMessageDivision, number>;
}

export interface IEditUser {
  /**
   * @description 사용자 이름입니다.
   */
  name: string;

  /**
   * @description 사용자의 핸드폰 번호입니다.
   */
  phoneNumber: string;

  /**
   * @description 구분 값입니다. ex) 학생, 교수, 특정 직급
   */
  divisionValue: string;

  /**
   * @description 메시지 전송할때 사용되는 변수입니다.
   */
  var1: string;
  /**
   * @description 메시지 전송할때 사용되는 변수입니다.
   */
  var2: string;
  /**
   * @description 메시지 전송할때 사용되는 변수입니다.
   */
  var3: string;
  /**
   * @description 메시지 전송할때 사용되는 변수입니다.
   */
  var4: string;
}

/**
 * @description 개인 메시지 편집값을 가지는 인터페이스입니다.
 */
export interface IEditIndividualMessage {
  /**
   * @description 편집상태가 true일 경우 해당 값을 편집할 수 있습니다.
   */
  useAble: boolean;

  /**
   * @description 개인 메시지 값을 기록하는 타입입니다.
   */
  limitMessage: Record<EMessageDivision, number>;
}

/**
 * @description 사용자관리 혹은 주소록 관리를 위해 사용되는 타입입니다.
 */
export interface IUserRow extends ICrudRow, IEditUser {
  /**
   * @description userId는 서버에서 전달받은 고유 값입니다.
   */
  userId: string;

  individualMessage: Record<EMessageDivision, number> | null;
}

/**
 * @description 사용자 관리 페이지 관리를 위해 사용되는 인터페이스입니다.
 */
export interface IManageUserPage {
  editUser: IEditUser;
  table: ICrudDataTable;
  editIndividualMessage: IEditIndividualMessage;
  index: number;
}

export type IResponseDivisionValueList = IMessageDivision[];
