import { ICompany } from "@/types/company";
import { IDepartment, IMessageCount, INotificationInfo } from "@/types/index";

export interface IResponseAuth {
  token: string | null;
}

export enum EAuthority {
  MANAGER,
  ADMIN,
}

export interface IRequestAdminLogin {
  adminId: string;
  adminPassword: string;
  companyAbbreviation: string;
}

export interface IResponseUserProfile {
  userId: string;
  username: string;
  authority: EAuthority;
  /**
   * @description 소속회사
   */
  affiliatedCompany: ICompany;

  /**
   * @description 부서
   */
  department: IDepartment;

  /**
   * @description 개인 메시지 사용량 빈값의 경우에는 개인 메시지 사용여부 등록 X
   */
  individualMessageCount: IMessageCount;

  /**
   * @description 개인 메시지 잔량을
   */
  remainNotification: INotificationInfo[];
}

export interface IAuth {
  /**
   * @description 관리자 아이디
   * @standard
   */
  adminId: string;

  /**
   * @label 관리자 패스워드
   */
  adminPassword: string;

  /**
   * @label 관리자 회사
   */
  adminCompany: ICompany;

  /**
   * @label 관리자 권한 등급
   */
  adminAuthority: EAuthority;
}

export interface IAuthStore {
  adminId: string;
  adminName: string;
  authority: EAuthority;
  department: IDepartment;

  affiliatedCompany: ICompany;

  remainNotification: INotificationInfo[];
  individualMessageCount?: IMessageCount;
}
/**
 * 회사 목록
 */
