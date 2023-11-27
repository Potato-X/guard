<template>
  <div class="system-page">
    <div class="system-head">
      <el-input
        v-model="searchValue"
        class="input-w"
        placeholder="请输入要过滤的内容"
        :suffix-icon="Search"
        clearable
        @change="init"
      />
      <div>
        <el-button plain :icon="RefreshRight" @click="init" />
        <el-button type="primary" size="mini" @click="add">添加</el-button>
      </div>
    </div>
    <div>
      <SystemCard
        v-for="(cardinfo,index) in cardList.value"
        :key="cardinfo.id"
        v-model:cardInfo="cardList.value[index]"
      ></SystemCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, RefreshRight } from '@element-plus/icons-vue';
import { ref, reactive,onUpdated } from 'vue';
import SystemCard from './components/systemcard.vue';
import { getsystemCardList } from '@/api/index.ts';
import { ICardInfo } from './components/systemcard';
const searchValue = ref<string>();
const cardList = reactive<{
  value: ICardInfo[];
}>({
  value: [],
});
function add(){
  console.log(cardList)
}
function init() {
  getsystemCardList({name: searchValue.value}).then((res: any) => {
    cardList.value = res;
  });
}
init();
onUpdated(()=>{
  console.log('cardList=====>',cardList.value)
})
</script>

<style lang="scss" scoped>
.system-page {
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  background-color: #ffffff;

  .system-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
}
</style>
