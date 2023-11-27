<template>
  <div>数据源配置页面</div>
  <div>
    <el-button type="primary" @click="toDetails">查看详情</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function toDetails() {
  router.push('/home/datasource/details');
}
</script>

<style lang="scss" scoped></style>
