<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="menuItem in menuList" :key="menuItem.relaName">
      <el-sub-menu
        v-if="menuItem.children && menuItem.children.length > 0"
        :index="menuItem.relaUrl"
      >
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>{{ menuItem.relaName }}</span>
        </template>
        <el-menu-item
          @click="toView(submenuItem.relaUrl!)"
          v-for="submenuItem in menuItem.children"
          :key="submenuItem.relaName"
          :index="submenuItem.relaUrl"
          >{{ submenuItem.relaName }}</el-menu-item
        >
      </el-sub-menu>
      <el-menu-item
        v-else
        :index="menuItem.relaUrl"
        @click="toView(menuItem.relaUrl!)"
      >
        <el-icon><icon-menu /></el-icon>
        <span>{{ menuItem.relaName }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
type IMenuItem = {
  children?: IMenuItem[];
  relaName: string;
  relaUrl?: string;
};
interface IProps {
  menuList: IMenuItem[];
}
withDefaults(defineProps<IProps>(), {
  menuList: () => [],
});
function handleOpen() {}
function handleClose() {}
function toView(url: string) {
  router.push(url);
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  height: 100%;
  width: 190px;
  background-image: url('/assets/asideBg.png');
  background-size: cover;

  & :deep(.el-sub-menu) {
    .el-menu {
      background-color: rgba(62, 76, 120, 0.8) !important;
    }
    .el-menu-item {
      background-color: rgba(62, 76, 120, 0.8) !important;
    }

    .el-sub-menu__title:hover {
      background-color: rgba(0, 122, 255, 0.4) !important;
    }
  }

  .el-menu-item:hover {
    background-color: rgba(0, 122, 255, 0.4) !important;
  }
}
</style>
