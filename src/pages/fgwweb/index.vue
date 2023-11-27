<template>
  <div class="page-header">
    <IllegalaccessCard
      class="header-item"
      v-for="headersCard in headersCardList"
      :key="headersCard.id"
      v-bind="headersCard"
    />
  </div>
  <div class="page-m">
    <div class="page-m-l">
      <CurbussePie title="当日交易业务分布" :data-source="CurbussedataSource" />
    </div>
    <div class="page-m-r">
      <CurbussePie title="当日交易渠道分布" :data-source="CurbussedataSource" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { getinvalidAccess, getoverallSituation } from '@/api/index';
import IllegalaccessCard from './components/headercard.vue';
import CurbussePie from './components/pie.vue';
const headersCardList = reactive([
  {
    id: 'overallSituation',
    requesMethod: getoverallSituation,
    mapKey: {
      left: 'accessSystemNum',
      right: 'channelNum',
    },
    showText: {
      title: '接入情况',
      left: '接入系统',
      right: '渠道',
    },
  },
  {
    id: 'invalidAccess',
    requesMethod: getinvalidAccess,
    mapKey: {
      left: 'invalidSystemNum',
      right: 'invalidAccessNum',
    },
    showText: {
      title: '当日非法接入',
      left: '系统',
      right: '接入次数',
      rightUnit: '次',
    },
  },
  {
    id: 'serviceException',
    requesMethod: getinvalidAccess,
    mapKey: {
      left: 'BP',
      right: 'CP',
    },
    showText: {
      title: '服务连接异常',
      left: '现金',
      right: '票据',
    },
  },
  {
    id: 'bankException',
    requesMethod: getinvalidAccess,
    mapKey: {
      left: 'BP',
      right: 'CP',
    },
    showText: {
      title: '银行通讯异常',
      left: '现金',
      right: '票据',
    },
  },
]);
const CurbussedataSource = reactive<{
  value: { value: number; name: string; rate: number }[];
}>({
  value: [],
});
onMounted(() => {
  setTimeout(() => {
    CurbussedataSource.value = [
      {
        value: 10,
        name: '现金',
        rate: 25.0,
      },
      {
        value: 40,
        name: '票据',
        rate: 75.0,
      },
    ];
  }, 1000);
});
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  height: 120px;
  margin-bottom: 12px;

  .header-item {
    flex: 1;

    &:not(:last-child) {
      margin-right: 12px;
    }
  }
}

.page-m {
  display: flex;
  height: 200px;
  margin-bottom: 12px;

  &-l {
    height: 100%;
    flex: 1;
    margin-right: 12px;
  }

  &-r {
    height: 100%;
    flex: 1;
  }
}

.page-f {
  display: flex;
  height: 300px;

  &-l {
    height: 100%;
    width: 65%;
    margin-right: 12px;
  }

  &-r {
    flex: 1;

    height: 100%;
  }
}
</style>
