<template>
  <div class="home-page">
    <HomeHeader></HomeHeader>
    <div class="home-body">
      <MenuAsideBar :menuList="menuList"></MenuAsideBar>
      <div class="home-content">
        <LinkBar />
        <div class="sub-page">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeHeader from './components/homeheader.vue';
import MenuAsideBar from './components/menuasidebar.vue';
import LinkBar from './components/linkbar.vue';
import treesource from '../../../public/config/treesource.json';
import { reactive } from 'vue';

const treesourceInfo = reactive(treesource);
const menuList = treesourceInfo.initStsResInfo;
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  background-color: #f0f2f5;
  .home-body {
    display: flex;
    height: calc(100% - 48px);
  }
  .home-content {
    flex: 1;
    box-sizing: border-box;
    // padding: 10px;
    .sub-page {
      box-sizing: border-box;
      height: calc(100% - 30px);
      padding: 8px;
    }
  }
}
</style>
