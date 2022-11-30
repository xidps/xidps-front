<script lang="ts" setup>
</script>

<template>
  <v-card class="auth-card">
    <v-card-text>
      <img src="https://www.xidsys.co.kr/xe/layouts/default/siteTitle.png"/>
    </v-card-text>

    <v-card-text>
      <v-text-field dense label='ID' required></v-text-field>
      <v-text-field dense label='PW' type='password'></v-text-field>
    </v-card-text>

    <v-card-text class="d-flex justify-space-between">
      <v-checkbox label="설정기억" hide-details dense class="fs-6 warm-grey"></v-checkbox>
      <v-checkbox label="아이디기억" hide-details dense class="fs-6 warm-grey"></v-checkbox>
    </v-card-text>

    <v-card-actions>
      <div class="fs-7 light-navy-blue fw-semi-bold">
        <v-icon class="light-navy-blue" size="12">mdi-send</v-icon>
        <span > xid 메시징 서비스 by.</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="light-navy-button">로그인</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style scoped lang="scss">
.auth-card {
  border-radius: 41px 0 0 41px;
}
</style>
