<script lang='ts' setup>
import {computed, reactive, ref, watch} from 'vue';
import SelectTargetUserViewer from "@/views/common/message/component/SelectTargetUserViewer.vue";
import {useModal} from "@/composables/useModal";
import CustomModal from "@/components/CustomModal/CustomModal.vue";
import ReceiptAvatar from "@/views/common/message/component/ReceiptAvatar.vue";
import ImageUploader from "@/views/common/message/component/ImageUploader.vue";

const selectTargetModal = useModal({isShow: false, width: 1270});
const imageUploadModal = useModal({isShow: false, width: 800});
const messageEditor = ref(null);
const data = reactive({
  tab: null,
  sendMessage: "",
  message: "",
  callerList: [],
  selected: [1, 2, 3]
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

function addCaller(callers: any[]) {
  data.callerList.push(...callers);
  console.log(data.callerList);
  selectTargetModal.handleCloseModal();
}

const list = computed(() => data.callerList.map(i => i.name));
console.log(list);
</script>
<template>
  <v-row>
    <custom-modal :modal="selectTargetModal.modal" @close='selectTargetModal.handleCloseModal'>
      <select-target-user-viewer :caller-list="data.callerList" @add:callers="addCaller"></select-target-user-viewer>
    </custom-modal>
    <custom-modal :modal="imageUploadModal.modal" @close="imageUploadModal.handleCloseModal">
      <image-uploader></image-uploader>
    </custom-modal>
    <v-col>
      <span class='fs-2 light-navy-blue fw-bold'>메시지 발송</span>
      <v-card class='mt-3 rounded-0 '>
        <v-card-text class='light-navy-blue fw-bold d-flex align-center'>
          <span style="width: 60px;">발신번호 </span>
          <span style="width:20px; border-right:1px solid black">&nbsp;</span>
          <v-select :items="['정보통신공학부 박성민 051-123-4567']" dense flat hide-details solo>
            <template v-slot:append-item>
              <div class="pa-3">
                <v-icon class="mdi-border-all" icon>
                  <v-icon>mdi-plus</v-icon>
                </v-icon>
                <span class="light-navy-blue fs-4 fw-semi-bold">공통번호 발신번호 보이기</span>
              </div>
            </template>
          </v-select>
        </v-card-text>
      </v-card>
      <v-card class='mt-3'>
        <v-card-text class='light-navy-blue fw-bold d-flex align-center'>
          <span style="width: 70px">수신번호</span>
          <span style="width:20px; border-right:1px solid black">&nbsp;</span>
          <v-select v-model="data.callerList" :items="data.callerList" attach chips dense flat
                    height="10" hide-details multiple readonly solo
                    @click='selectTargetModal.handleOpenModal()'>
            <template v-slot:selection="{item,index}">
              <receipt-avatar v-if="index < 3" :send-type="item.type" :id="item.number"></receipt-avatar>
              <v-chip v-if="index === 3">
                (+{{ data.callerList.length - 3 }})
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
              <v-textarea ref="messageEditor" v-model='data.sendMessage' hide-details
                          rows="10"></v-textarea>
            </v-card-text>
            <v-card-actions class="fs-6 light-navy-blue fw-regular">
              <span>0/4000byte</span>
              <v-spacer></v-spacer>
              <span class="fs-6 light-navy-blue fw-regular">
                <v-btn class="pa-0 light-navy-blue fs-6" text>
                  <v-icon size="12">mdi-view-quilt</v-icon>
                  템플릿 저장하기
                </v-btn>/
                <v-btn class="pa-0 light-navy-blue fs-6" text>템플릿 불러오기</v-btn>
              </span>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-3 d-flex flex-column">
            <v-btn class="rounded-0 mt-2" outlined style="border:1px solid #d2d2d2" @click="insertVariable('{{name}}')">
              이름
            </v-btn>
            <v-btn class="rounded-0 mt-2" outlined style="border:1px solid #d2d2d2" @click="insertVariable('{{id}}'  )">
              학번
            </v-btn>
            <v-btn class="rounded-0 mt-2" outlined style="border:1px solid #d2d2d2"
                   @click="insertVariable('{{var1}}'  )">변수1
            </v-btn>
            <v-btn class="rounded-0 mt-2" outlined style="border:1px solid #d2d2d2"
                   @click="insertVariable('{{var2}}'  )">변수2
            </v-btn>
            <v-btn class="rounded-0 mt-2" outlined style="border:1px solid #d2d2d2"
                   @click="insertVariable('{{var3}}'  )">변수3
            </v-btn>
            <v-btn class="rounded-0 mt-2" outlined style="border:1px solid #d2d2d2"
                   @click="insertVariable('{{var4}}'  )">변수4
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-card class='mt-5'>
        <v-card-text class='align-center'>
          <v-row align="center">
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
      <v-row class="mt-4">
        <v-col cols="9">
          <v-card>
            <v-card-text class="d-flex align-center">
              <v-radio label="즉시발송"></v-radio>
              <v-radio label="예약발송"></v-radio>

            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-btn width="100%" height="100%" class="light-navy-button rounded-0">발송하기</v-btn>
        </v-col>
      </v-row>

    </v-col>

    <v-col>
      <v-card class="pa-0" width="200">
        <v-tabs v-model="data.tab">
          <v-tab href="#push">PUSH</v-tab>
          <v-tab href="#sms">문자</v-tab>
        </v-tabs>
      </v-card>

      <div class='message-viewer-wrap'>
        <img alt='' src='https://raw.githubusercontent.com/JaeHongDev/xidps/master/static/mobile.png'/>
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
