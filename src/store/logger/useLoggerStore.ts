import { defineStore } from "pinia";
import { ELoggerType, ILoggerStore } from "@/types/logger";

/**
 * @description ILoggerInfoPayload 는 메시지 호출하기 위한 페이로드입니다
 */
interface ILoggerInfoPayload {
  message: string;
}

/**
 * @description ILoggerErrorPayload 는 에러 메시지를 호출하기 위한 페이로드입니다.
 */
interface ILoggerErrorPayload {
  message: string;

  /**
   * 인자로 에러를 넘기며 해당 에러에 대한 메시지를 console 로 작성합니다.
   */
  exception?: Error;
}

export const useLoggerStore = defineStore("logger", {
  state: () => ({
    logger: {
      loggerType: ELoggerType.ERROR,
      message: "",
      timeout: 2000,
    } as ILoggerStore,
  }),

  actions: {
    /**
     *
     * @param payload
     */
    info(payload: ILoggerInfoPayload) {
      this.logger = {
        loggerType: ELoggerType.INFO,
        message: payload.message,
        timeout: 5000,
      };
    },

    error(payload: ILoggerErrorPayload) {
      this.logger = {
        loggerType: ELoggerType.ERROR,
        message: payload.message,
        timeout: 2000,
      };
    },
  },
});
