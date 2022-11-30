<script lang="ts" setup>

import {defineProps, withDefaults, defineEmits, computed} from 'vue';

type TemplateMode = "EDIT" | "VIEW";

interface IMessageTemplate {
  title?: string;
  content?: string;
  size?: number
  index: number,
  mode?: TemplateMode
}

const emit = defineEmits<{ (e: 'delete', index: number): void, (e: 'open', index: number): void }>();
const props = withDefaults(defineProps<IMessageTemplate>(), {
  title: '123455',
  content: '\n'
      + '공자는 위하여서, 가치를 얼마나 어디 부패뿐이다. 든 풀이 피어나는 피는 못할 내는 같이, '
      + '피고, 주며, 뿐이다. 아름답고 인생의 꽃 붙잡아 곳이 든 내려온 있으랴? 그러므로 불어 이것이야말로 이상을 품에 목숨을 보라. 그것은 따뜻한 인간의 운다.'
      + ' 갑 이상의 어디 거친 가치를 더운지라 풍부하게 용감하고 피가 아니다. 인도하겠다는 커다란 고행을 힘차게 싹이 약동하다. 그들의 돋고, 능히 않는 힘있다.'
      + ' 현저하게 만물은 갑 미인을 커다란 운다. 청춘 얼마나 거선의 부패뿐이다.\n',
  mode: "EDIT"
});

function handleClickIndividualTemplateAction(index:number) {

  /* if (props.mode === "EDIT") {
     return props.index;
   }*/
  emit("open", index);
  // View mode
}

const viewerSelected = computed(() => props.mode ? "" : "")

</script>

<template>
  <div class="message-template-wrap" @click="handleClickIndividualTemplateAction(index)">
    <v-card-actions class="message-template-title">
      <span>{{ props.title }}</span>
      <v-spacer class="message-template-delete"></v-spacer>
      <div class="message-template-delete">
        <v-btn icon @click='emit("delete",index)'>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card-actions>
    <div class="message-template-content pa-3 fs-6">
      {{ props.content }}
    </div>
    <div class="message-template-footer"></div>
  </div>
</template>
<style lang="scss" scoped>

.message-template-wrap {
  width: 220px;
  height: 300px;
  border: 1px solid #c1c1c1;

  .message-template-title {
    border-bottom: 1px solid #c1c1c1;
    height: 40px;

    .message-template-delete {
      border-left: 1px solid #c1c1c1;
    }
  }

  .message-template-content {
    height: 241px;
    overflow-y: auto;
  }

  .message-template-footer {
    height: 17px;
    background-color: $light-gray;
  }
}
</style>
