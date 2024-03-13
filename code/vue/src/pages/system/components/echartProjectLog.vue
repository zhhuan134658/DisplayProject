<template>
  <div id="dataCA" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    names: {
      type: Array,
      default: [],
    },
    values: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.names,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999',
          },
        },
        splitLine: {
          //分割线配置
          show: true,
          lineStyle: {
            color: '#F9F9F9',
          },
        },
      },
      series: [
        {
          data: this.values,
          type: 'line',
          // areaStyle: {},
          smooth: true,
          itemStyle: {
            textStyle: {
              fontSize: 12,
            },
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' },
              ]),
              lineStyle: {
                width: 3, //设置线条粗细
              },
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#2378f7',
                },
                {
                  offset: 0.7,
                  color: '#2378f7',
                },
                {
                  offset: 1,
                  color: '#83bff6',
                },
              ]),
            },
          },
        },
      ],
    };
    let chartDom = document.getElementById('dataCA');
    let myChart = echarts.init(chartDom);
    window.onresize = function () {
      myChart.resize();
    };
    myChart.setOption(option);
    console.log('渲染图标', this.option);

    this.option = option;
  },
  data() {
    return {
      option: {},
    };
  },
};
</script>

