<script lang="ts" setup>

import {ICustomModal} from "@/components/CustomModal/type";

interface Props {
  modal: ICustomModal
}

const props = withDefaults(defineProps<Props>(), {})

const emits = defineEmits<{ (e: 'close'): void }>()


function handleCloseModal() {
  emits('close');
}

</script>

<template>
  <v-dialog class="rounded" persistent :value="modal.isShow" :width="modal.width">
    <v-card class="pa-5">
      <v-card-actions>
        <span>{{ modal.title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click='handleCloseModal'>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
