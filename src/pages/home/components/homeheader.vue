<template>
  <div class="header">
    <div class="header-left">
      <img class="header-logo" src="@/assets/image/headerLogo.png" />
      <span class="logo-name">xxx系统</span>
    </div>
    <div class="header-right">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="帮助文档"
        placement="bottom"
      >
        <el-icon class="icon" :size="20">
          <QuestionFilled />
        </el-icon>
      </el-tooltip>

      <el-icon class="icon" :size="20">
        <Bell />
      </el-icon>
      <el-dropdown
        ref="dropdown1"
        trigger="click"
        style="margin-right: 30px"
        popper-class="fix-padding"
      >
        <img class="user-logo" loading="lazy" src="@/assets/image/headerUser.png" />
        <template #dropdown>
          <el-dropdown-menu>
            <div class="userinfo-bg">
              <img src="@/assets/image/headerUser.png" alt="" />
              <div class="uif-name">
                <span>wz</span>
                <span>（所念皆星河）</span>
              </div>
              <div class="uif-gs">
                <span>北京九恒星</span>
              </div>
              <div class="uif-js">
                <span>审批岗/复核岗/查询岗/申请岗/全权限</span>
              </div>
            </div>
            <el-dropdown-item
              v-for="dropdownItem in dropdownList"
              :key="dropdownItem.name"
            >
              {{ dropdownItem.name }}
              <el-icon>
                <CaretRight />
              </el-icon>
            </el-dropdown-item>
            <div
              style="
                text-align: right;
                margin: 6px 0 16px 0;
                color: #999999;
                padding-right: 16px;
              "
            >
              已登录:{{ hours }}小时{{ minites }}分{{ seconds }}秒
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useStayTime } from '@/customusehooks/staytime';
interface IdropdownList {
  name: string;
}
const dropdownList = reactive<IdropdownList[]>([
  { name: '修改密码' },
  { name: '工作代理' },
  { name: '我的交易' },
  { name: '身份切换' },
  { name: '系统设置' },
  { name: '后台管理' },
  { name: '退出' },
]);
const { hours, minites, seconds } = useStayTime();
</script>

<style lang="scss" scoped>
.header {
  height: 48px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  .header-left {
    display: flex;
    align-items: center;

    .header-logo {
      height: 26px;
      margin-right: 24px;
    }

    .logo-name {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .header-right {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 24px;
    }

    .user-logo {
      height: 30px;
    }
  }
}
</style>
<style lang="scss">
.userinfo-bg {
  height: 202px;
  width: 302px;
  box-sizing: border-box;
  padding-top: 24px;
  background-image: url('/assets/userInfoBg.png');
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  text-align: center;

  img {
    width: 54px;
  }

  .uif-name {
    font-size: 16px;
    margin: 12px 0 4px 0;
  }

  .uif-gs {
    font-size: 12px;
    margin-bottom: 4px;
  }

  .uif-js {
    font-size: 12px;
    margin-bottom: 4px;
  }
}

.fix-padding {
  border-radius: 4px !important;

  .el-popper__arrow {
    display: none;
  }

  .el-dropdown-menu {
    padding-top: 0;
  }

  .el-dropdown-menu__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
