<template>
  <div>
    系统日志
    <el-button type="primary" @click="back">返回</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function back() {
  router.back();
}
</script>

<style lang="scss" scoped></style>
