<script lang="ts" setup>
</script>

<template>
  <div class="message-template-wrap">
    <v-btn icon @click="$emit('click')"><v-icon :size="128">mdi-plus</v-icon></v-btn>
  </div>
</template>
<style lang="scss" scoped>

.message-template-wrap {
  width: 220px;
  height: 300px;
  border: 1px solid #c1c1c1;
  position: relative;
  .v-btn{
    left: 40%;
    top: 40%;
  }

}

</style>
