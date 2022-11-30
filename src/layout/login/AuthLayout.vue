<script lang='ts' setup>
</script>

<template>
  <div class='auth_container'>
    <div class='auth-wrapper auth-v1'>
      <div class="auth-inner">
        <router-view></router-view>
      </div>
      <div class="auth-bg"></div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
@import "~@/styles/layout/commonAuthLayout.scss";
</style>
