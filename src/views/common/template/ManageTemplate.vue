<script lang="ts" setup>
import {computed, reactive} from 'vue';
import {useModal} from "@/composables/useModal";
import CustomModal from "@/components/CustomModal/CustomModal.vue";
import CreateTemplate from "@/views/common/template/component/CreateTemplate.vue";
import IndividualTemplate from "@/views/common/template/component/IndividualTemplate.vue";

interface ITemplate {
  title: string;
  content: string;
}

interface IManageTemplatePage {
  templateList: ITemplate[];
  template: ITemplate;
  selectedIndex: number
}

const createTemplateModal = useModal({title: '템플릿 작성', isShow: false});
const updateTemplateModal = useModal({title: "템플릿 수정", isShow: false});

const data = reactive<IManageTemplatePage>({
  templateList: [],
  template: {
    title: '',
    content: '',
  },
  selectedIndex: -1,
});

interface ICreateTemplatePayload {
  title: string;
  content: string;
}

const addTemplate = () => {
  data.templateList.unshift({title: data.template.title, content: data.template.content});
  data.template.title = '';
  data.template.content = '';
  createTemplateModal.handleCloseModal();
};

function removeTemplate(index: number) {
  data.templateList.splice(index, 1);
}

function handleOpenTemplate(index: number) {
  data.selectedIndex = index;
  data.template.title = data.templateList[data.selectedIndex].title;
  data.template.content = data.templateList[data.selectedIndex].content;
  updateTemplateModal.handleOpenModal();
}

const selectedTemplate = computed((): ITemplate | null => {
  if (data.selectedIndex === -1) {
    return data.template;
  }
  return data.templateList[data.selectedIndex];
});

function saveTemplate() {
  if (data.selectedIndex === -1) {
    return;
  }
  data.templateList[data.selectedIndex].content = data.template.content;
  data.templateList[data.selectedIndex].title = data.template.title;

  updateTemplateModal.handleCloseModal();
}
</script>

<template>
  <v-card>
    <custom-modal :modal="updateTemplateModal.modal" @close="updateTemplateModal.handleCloseModal()">
      <v-row no-gutters>
        <v-col cols="9">
          <v-card class="message-editor mr-2">
            <v-card-text>
              <v-text-field dense label='제목없음' v-model="data.template.title"
                            :value='selectedTemplate?.title'></v-text-field>
              <v-textarea v-model='data.template.content' :value="selectedTemplate?.content">
              </v-textarea>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="d-flex flex-column pa-2">
            <v-btn outlined class="mt-1">변수1</v-btn>
            <v-btn outlined class="mt-1">변수2</v-btn>
            <v-btn outlined class="mt-1">변수3</v-btn>
            <v-btn outlined class="mt-1">변수4</v-btn>
            <v-btn outlined class="mt-1">변수5</v-btn>
            <v-btn outlined class="mt-1">변수6</v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-card-text>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="light-navy-button" width="120" @click='saveTemplate'>저장하기</v-btn>
      </v-card-actions>
    </custom-modal>
    <custom-modal :modal="createTemplateModal.modal" @close="createTemplateModal.handleCloseModal()">
      <v-row no-gutters>
        <v-col cols="9">
          <v-card class="message-editor mr-2">
            <v-card-text>
              <v-text-field dense label='제목없음' v-model='data.template.title'></v-text-field>
              <v-textarea v-model='data.template.content'>
              </v-textarea>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="d-flex flex-column pa-2">
            <v-btn outlined class="mt-1">변수1</v-btn>
            <v-btn outlined class="mt-1">변수2</v-btn>
            <v-btn outlined class="mt-1">변수3</v-btn>
            <v-btn outlined class="mt-1">변수4</v-btn>
            <v-btn outlined class="mt-1">변수5</v-btn>
            <v-btn outlined class="mt-1">변수6</v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-card-text>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="light-navy-button" width="120" @click='addTemplate'>저장하기</v-btn>
      </v-card-actions>
    </custom-modal>
    <v-card-title class="fs-4 fw-semi-bold light-navy-blue">템플릿 관리</v-card-title>
    <div class="d-flex flex-wrap pa-3">
      <create-template class="ma-3" @click="createTemplateModal.handleOpenModal()"></create-template>
      <individual-template class="ma-3" v-for="(item,index) in data.templateList"
                           :key="index"
                           :title='item.title'
                           :content='item.content'
                           @open="handleOpenTemplate"
                           @delete='removeTemplate' :index='index'>
      </individual-template>
      <div v-for='(index) in new Array(11-data.templateList.length)' :key='index' class='empty-border ma-3'></div>
    </div>
    <v-pagination
        :length="6"
    ></v-pagination>
  </v-card>
</template>

<style lang="scss" scoped>
.empty-border {
  height: 300px;
  border: solid 1px $light-gray;
  width: 220px;
}
</style>
