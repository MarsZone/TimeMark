<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <div class="Charts">
      <chart :options="options"></chart>
    </div>
  </v-ons-page>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts.vue'
  // import ECharts modules manually to reduce bundle size
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  // built-in theme
  import 'echarts/theme/dark'
  export default {
    components: {
      chart: ECharts
    },
    data: function () {

      return {
        options:{
          title: {
            text: '一周统计'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data:['学习','运动','项目','默认','搜索引擎']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '1%',
            right: '2%',
            bottom: '1%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,

              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel : {
                formatter: '{value} min'
              }
            }
          ],
          series : [
            {
              name:'学习',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'运动',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'项目',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
              name:'默认',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {normal: {}},
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
      }
    }
  }
</script>

<style>
  .Charts {
    width: 100%;
    height: 100%;
  }
</style>
