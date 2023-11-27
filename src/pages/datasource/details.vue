<template>
  <div>数据源详情页面</div>
  <el-button type="primary" @click="back">返回</el-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function back() {
  router.back();
}
</script>

<style lang="scss" scoped></style>
