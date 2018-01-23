<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <div class="Charts">
      <chart
        :options="seriesdata"></chart>
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
  import axios from 'axios';
  import Bus from '../../components/bus.js';

  export default {
    components: {
      chart: ECharts
    },
    data: function () {
      return {
        chartData:[
          {
            name:'学习',
            type:'line',
            stack: 'Max',
            areaStyle: {normal: {}},
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'运动',
            type:'line',
            stack: 'Max',
            areaStyle: {normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'项目',
            type:'line',
            stack: 'Max',
            areaStyle: {normal: {}},
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'默认',
            type:'line',
            stack: 'Max',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'搜索引擎',
            type:'line',
            stack: 'Max',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {normal: {}},
            data:[120, 932, 901, 934, 1290, 1330, 1320]
          }
        ],
        options:{
          title: {
            text: 'Week View'
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
            data:['学习','运动','项目','默认','搜索引擎'],
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '1%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
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
          series : []
        },
        toolbarInfo: {
          backLabel: 'Chart',
          title: 'WeekView'
        },
      }
    },
    computed: {
      seriesdata: function () {
        this.options.series = this.chartData;
        return this.options;
      }
    },
    methods: {

    },
  }
</script>

<style>
  .Charts {
    width: 100%;
    /*height: 100%;*/

    -webkit-transform: rotateZ(90deg);
    -moz-transform: rotateZ(90deg);
    -o-transform: rotateZ(90deg);
    -ms-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }
  .echarts{
    transform:scaleY(0.9);
  }
</style>
