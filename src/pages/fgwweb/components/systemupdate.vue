<template>
  <el-dialog :title="`${isEdit ? '编辑' : '添加'}接入系统`" v-model="_visible" width="385px" :before-close="handleClose"
    :close-on-click-modal="false" custom-class="middle">
    <el-form label-width="80px" :model="systemForm" :rules="rules" ref="systemFormRef">
      <el-form-item label="系统名称" prop="systemName">
        <el-input class="input-w" v-model="systemForm.systemName" clearable maxlength="32" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="系统标识" prop="systemCode">

        <el-autocomplete class="input-w" :disabled="isEdit" v-model="systemForm.systemCode"
          :fetch-suggestions="querySearch" clearable maxlength="32" placeholder="请输入">
          <template #default="{ item }">
            <div class="name">{{ item.value }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="厂商名称" prop="manufacturerName">
        <el-input class="input-w" v-model="systemForm.manufacturerName" placeholder="请输入" maxlength="32"
          clearable></el-input>
      </el-form-item>
      <el-form-item label="接入范围" prop="scopes">
        <el-checkbox-group v-model="systemForm.scopes">
          <el-checkbox v-for="item in rangeList" :label="item.value" :key="item.value">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancel" plain>取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { watch, computed, reactive,ref } from 'vue'
import type { FormInstance } from 'element-plus'
const emit = defineEmits<{
  (e: "update:visible", visible: boolean): void,
  (e:"update-cardinfo",data:any):void
}>()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  cardinfo: {
    type: Object,
    default: () => {
      return {
        systemName: "",
        systemCode: "",
        manufacturerName: "",
        scopes: '',
        id: "",
      };
    },
  },
  testinfo:{
    type:Object,
    default:()=>{}
  }
})
console.log(props,props.visible,props.cardinfo,props.testinfo)
watch(()=>props.testinfo,()=>{
  console.log('props.testinfo改变')
},{immediate:true})
const rules = reactive({
  systemName: [{ required: true, message: "请输入", trigger: "blur" }],
  systemCode: [
    { required: true, message: "请输入", trigger: "change" },
  ],
  scopes: [
    {
      type: "array",
      required: true,
      message: "请选择",
      trigger: "change",
    },
  ],
})
const systemForm = reactive({
  systemName: "",
  systemCode: "",
  manufacturerName: "",
  scopes: [],
  id: "",
})
const systemFormRef = ref<FormInstance>()
const systemCodeList = reactive([
  { "value": "N20" },
  { "value": "T20" },
  { "value": "G20" },
])
const rangeList = reactive([
  { value: "CP",label:"票据" },
  { value: "BP",label:"现金" },
])
function renderData() {
  console.log(props.cardinfo);
  Object.assign(systemForm,props.cardinfo)
}
function createFilter(queryString:string) {
  return (systemCode:{value:string}) => {
    return (systemCode.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
}
function querySearch(queryString:string, cb:(list:{value:string}[])=>void) {
  var results = queryString ? systemCodeList.filter(createFilter(queryString)) : systemCodeList;
  // 调用 callback 返回建议列表的数据
  cb(results);
}
function sure() {
  systemFormRef.value!.validate((flag) => {
    if (flag) {
      emit("update-cardinfo",systemForm)
      handleClose()
      console.log(systemForm)
    }
  });
}
function handleClose() {
  cancel();
}
function cancel() {
  systemFormRef.value!.resetFields();
  _visible.value = false;
}
watch(() => props.visible, (value) => {
  if (value && props.isEdit) {
    renderData();
  }
})
const _visible = computed({
  get() {
    return props.visible
  },
  set(newValue) {
    emit('update:visible', newValue)
  }
})
</script>

<style lang="scss">
.middle {
  .el-dialog__body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.dialog-footer{
  display: block;
  text-align: center;
}
</style>