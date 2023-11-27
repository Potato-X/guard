<template>
  <div class="login-form">
    <div class="form-title">欢迎登录</div>
    <el-form :model="form" label-position="top" :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="accountNo">
        <el-input v-model="form.accountNo" clearable placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          clearable
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="log-btn" type="primary" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance } from 'element-plus';
const router = useRouter();
const form = reactive({
  accountNo: 'system',
  password: '',
});
const formRef = ref<FormInstance>();
const rules = reactive({
  accountNo: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});
function onSubmit() {
  formRef.value!.validate((flag) => {
    if (flag) {
      console.log('登录');
      router.push({ path: '/home' });
    }
  });
}
</script>

<style lang="scss" scoped>
.login-form {
  position: absolute;
  box-sizing: border-box;
  border-radius: 8px;
  right: 106px;
  top: 50%;
  width: 300px;
  min-height: 350px;
  padding: 30px 30px 18px !important;
  transform: translateY(-50%);
  background: #f7f6f6;

  .form-title {
    text-align: center;
    font-size: 16px;
    margin-bottom: 12px;
  }
}

.log-btn {
  display: inline-block;
  width: 100%;
  margin-top: 12px;
}
</style>
