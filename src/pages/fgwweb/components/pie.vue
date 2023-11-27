<template>
  <div class="chart-box">
    <div class="header">
      <span class="header-title">{{ title }}</span>
    </div>
    <span class="unit">单位：笔数</span>
    <div ref="echart" style="height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref, reactive, watch } from 'vue';
const echart = ref();
let props = defineProps({
  title: {
    type: String,
    default: '',
  },
  dataSource: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
console.log(props.dataSource);
let chart:any = null;
const options = reactive({
  radius: ['38%', '54%'],
  center: ['50%', '50%'],
  label: {
    show: false,
    position: 'center',
    color: '#3d4a57',
    fontSize: 18,
    formatter: '{b}\n\n{d}%',
  },
  emphasis: {
    label: {
      show: true,
    },
  },
  color: [
    '#007aff',
    '#a285d2',
    '#73a0fa',
    '#83d0ef',
    '#F7C739',
    '#5AD8A6',
    'rgba(93,112,146,0.85)',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc',
  ],
  tooltip: {
    trigger: 'item',
    formatter: '{b}<br />交易笔数：{c} <br />占比：{d}%',
    borderColor: '#fff',
  },
  legend: {
    type: 'scroll',
    icon: 'circle',
    orient: 'vertical',
    top: 'middle',
    bottom: 'middle',
    right: '20%',
    data: [],
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      right: '60%',
      top: 50,
      labelLine: {
        show: false,
      },
      label: {
        show: false,
        position: 'outside',
        formatter: '',
      },
      data: [],
    },
  ],
});
function resize() {
  chart.resize();
}
watch(
  () => props.dataSource,
  (newvalue) => {
    console.log(newvalue);
    let options = {
      legend: {
        data: props.dataSource.value.map((item:any) => item.name),
        formatter: (name:string) => {
          let list = props.dataSource.value;
          list.forEach((e:any) => {
            if (name === e.name) {
              name = e.name + '    ' + e.value + '     ' + e.rate + '%';
            }
          });
          return name;
        },
      },
      series: [
        {
          data: props.dataSource.value,
        },
      ],
    };
    chart.setOption(options);
  },
  { deep: true },
);

function initChart() {
  chart = echarts.init(echart.value);
  console.log(chart);
  chart.setOption(options);
}
onMounted(() => {
  initChart();
  window.addEventListener('resize', resize);
  console.log(echart.value);
});
</script>

<style lang="scss" scoped>
.chart-box {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  position: relative;

  span.unit {
    position: absolute;
    top: 25px;
    left: 180px;
    font-size: 12px;
    color: #999999;
  }

  .header {
    width: calc(100% - 57px);
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 100;
    top: 20px;
    left: 20px;

    span.header-title {
      font-size: 16px;
      font-weight: 600;
      color: #000;
    }
  }
}

.placeholder-picture {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  div {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    color: #646566;
  }
}
</style>
