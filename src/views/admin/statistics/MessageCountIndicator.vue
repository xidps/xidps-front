<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';
interface IMessageCountIndicator{
  push: string | number;
  lms: string | number;
  mms: string | number;
  sms : string | number;
}
const props = withDefaults(defineProps<IMessageCountIndicator>(), {});
</script>

<template>
  <div class="d-flex justify-space-around fs-5 fw-extra-bold"  >
    <div class="d-flex flex-column align-center salmon">
      <span>{{props.sms}}건</span>
      <span>PUSH</span>
    </div>
    <div class="d-flex flex-column align-center soft-green">
      <span>{{props.lms}}건</span>
      <span>PUSH</span>
    </div>
    <div class="d-flex flex-column align-center sun-yellow">
      <span>{{props.mms}}건</span>
      <span>PUSH</span>
    </div>
    <div class="d-flex flex-column align-center cornflower">
      <span>{{props.push}}건</span>
      <span>PUSH</span>
    </div>
  </div>
</template>
