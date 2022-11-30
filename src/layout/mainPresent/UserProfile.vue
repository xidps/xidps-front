<script lang='ts' setup>
import {computed, reactive, withDefaults} from "vue";

interface IUserProfileProps {
  username?: string;
  companyName?: string,
  notification?: number,
  message?: {
    SMS: number,
    LMS: number,
    MMS: number,
    PUSH: number
  },
  avatar?: string
}

const props = withDefaults(defineProps<IUserProfileProps>(), {
  username: "1234",
  companyName: "xidsystem",
  avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
  message: () => ({
    SMS: 1,
    LMS: 2,
    MMS: 3,
    PUSH: 4
  })
})

const emits = defineEmits<{ (e: 'click:logout'): void }>()


function concatMessageCount(count: number) {
  return count.toLocaleString("ko-KR") + "건";
}


const data = reactive({
  messageFixable: false,
  messageVisible: false
});
const tooltipVisible = computed(() => data.messageVisible || data.messageFixable);
const representMessageCount = computed(() => {
  const count = props.message.SMS + props.message.LMS + props.message.MMS + props.message.PUSH;
  return count.toLocaleString("ko-KR") + "건";
})

const representNotificationCount = computed(() => {
  return props.notification?.toLocaleString("ko-KR") + "개";
})


</script>

<template>
  <div class='xidps-userprofile-wrap'>
    <div class='xidps-userprofile'>
      <v-avatar>
        <img
            :src='avatar'
            alt='John'>
      </v-avatar>
      <span class='fs-7 fw-bold pt-3'>{{ props.companyName }}</span>
      <div>
        <span class='fs-4 fw-regular'>반갑습니다 <span class='fs-3 fw-bold'>{{ username }}</span> 님</span>
      </div>
      <v-divider class='bg-white'></v-divider>
      <div>
        <span class='fw-regular fs-5 text-decoration-none white--text' @click="emits('click:logout')">로그아웃</span>
      </div>
    </div>
    <div class='xidps-unread-notification'>

      <span class='fs-6'>읽지 않은 알림</span>
      <v-tooltip v-model="tooltipVisible" right>

      </v-tooltip>
      <span data-test='unread-notification'>{{ representNotificationCount }}</span>
    </div>
    <div class='xidps-remain-message'>
      <span class='fs-6'>남은 메시지 수</span>
      <v-tooltip v-model='tooltipVisible' right>
        <template v-slot:activator="{}" >
              <span @mouseleave='data.messageVisible=false' @mouseover='data.messageVisible=true'
                    @click='data.messageFixable=!data.messageFixable'>{{ representMessageCount }}</span>
        </template>
        <span>
                <div><span>SMS {{ concatMessageCount(message.SMS) }} LMS {{
                    concatMessageCount(message.LMS)
                  }}</span></div>
                <div>MMS {{ concatMessageCount(message.MMS) }}  PUSH {{ concatMessageCount(message.PUSH) }}</div>
              </span>
      </v-tooltip>
    </div>

  </div>
</template>

<style scoped lang='scss'>
.xidps-userprofile-wrap {
  width: 310px;
  background-color: $dark-indigo;
  color: $white;
  padding-top: 25px;
  padding-bottom: 25px;

  .xidps-userprofile {
    padding-left: 55px;
    padding-right: 55px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}

.xidps-unread-notification {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0px 20px;
}

.xidps-remain-message {
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
}
</style>
