<template>
  <div class="card-box">
    <div class="card-box-head">
      <div class="system-card-info">
        <div @click="edit" style="display: flex; align-items: center">
            <div class="place-block"></div>
          <span class="system-card-name">{{ _cardInfo.systemName }}</span>
          <el-link
            class="m-r-s"
            :underline="false"
          >
          <el-icon><Edit /></el-icon>
          </el-link>   
        </div>
        <span style="margin-left: 20px">
          <el-tag
            size="mini"
            style="margin-right: 8px"
            v-for="item in _cardInfo.ranges"
            :key="item.code"
            >{{ item.name }}</el-tag
          >
        </span>
        <span
          style="
            color: #007aff;
            cursor: pointer;
            position: absolute;
            left: 360px;
          "
          @click="copy(_cardInfo)"
          >复制密钥</span
        >
      </div>
      <div class="system-card-operate">
        <el-link
          class="m-r-s mgr40"
          :underline="false"
          icon="n20-icon-a-shanchuxuanzhong"
          @click="del"
          >删除</el-link
        >
        <el-switch
          v-model="_cardInfo.isEnable"
          :active-value="'1'"
          :inactive-value="'0'"
          @change="changeEnableState"
        ></el-switch>
      </div>
    </div>
    <div class="card-box-body">
      <span>{{ _cardInfo.manufacturerName }}</span>
      <div style="position: absolute; left: 360px; bottom: 30px">
        <span @click="checkCallback" class="span-s"
          >回调接口：<span class="link-count">{{ _cardInfo.callbackCount }}</span
          >个</span
        >
        <span @click="toCallbackLog"
          >回调异常：<span class="link-count">{{
            _cardInfo.exceptionCount
          }}</span
          >个</span
        >
        <span
          @click="() => toCallbackLog"
          style="color: #007aff; cursor: pointer"
          >回调记录查询</span
        >
      </div>
    </div>
  </div>
  <SystemUpdate v-model:visible="visible" :isEdit="isEdit" :cardinfo="_cardInfo" @update-cardinfo="updatecardinfo" :testinfo="testinfo" ></SystemUpdate>
</template>

<script lang="ts" setup>
import {computed,ref } from 'vue'
import { ElMessage } from 'element-plus';
import { ICardInfo } from './systemcard';
import myMessageBox from '@/components/MyMessageBox'
import SystemUpdate from './systemupdate.vue'
const props = defineProps<{ cardInfo: ICardInfo }>();
const emit = defineEmits<{
  (e: 'refresh'): void;
  (e:"update:cardInfo",data:ICardInfo ):void
}>();
const testinfo = ref({
  a:1
})
console.log(testinfo)
const _cardInfo = computed (()=>{
  console.log(props.cardInfo)
  return props.cardInfo
})
console.log(_cardInfo)
const visible = ref(false)
const isEdit = ref(false)
// watch(_cardInfo.value,(newvalue)=>{
//   console.log(newvalue)
//   emit('update:cardInfo',newvalue)
// })
function edit() {
  visible.value = true
  isEdit.value = true
}
function updatecardinfo(cardinfo:any){
  Object.assign(_cardInfo.value,cardinfo)
  console.log(cardinfo)
}
function copy(row: ICardInfo) {
  copyText(row.secretKey);
  ElMessage({
    message: '复制成功',
    type: 'success',
  });
}
function checkCallback() {}
function changeEnableState() {
}
function del() {
    myMessageBox({
        title:'确认要删除吗？',
        content:'删除后不可恢复'
    }).then(()=>{
      console.log('确认')
    }).catch(()=>{
      console.log('关闭')
    })
}
function copyText(content: string) {
  let textarea = document.createElement('textarea');
  document.body.append(textarea);
  textarea.id = 'clipboard';
  textarea.value = content;
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
function toCallbackLog() {}
</script>

<style lang="scss" scoped>
.card-box {
  margin-bottom: 12px;
  padding: 30px 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.09);
  height: 124px;
  box-sizing: border-box;
  position: relative;

  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;

    .system-card-info {
      display: flex;
      align-items: center;
      // max-width: 500px;
      justify-content: space-between;

      .system-card-name {
        cursor: pointer;
        font-size: 18px;
        margin: 0 10px 0 16px;
      }
    }

    .system-card-operate {
      display: flex;
      align-items: center;

      .del-btn {
        margin-right: 16px;
        color: #000000;
      }
    }
  }

  &-body {
    margin-left: 56px;

    & > div > span:nth-of-type(n) {
      margin-right: 90px;
    }

    // .span-s {
    //   margin-left: 160px;
    // }
    .link-count {
      color: #007aff;
      cursor: pointer;
    }
  }
}

.mgr40 {
  margin-right: 40px !important;
}
.place-block{
    height: 40px;
    width: 40px;
}
</style>
