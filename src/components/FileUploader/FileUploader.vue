<script lang="ts" setup>

import {computed, reactive, ref} from "vue";
import {EFileType} from "@/components/FileUploader/type";

interface IFile {
  name: string;
  size: number;
}

interface IFileUploadPage {
  uploadedFileSize: string;
  isSelecting: boolean;
  file?: IFile
}

interface IFileUploadProps {
  fileType: EFileType
}

const props = withDefaults(defineProps<IFileUploadProps>(), {})


const emits = defineEmits<{ (e: 'download-sample'): void, (e: 'upload-excel', file: File): void }>()

const state = reactive<IFileUploadPage>({
  uploadedFileSize: "",
  isSelecting: false,
  file: undefined
});

const fileRef = ref(null);

function handleFileUploader(e: any) {
  state.file = {
    name: e.target.files[0].name,
    size: e.target.files[0].size
  }
  emits('upload-excel', e.target.files[0])
}

function findFile() {
  state.isSelecting = true;

  window.addEventListener('focus', () => {
    state.isSelecting = false;
  }, {once: true});

  fileRef.value?.click();
}

const fileUploaderCols = computed(() => props.fileType === EFileType.EXCEL ? 12 : 12)
</script>
<template>
  <v-row class='pt-3' dense>
    <v-col :cols='fileUploaderCols' :md='fileUploaderCols'>
      <div class='file-list'>
        <div class="file-viewer">
          <v-chip v-if="state.file">
            {{ state.file?.name }}
          </v-chip>
        </div>
        <div class="file-sizer fs-6">
          {{ state.file?.size }}KB / 4000KB
        </div>
      </div>
    </v-col>
    <v-col cols="3" v-show="fileType === EFileType.PDF">
      <v-btn outlined>
        <v-icon class="grassh-green rounded-0">mdi-file</v-icon>
        <span>파일 업로드</span>
      </v-btn>
    </v-col>
    <v-col cols="3">
      <v-btn v-show="fileType === EFileType.EXCEL" class="grassh-green rounded-0" outlined
             @click="emits('download-sample')">
        <v-icon>mdi-microsoft-excel</v-icon>
        <span>엑셀 샘플 다운로드</span>
      </v-btn>
    </v-col>
    <v-col cols="2">
      <v-btn v-show="fileType === EFileType.EXCEL" outlined>
        <v-icon class="grassh-green">mdi-file</v-icon>
        <span @click="findFile">엑셀 업로드</span>
      </v-btn>
    </v-col>
    <input
        ref="fileRef"
        class='d-none'
        type='file'
        @change='handleFileUploader'
    />
  </v-row>
</template>

<style scoped lang='scss'>
$grassh-green: #2c9700;
.grassh-green {
  color: $grassh-green !important;
}

.file-list {
  border: 1px solid #cbcbcb;
  height: 58px;

  .file-viewer {
    height: 35px;
    overflow-y: auto;
  }

  .file-sizer {
    height: 21px;
    background-color: #eeeeee;
    text-align: right;
  }

}

.v-btn {
  width: 100%;
  height: 100%;
}
</style>
