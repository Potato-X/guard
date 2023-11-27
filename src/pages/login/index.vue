<template>
  <div class="login-bg">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from './components/loginform.vue';
</script>

<style lang="scss" scoped>
.login-bg {
  position: relative;
  background-image: url('../../public/assets/fgwlogin_BG.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
</style>
