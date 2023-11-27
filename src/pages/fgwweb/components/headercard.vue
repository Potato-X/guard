<template>
  <div class="card-header-r">
    <div class="card-header-r-title">{{ showText.title }}</div>
    <div class="card-header-r-body">
      <div class="card-part-item">
        <div class="statistic-label">{{ showText.left }}</div>
        <div class="statistic">
          <span class="statistic-count">{{ cardInfo.left ?? '--' }}</span
          >{{ showText.leftUnit || '个' }}
        </div>
      </div>
      <div class="card-part-item">
        <div class="statistic-label">{{ showText.right }}</div>
        <div class="statistic">
          <span class="statistic-count">{{ cardInfo.right ?? '--' }}</span
          >{{ showText.rightUnit || '个' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
const props = defineProps({
  requesMethod: {
    type: Function,
    required: true,
  },
  mapKey: {
    type: Object,
    default: () => {},
  },
  showText: {
    type: Object,
    default: () => {
      return {
        title: '',
        leftText: '',
        leftUnit: '个',
        rightText: '',
        rightUnit: '个',
      };
    },
  },
});
const cardInfo = reactive({
  left: 0,
  right: 0,
});
onMounted(() => {
  props.requesMethod().then((res:any) => {
    if (res.status == '00000') {
      let obj = res.data;
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          cardInfo['left'] = obj[props.mapKey['left']];
          cardInfo['right'] = obj[props.mapKey['right']];
        }
      }
    }
  });
});
</script>

<style lang="scss" scoped>
.card-header-r {
  height: 100%;
  background-color: #fff;
  padding: 20px 0 0 20px;
  box-sizing: border-box;
  border-radius: 10px;

  // box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.04);
  &-title {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
  }

  &-body {
    display: flex;

    .card-part-item {
      position: relative;
      flex: 1;
      color: #666666;

      .statistic {
        color: #333333;
        .statistic-count {
          font-size: 30px;
          font-weight: 700;
          line-height: 34px;
        }
      }

      .statistic-label {
        margin-bottom: 12px;
        line-height: 16px;
      }

      &:first-child::after {
        display: inline-block;
        height: 32px;
        position: absolute;
        right: 18px;
        bottom: 6px;
        content: '';
        opacity: 0.7;
        background-color: #c8c8c8;
        width: 1px;
      }
    }
  }
}
</style>
