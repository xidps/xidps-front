<script lang='ts' setup>
import {ref, watch, onMounted, onBeforeMount, reactive} from "vue";

import AuthLayout from "@/layout/login/AuthLayout.vue";
import {ELoggerType} from "@/types/logger";
import {useAuthStore} from "@/store/auth/useAuthStore";
import MainPresentLayout from "@/layout/mainPresent/MainPresentLayout.vue";
import {useLoggerStore} from "@/store/logger/useLoggerStore";
import {useAxios} from "@vueuse/integrations/useAxios";
import {IResponseUserProfile} from "@/types/auth";
import AxiosService from "@/api";

/**
 * App component data
 */
const useAuth = useAuthStore()
const useLogger = useLoggerStore();
const isLoggedIn = ref(useAuth.isAuthentication)
const loading = ref(true);

interface ILoggerData {
  visible: boolean,
  message: string,
  timeout: number,
  style: string,
}

const loggerState = reactive<ILoggerData>({
  visible: false,
  message: "",
  timeout: -1,
  style: "",
});

watch(() => useAuth.admin, () => {
  isLoggedIn.value = useAuth.isAuthentication;
})

watch(() => useLogger.logger, () => {
  loggerState.message = useLogger.logger.message;
  loggerState.timeout = useLogger.logger.timeout;
  loggerState.visible = true;
  if (ELoggerType.ERROR === useLogger.logger.loggerType) {
    loggerState.style = "red accent-2"
    return;
  }
  if (ELoggerType.INFO === useLogger.logger.loggerType) {
    loggerState.style = "primary";
    return ;
  }
  loggerState.style = "red accent-2";
});



/**
 * @description 페이지 로딩 기능을 위한 코드
 */
onBeforeMount(async () => {

  loading.value = true;
  const token = window.localStorage.getItem("auth_token");
  if(!token){
    return ;
  }
  const {execute: executeUserInformation} = useAxios<IResponseUserProfile>('/user/', {
    method: 'GET',
    data: {
      token
    }
  }, AxiosService.instance)

  const {response: userInformationResponse} = await executeUserInformation();
  if (!userInformationResponse.value?.data) {
    useLogger.error({
      message: "인증에 실패하였습니다."
    })
    return;
  }
  const userInformationProfile = userInformationResponse.value.data;

  useAuthStore().registerAuthUserProfile(userInformationProfile);
})
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 3000);
})
</script>

<template>
  <div>
    <div v-if="loading"> 페이지 로딩 중입니다</div>
    <v-app v-else>
      <!-- 인증 완료된 레이아웃 -->
      <main-present-layout v-if='isLoggedIn'></main-present-layout>
      <!-- 인증 안된 레이아웃 -->
      <auth-layout v-else></auth-layout>

      <v-snackbar v-model="loggerState.visible" :timeout="loggerState.timeout" :color="loggerState.style">
        {{ loggerState.message }}
      </v-snackbar>
    </v-app>
  </div>
</template>

