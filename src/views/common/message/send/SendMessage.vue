<script lang='ts' setup>
import {nextTick, reactive, ref, watch} from 'vue';
import SelectTargetUserViewer from "@/views/common/message/component/SelectTargetUserViewer.vue";
import {useModal} from "@/composables/useModal";
import CustomModal from "@/components/CustomModal/CustomModal.vue";


const selectTargetModal = useModal({isShow:true, width: 1270});
const a = [1, 2, 3]

const messageEditor = ref(null);
const data = reactive({
  tab: null,
  sendMessage: "",
  message: "",
})

function insertVariable(value: string) {
  const textarea = messageEditor.value?.$refs.input

  const sentence = textarea.value
  const len = sentence.length

  let pos = textarea.selectionStart

  const before = sentence.slice(0, pos)
  const after = sentence.slice(pos, len)

  data.sendMessage = before + value + after;


}

watch(() => data.tab, () => {
  return 1;
})

watch(() => data.sendMessage, () => {
  data.message = data.sendMessage
      .replace(/\n/g, '<br/>')
      .replace(/{{name}}/g, "박상민")
      .replace(/{{id}}/g, "2021487")
      .replace(/{{var1}}/g, '변수1')
      .replace(/{{var2}}/g, '변수2')
      .replace(/{{var3}}/g, '변수3')
      .replace(/{{var4}}/g, '변수4')
});

</script>
<template>
  <v-row>
    <custom-modal :modal="selectTargetModal.modal" @close='selectTargetModal.handleCloseModal'>
      <select-target-user-viewer></select-target-user-viewer>
    </custom-modal>
    <v-col>
      <span class='fs-2 light-navy-blue fw-bold'>메시지 발송</span>
      <v-card class='mt-3 rounded-0 '>
        <v-card-text class='light-navy-blue fw-bold d-flex align-center'>
          <span>발신번호 </span>
          <span style="width:20px; border-right:1px solid black">&nbsp;</span>
          <v-select dense :items="['정보통신공학부 박성민 051-123-4567']" flat solo hide-details>
            <template v-slot:append-item>
              <div class="pa-3">
                <v-btn class="mdi-border-all" icon>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <span class="light-navy-blue fs-4 fw-semi-bold">공통번호 발신번호 보이기</span>
              </div>
            </template>
          </v-select>
        </v-card-text>
      </v-card>
      <v-card class='mt-3'>
        <v-card-text class='light-navy-blue fw-bold d-flex align-center'>
          <span>수신번호</span>
          <span style="width:20px; border-right:1px solid black">&nbsp;</span>
          <v-select v-model="a" dense attach chips multiple :items="[1]" flat solo hide-details readonly height="10"
                    @click='selectTargetModal.handleOpenModal()'>
            <template v-slot:selection>
              <v-chip pill class="user-chip">
                <v-avatar left class="user-chip-type">
                  P
                </v-avatar>
                20212487
              </v-chip>
            </template>
          </v-select>
        </v-card-text>
      </v-card>
      <v-row class="mt-2">
        <v-col cols="9">
          <v-card class='message-editor' style="height:100%">
            <v-divider style="background-color: indigo"></v-divider>
            <v-card-text class="pb-0">
              <v-text-field dense label='제목없음'></v-text-field>
              <v-textarea ref="messageEditor"  hide-details rows="10"
                          v-model='data.sendMessage'></v-textarea>
            </v-card-text>
            <v-card-actions class="fs-6 light-navy-blue fw-regular">
              <span>0/4000byte</span>
              <v-spacer></v-spacer>
              <span class="fs-6 light-navy-blue fw-regular">
                <v-btn text class="pa-0 light-navy-blue fs-6">
                  <v-icon size="12">mdi-view-quilt</v-icon>
                  템플릿 저장하기
                </v-btn>/
                <v-btn text class="pa-0 light-navy-blue fs-6">템플릿 불러오기</v-btn>
              </span>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-3 d-flex flex-column">
            <v-btn class="rounded-0 mt-2" style="border:1px solid #d2d2d2" outlined @click="insertVariable('{{name}}')">
              이름
            </v-btn>
            <v-btn class="rounded-0 mt-2" style="border:1px solid #d2d2d2" outlined @click="insertVariable('{{id}}'  )">
              학번
            </v-btn>
            <v-btn class="rounded-0 mt-2" style="border:1px solid #d2d2d2" outlined
                   @click="insertVariable('{{var1}}'  )">변수1
            </v-btn>
            <v-btn class="rounded-0 mt-2" style="border:1px solid #d2d2d2" outlined
                   @click="insertVariable('{{var2}}'  )">변수2
            </v-btn>
            <v-btn class="rounded-0 mt-2" style="border:1px solid #d2d2d2" outlined
                   @click="insertVariable('{{var3}}'  )">변수3
            </v-btn>
            <v-btn class="rounded-0 mt-2" style="border:1px solid #d2d2d2" outlined
                   @click="insertVariable('{{var4}}'  )">변수4
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-card class='mt-5'>
        <v-card-text class='align-center'>
          <v-row>
            <v-col md='2'><span class='fw-semi-bold fs-4 light-navy-blue text-center'>이미지</span></v-col>
            <v-col cols='8'>
              <v-text-field dense hide-details label='경로'></v-text-field>
            </v-col>
            <v-col col='2'>
              <v-btn class='light-navy-button'>찾기</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <div>
        <v-tabs v-model="data.tab">
          <v-tab href="#push">PUSH</v-tab>
          <v-tab href="#sms">문자</v-tab>
        </v-tabs>
      </div>

      <div class='message-viewer-wrap'>
        <img src='https://raw.githubusercontent.com/JaeHongDev/xidps/master/static/mobile.png' alt=''/>
        <div v-if="data.tab === 'push'" class='push-viewer scroll viewer scroll-y-transition overflow-y-auto'>
          <div class="d-flex justify-space-between">
            <div>
              <v-icon>mdi-square</v-icon>
              <span>XIDSYSTEM</span>
            </div>
            <div>
              1분전
            </div>
          </div>
          <div v-html="data.message">

          </div>
        </div>
        <div v-else class="message-viewer viewer scroll scroll-y-transition overflow-y-auto">
          <span>[web 발신]</span>
          <div v-html='data.message'>1234</div>
        </div>

      </div>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.message-editor {
  border-top: 5px solid $light-navy-blue;
}


.message-viewer-wrap {
  position: absolute;

  .viewer {
    position: absolute;
    top: 100px;
    left: 50px;
    width: 230px;
    min-height: 50px;
    max-height: 400px;
    font-weight: $semi-bold;
    font-size: $fs7;
  }

  .push-viewer {
    border: 1px solid #e2e0e0;
    background-color: white;
    color: $light-navy-blue;
    border-radius: 13px;
    padding: 9px 16px 18px;
  }

  .message-viewer {
    background-color: #308eff;
    color: white;
    padding: 20px;
    border-radius: 25px;
  }
}

</style>
