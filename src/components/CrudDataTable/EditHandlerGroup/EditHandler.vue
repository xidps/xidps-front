<script lang="ts" setup>
import {ref} from "vue";
import {IEditHandler, EditHandlerStyle} from "@/types/datagridview/EditHandlerGroup/EditHandler/IEditHandler";

interface IProps {
  handler: IEditHandler
  disable?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<IProps>(), {
  disable: false
});

const buttonLoading = ref(false);


async function handleClick() {
  buttonLoading.value = true;
  await props.handler.event();
  buttonLoading.value = false;
}

</script>

<template>
  <v-btn @click="handleClick" :disabled="disable" :loading="buttonLoading" outlined :class="handler.handlerStyle" class="rounded-0">
    <v-icon v-if="handler.icon">
      {{ handler.icon }}
    </v-icon>
    {{ handler.text }}
  </v-btn>
</template>

<style lang="scss" scoped>
.xidps-btn-delete {
  color: $salmon !important;
  border: 1px solid $salmon;
}

.xidps-btn-import {
  color: $light-navy-blue;
  border: 1px solid $light-navy-blue;
}

.xidps-btn-add {
  color: $light-navy-blue;
  border: 1px solid $light-navy-blue;
}

.xidps-btn-save {
  background-color: $dark-blue-grey !important;
  color: $white !important;
}
</style>
