<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <div class="Charts">
      <chart
        :options="optionsData"></chart>
    </div>
  </v-ons-page>
</template>

<script>
  import axios from 'axios';

  export default {
    components: {
      //chart: ECharts
    },
    created(){
    },
    mounted(){

      //console.log(mondayDate) ;
      //console.log(sundayDate) ;
      this.updateData();
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
        legendLabelData:['学习','搜索引擎'],
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
            data:[],
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
      optionsData: function () {
        this.options.series = this.chartData;
        this.options.legend.data = this.legendLabelData;
        return this.options;
      }
    },
    methods: {
      updateData:function(){
        //获取周一和周日的date
        var mondayDate;
        var sundayDate;
        var now = new Date();
        now.setHours(0,0,0,0);
        var nowTime = now.getTime() ;
        var day = now.getDay();
        var oneDayLong = 24*60*60*1000 ;
        if(day == 0)
        {
          day =7;
        }
        var MondayTime = nowTime - (day-1)*oneDayLong  ;
        var SundayTime =  nowTime + (7-day)*oneDayLong ;
        mondayDate = new Date(MondayTime);
        sundayDate = new Date(SundayTime);
        console.log(mondayDate);
        console.log(sundayDate);

        let self = this;
        //self.chartData.splice(0);
        var req = self.$store.state.host + self.$store.state.net.NETREQ_chartWeekView;
        axios.post(req, {
//          email:self.$store.state.email
          mondayDate:mondayDate,
          sundayDate:sundayDate,
        })
          .then(function (response) {
            console.log(response.data);
            console.log("code:"+response.data.code+"|msg:"+response.data.msg);
            if(response.data.code!='200')
            {
              self.showError(response.data.msg);
            }else {
              self.chartData.splice(0);
              self.legendLabelData.splice(0);
              //成功获取
              for(let task in response.data.list){
                var title = task.substr(0,8);
                title = title +'...';
                //console.log(title);
                self.legendLabelData.push(title);//Label

                let TaskWeekValue = [0,0,0,0,0,0,0];
                for(let day in response.data.list[task])
                {
                  TaskWeekValue[(day - 1)] = (response.data.list[task][day].TotalS / 60).toFixed(1);
                }
                var oneTask = {
                  name: title,
                  type:'line',
                  stack: 'Max',
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                  areaStyle: {normal: {}},
                  data:TaskWeekValue
                }
                console.log(TaskWeekValue);
                self.chartData.push(oneTask);
              }
              console.log(self.chartData);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      showError(msg){
        this.$ons.notification.alert(msg,{title:'Warning'});
      },
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
