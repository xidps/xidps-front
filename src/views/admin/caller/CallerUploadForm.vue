<script lang="ts" setup>/**
 * 발신번호 파일을 업로드 하기 위한 폼
 */
import {computed, reactive, ref} from "vue";
import FileUploader from "@/components/FileUploader/FileUploader.vue";
import {EFileType} from "@/components/FileUploader/type";

interface ICallerIdForm {
  isFileCertification: boolean; // 파일인증
  isConsignmentCertification: boolean; // 위탁인증
  isApiCertification: boolean;
  callerNumber: string;
  loading: boolean
}

const formRef = ref(null);
const state = reactive<ICallerIdForm>({
  isConsignmentCertification: false,
  isApiCertification: false,
  isFileCertification: false,
  callerNumber: '',
  loading: false
});
const emit = defineEmits<{ (e: 'approve:number', callerNumber: string): void }>();

function selectFileCertification() {
  state.isFileCertification = true;
}

function selectApiCertification() {
  state.isApiCertification = true;
}

async function approveCaller() {
  if (!formRef.value?.validate()) {
    return;
  }
  state.loading = true;

  await new Promise((resolve) => {
    setTimeout(() => resolve(1), 2000)
  })

  state.isApiCertification = false;
  state.isConsignmentCertification = false;
  state.isFileCertification = false;
  emit('approve:number', state.callerNumber);
  state.callerNumber = '';
  state.loading = false;
  formRef.value?.reset();
}

const selectionMode = computed(() => !(state.isConsignmentCertification || state.isFileCertification || state.isFileCertification));

const rules = [
  (value: string) => !!value || "빈칸입니다.",
  (value: string) => (/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(value) || /^\d{2,3}-\d{3,4}-\d{4}$/.test(value)) || "발신번호 양식이 맞지 않습니다."
]
</script>

<template>
  <v-form ref="formRef" >
    <v-card-actions v-show="selectionMode">
      <v-spacer></v-spacer>
      <v-btn class='light-navy-button' @click="selectFileCertification">통신서비스이용증명원 인증</v-btn>
      <v-btn class='light-navy-button' @click="selectFileCertification">전화 인증</v-btn>
    </v-card-actions>
    <div v-show="!selectionMode">
      <div>
        <span>발신번호</span>
        <v-text-field :disabled="state.loading" v-model="state.callerNumber" dense outlined :rules="rules"></v-text-field>
      </div>
      <div>
        <span>통신서비스 이용가입증명원</span>
        <file-uploader :file-type="EFileType.PDF"></file-uploader>
      </div>
      <div>
        <v-checkbox dense hide-details v-model="state.isConsignmentCertification" label='위탁발신번호여부'></v-checkbox>
      </div>
      <div v-show="state.isConsignmentCertification">
        <div class='pt-5'>
          <span class='pt-3'>위탁자 신분증</span>
          <file-uploader :file-type="EFileType.PDF"></file-uploader>
        </div>
        <div class='pt-5'>
          <span>발신번호 위임장</span>
          <file-uploader :file-type="EFileType.PDF"></file-uploader>
        </div>
        <ul class="pt-5 list fw-semi-bold salmon fs-7">
          <li>* 전기통신사업법 제 84조에 따라 사전 등록되지 않은 발신 번호로 메시지를 발송할 수 없습니다.</li>
          <li>* 통신서비스 이용 증명원, 재직증명서는 1개월 이내 발급된 서류만 유효합니다.</li>
          <li>* 전기통신사업법 제 84조에 따라 사전 등록되지 않은 발신 번호로 메시지를 발송할 수 없습니다.</li>
          <li>* 전기통신사업법 제 84조에 따라 사전 등록되지 않은 발신 번호로 메시지를 발송할 수 없습니다.</li>
        </ul>

      </div>
      <v-row dense class='pa-1 pt-5'>
        <v-spacer></v-spacer>
        <v-btn class='light-navy-button' :loading="state.loading" @click="approveCaller">통신서비스이용증명원 인증 확인</v-btn>
      </v-row>
    </div>
  </v-form>
</template>
<style lang="scss" scoped></style>
