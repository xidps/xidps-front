<script lang="ts" setup>

import {computed, defineProps, withDefaults} from "vue";

type sendType = "PUSH" | "SMS"

interface IReceptionNumber {
  sendType?: sendType,
  id?: string
}

const props = withDefaults(defineProps<IReceptionNumber>(), {
  sendType: "PUSH",
  id: "201887082"
})

const sendDivision = computed(() => props.sendType === "PUSH" ? "P" : "문")
const sendDivisionClass = computed(() => props.sendType === "PUSH" ? "bg-cornflower" : "bg-salmon ")
</script>

<template>
  <v-chip pill class="user-chip">
    <v-avatar left class="user-chip-type" :class="sendDivisionClass">
      {{ sendDivision }}
    </v-avatar>
    {{ props.id }}
  </v-chip>
</template>

<style lang="scss" scoped>

.user-chip {
  background-color: $white !important;
  color: $cornflower;
  border: 1px solid $cornflower;

  height: 25px !important;

  .user-chip-type {
    width: 24px !important;
    height: 24px !important;

    padding: 0 !important;
    background-color: $cornflower;
    color: white;
  }
}


</style>
