import {ICompany, IResponseCompanyDto} from "@/types/company";

export type INotificationDivision = 'INFO' | 'SEND' | 'CHARGE' | 'RESERVATION' ;

export interface INotificationInfo {
    info : INotificationDivision
    content: string
    notificationDate: Date
}
export type IMessage = 'SMS' | 'LMS' | 'MMS' | 'PUSH' ;
export type IMessageCount = Record<IMessage, number>


export interface IDepartment{
    name: string
    remainMessage: IMessageCount
}

enum EAuthority {
    NORMAL = 1,
    ADMIN = 9,
}


export interface IUser{
    /**
     * @description 사용자 이름
     */
    name : string

    /**
     * @description 사용자 비밀번호
     */
    password: string

    /**
     * @description 사용자 권한 ( 9 = 관리자 , 0 일반)
     */
    authority: EAuthority

    /**
     * @description 소속회사
     */
    affiliatedCompany: ICompany

    /**
     * @description 부서
     */
    department?: IDepartment

    /**
     * @description 개인 메시지 사용량 빈값의 경우에는 개인 메시지 사용여부 등록 X
     */
    individualMessageCount?: IMessageCount

    /**
     * @description 개인 메시지 잔량을
     */
    remainNotification: INotificationInfo[]
}


/**
 * pinia 스토어에 저장할 타입
 */
interface IAuthStore{
    /**
     * 현재 로그인 한 사용자 정보
     */
    nowLoggedInuUser?: IUser
}

/**
 *  @description 서버로 인증 요청을 보내기 위한 정보
 */
export interface IRequestAuthDto{

    /**
     * @description 로그인을 위한 사용자 아이디
     */
    userId: string

    /**
     * @description 로그인을 위한 사용자 패스워드
     */
    userPassword : string
}

/**
 * @description 로그인 요청을 보낸 이후 받아오는 정보
 */
export interface IResponseTokenDto{
    /**
     * @description 로그인 요청 이후 받아오는 token 실패 할 경우 null 입력
     */
    token : string
}


/**
 * @description 인증 페이지 공통 컴포넌트입니다.
 *
 */

export interface IAuthForm{
    id: string,
    password: string,
    companyId: string,
    selectCompanies: IResponseCompanyDto[]
}
