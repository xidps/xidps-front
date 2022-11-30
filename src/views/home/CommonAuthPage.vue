<script lang='ts' setup>
import {reactive, ref} from "vue";
import {useAxios} from "@vueuse/integrations/useAxios";

import AxiosService from "@/api";
import {IResponseCompanyDto} from "@/types/company";
import {useAuthStore} from "@/store/auth/useAuthStore";
import RadioButtonGroup from "@/components/RadioButton/RadioButtonGroup.vue";
import {IAuthForm} from "@/types"
import {useLoggerStore} from "@/store/logger/useLoggerStore";
import {IResponseAuth, IResponseUserProfile} from "@/types/auth";
import {useRouter} from "vue-router/composables";
import {ERouter} from "@/types/router";


const {isLoading, execute} = useAxios<IResponseCompanyDto[]>(AxiosService.instance);
const router = useRouter();
/**
 * set up data
 */
const data = reactive<IAuthForm>({
  id: "",
  password: "",
  companyId: "",
  selectCompanies: [],
})
const saveSetting = reactive({
  id: false,
  option: false,
})
const authForm = ref(null);

const rules = {
  idRules: [
    (v: string) => !!v || "아이디는 필 수 입력입니다",
    (v: string) => (v && v.length <= 10) || "10를 초과해서 입력할 수 없습니다."
  ],
  passwordRules: [
    (v: string) => !!v || "비밀번호는 필수 입력입니다",
    (v: string) => (v && v.length <= 10) || "10자리를 초과해서 입력할 수 없습니다"
  ],
  companyRules: [
    (v: string) => !!v || "회사선택은 필수 입니다."
  ]
}

const useLogger = useLoggerStore();

/**
 * @description
 * 서버로 부터 선택한 자음을 바탕으로 회사 목록을 가져옵니다.
 */
async function requestCompanyListsByConsonant(consonant: string) {
  const result = await execute(`/company/consonant/${consonant}`, {method: 'GET'})

  if (!result.data.value) {
    useLogger.error({message: "네티워크 에러"});
    return;
  }
  data.selectCompanies = result.data.value.map((responseCompany) => {
    return {
      ...responseCompany,
    }
  });
  useLogger.info({
    message: `${data.selectCompanies.length}건 조회되었습니다`
  })
}

async function handleClickLogin() {
  if (!validate()) {
    return;
  }
  const {execute} = useAxios<IResponseAuth>(`/auth/${data.companyId}`, {
    method: 'POST',
    data: {
      userId: data.id,
      userPassword: data.password
    }
  }, AxiosService.instance);

  const response = await execute();
  if (!response.data.value?.token) {
    useLogger.error({
      message: "로그인할 수 없습니다."
    })
    return;
  }

  const token = response.data.value?.token;
  window.localStorage.setItem("auth_token", token);

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
  await router.push({path: ERouter.DASHBOARD});
  useLogger.info({message: "환영합니다."});
}

function validate() {
  return authForm.value?.validate();
}
</script>

<template>
  <v-form ref="authForm">
    <v-card class='auth-card pa-10'>
      <v-card-title>
        <v-icon class="mr-2">mdi-send</v-icon>
        <span>XID 메세징 서비스</span>
      </v-card-title>
      <div class="pr-10">
        <v-card-text>
          <!--   radio buttons -->
          <radio-button-group @change:item='requestCompanyListsByConsonant'></radio-button-group>
        </v-card-text>
        <v-card-text>
          <v-select dense outlined
                    v-model='data.companyId'
                    :items='data.selectCompanies'
                    :loading='isLoading'
                    :rules="rules.companyRules"
                    item-text='companyName'
                    item-value='companyId'
          ></v-select>
          <v-text-field dense label='ID' v-model='data.id' :rules="rules.idRules" required></v-text-field>
          <v-text-field dense label='PW' type='password' :rules="rules.passwordRules" v-model='data.password'
                        required></v-text-field>
        </v-card-text>
        <v-card-text class="d-flex">
          <v-checkbox v-model="saveSetting.option" dense hide-details label="설정저장"></v-checkbox>
          <v-checkbox v-model="saveSetting.id" dense hide-details label="아이디저장"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class='light-navy-button' @click='handleClickLogin' width="100">로그인</v-btn>
        </v-card-actions>

      </div>
    </v-card>
  </v-form>
</template>

<style scoped lang="scss">
.auth-card {
  border-radius: 41px 0 0 41px !important;
  height: 600px;
}
</style>
