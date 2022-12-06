<script lang='ts' setup>
import {computed, defineEmits, defineProps, reactive, withDefaults,} from 'vue';
import RecentSendNumberViewer from "@/views/common/message/component/RecentSendNumberViewer.vue";
import FileUploader from "@/components/FileUploader/FileUploader.vue";
import ReceiptAvatar from "@/views/common/message/component/ReceiptAvatar.vue";
import SelectAddressBook from "@/views/common/message/component/SelectAddressBook.vue";

interface ICallerNumberChip {
  type: 'PHONE' | 'NUMBER'
  number: string
}

interface ISelectTargetUserViewer {
  callerList: ICallerNumberChip[]
}

const props = withDefaults(defineProps<ISelectTargetUserViewer>(), {
  callerList:()=>([{
    type:'PHONE',
    number:"010-4164-5367"
  }])
});
const emit = defineEmits<{ (e: 'add:caller', payload: ICallerNumberChip[] ): void ,
  (e:'add:callers', payload: ICallerNumberChip[]):void}>();
const data = reactive({
  headers: [
    {
      text: 'ID', value: 'id', width: '100px', align: 'center', searchAble: true,
    },
    {
      text: '이름', value: 'name', width: '150px', align: 'center', searchAble: true,
    },
    {
      text: '연락처', value: 'number', width: '150px', align: 'center', searchAble: true,
    },
    {
      text: '구분값', value: 'position', width: '100px', align: 'center', searchAble: true,
    },
  ],
  rows:[{
    id:"201887082",
    name:"1",
    number:"1",
    position:"1",
  }],
  recentOpen: false,
  callerNumber: '',
  unsavedCallerList: [] as ICallerNumberChip[]
});

function addCallers() {
  emit('add:callers', data.unsavedCallerList);
  data.unsavedCallerList = [];
}

function addUnsavedCallerList(){
  data.unsavedCallerList.push( {
    type: 'NUMBER',
    number: data.callerNumber,
  });
}
function addUnsavedCallerLstByPhone(){
  data.unsavedCallerList.push(...data.rows.map(row=>({ type: 'PUSH', number:row.id})));
}
const toggleRecent = () => {
  data.recentOpen = !data.recentOpen;
};

const combineCallerList = computed(()=> {
  return [...props.callerList, ...data.unsavedCallerList].filter((_,index)=> index <= 25) ;
})
const count = computed(()=> props.callerList.length + data.unsavedCallerList.length);
</script>

<template>
  <div>
    <v-card-title class='pt-0 pb-0'>
      <v-row dense no-gutters>
        <v-col md='1'>
          <div class='fs-4 fw-bold light-navy-blue'><span>수신번호</span></div>
        </v-col>
        <v-col>
          <div class="d-flex flex-wrap">
            <receipt-avatar v-for="(caller,key) in combineCallerList" :id="caller.number" :key="key" :send-type="caller.type" class="ma-1"></receipt-avatar>
            <v-chip v-if="combineCallerList.length >= 25">+ {{count - 25}} </v-chip>
          </div>
        </v-col>
        <v-col md='2'>
          <div class='message-counter'>
            <div class='message-counter-viewer d-flex justify-space-around'>
              <div>
                <span>PUSH</span> <br>
                <span>문자</span>
              </div>
              <div class='divider'></div>
              <div>
                <span>1025명</span> <br>
                <span>225명</span>
              </div>
            </div>
            <v-btn class='message-counter-opener mt-2 rounded-0' outlined @click="toggleRecent">메시지 확인하기</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <div v-if="!data.recentOpen">
      <v-card-title class='pt-2 pb-0'>
        <v-divider></v-divider>
      </v-card-title>
      <v-card-title class="pt-2 pb-2">
        <v-row>
          <v-col md='1'>
            <div class='fs-4 right-border'>
              <span class='dark-blue-grey'>텍스트 </span>
            </div>
          </v-col>
          <v-col class="d-flex align-center">
            <div style="width:150px">
              <v-text-field
                  v-model="data.callerNumber"
                  dense
                  flat
                  hide-details
                  placeholder="xxx-xxx-xxxx"
                  solo></v-text-field>
            </div>
            <v-btn icon @click="addUnsavedCallerList">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-title class='pt-0 pb-0'>
        <v-divider></v-divider>
      </v-card-title>
      <v-card-title class="pt-4 pb-4">
        <v-row>
          <v-col md='1'>
            <div class='fs-4 right-border'>
              <span class='dark-blue-grey'>주소록 </span>
            </div>
          </v-col>
          <v-col cols="5">
            <v-text-field class="rounded-0" dense hide-details outlined>
              <template #append>
                <v-btn :height='16' :width='16' icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field class="rounded-0" dense hide-details outlined>
              <template #append>
                <v-btn :height='16' :width='16' icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-actions class="pt-0">
        <v-row class='user-select-wrap' no-gutters>
          <v-col md='3'>
            <select-address-book title="공통주소록"></select-address-book>
          </v-col>
          <v-col md='3'>
            <select-address-book title="개별주소록"></select-address-book>
          </v-col>
          <v-col class='user-select-table' md='6'>
            <v-card-actions class='table-wrap-header'>
              <span class='light-navy-blue fs-5 fw-bold'>동아리 공지</span>
              <v-spacer></v-spacer>
              <v-btn class='light-navy-button' @click="addUnsavedCallerLstByPhone">추가하기</v-btn>
            </v-card-actions>
            <v-data-table
                :disable-pagination='true'
                :headers='data.headers'
                :height='310'
                :hide-default-footer='true'
                :items="data.rows"
                :show-select='true'
                dense
            ></v-data-table>
          </v-col>
        </v-row>
      </v-card-actions>
    </div>
    <v-card-actions v-else class="pt-2 pb-0">
      <v-card class="pa-5" style="width: 100%">
        <recent-send-number-viewer></recent-send-number-viewer>
      </v-card>
    </v-card-actions>

    <v-card-actions class="pt-0">
      <v-row>
        <v-col cols="10">
          <file-uploader file-type="EXCEL"></file-uploader>
        </v-col>
        <v-col class="d-flex flex-column-reverse">
          <v-btn class='light-navy-button save-btn' @click="addCallers">저장하기</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </div>
</template>

<style lang='scss' scoped>
.save-btn {
  width: 100%;
}

.user-select-wrap {
  height: 400px;

  .user-select-table {
    border: 1px solid $light-gray;
    width: 50%;
  }
}

.table-wrap-header {
  border-bottom: 1px solid $light-gray;
  padding-bottom: 4px !important;
}

.right-border {
  border-right: 1px solid $light-navy-blue;
}

.message-counter {
  .message-counter-viewer {
    border: 1px $light-gray solid;
    padding: 11.3px 17.5px 11.8px;
    color: $cornflower;
    font-weight: $semi-bold;

    .divider {
      border: 1px solid $light-gray;
    }
  }

  .message-counter-opener {
    width: 100%;
  }
}
</style>
