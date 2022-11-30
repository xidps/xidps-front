/**
 * @description ELoggerType은 작성하는 LOGGER의 정보를 나타냅니다.
 * info 는 일반 적인 확인 메시지이며
 * ERROR 는 작업도중에 발생한 에러를 표시합니다.
 */
export enum ELoggerType {
    INFO,
    ERROR,
}

/**
 * @description ILoggerSotre는 전역 스토어에서 사용하는 로그 관리 인터페이스입니다.
 */
export interface ILoggerStore {
    /**
     * @description 메시지의 타입입니다.
     */
    loggerType: ELoggerType,

    /**
     * 표시할 메시지의 이름입니다.
     */
    message: string,

    /**
     * 메시지를 표시할 시간입니다. 1000 1초 2000 2초
     */
    timeout: number,
}

