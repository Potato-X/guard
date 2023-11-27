<template>
  <div>接入系统详情页</div>
  <el-button type="primary" @click="back">返回</el-button>
  <el-button type="primary" @click="tolog">去系统日志</el-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function back() {
  router.back();
}
function tolog() {
  router.push('/home/fgw-web/system/log');
}
</script>

<style lang="scss" scoped></style>
