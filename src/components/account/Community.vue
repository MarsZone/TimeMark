<template>
  <v-ons-page>
    <custom-toolbar backLabel="Me">
      {{ label }}
    </custom-toolbar>
    <v-ons-segment
      active-index=0
      @postchange="displayChange"
      class="ChoiceDisplay"
      >
      <button>Open</button>
      <button>Close</button>
    </v-ons-segment>

    <v-ons-list v-for = "topic of list" :key = "topic.id"
    >
      <v-ons-list-item tappable style="width: 100%"
      >
        <div class="left">
          <v-ons-icon
            @click = "like(topic.taskid, topic.title)"
            size="24px" style="color: #6cce51;margin-right: 10px" icon = "ion-thumbsup"></v-ons-icon>
          <v-ons-icon
            @click = "dislike(topic.taskid, topic.title)"
            size="24px" style="color: #61adce;" icon = "ion-thumbsdown"></v-ons-icon>
        </div>
        <div class="center">
          <span class="list-item__title">{{topic.title}}</span>
        </div>

      </v-ons-list-item>
    </v-ons-list>

  </v-ons-page>
</template>

<script>
    import axios from 'axios';
    export default {
      data() {
        return {
          label:'',
          displayMode: 'open',
          list:[
            {
              id: '0',
              template: 'AA',
              title: 'ABCD',
              img:'http://marszm.cn/image/template/agenda.png',
              desc: 'Reading make me happy'
            }
          ],
        };
      },
      mounted(){
        //this.updateData();
      },
      methods: {
        like(){

        },
        dislike(){

        },
        displayChange(event){
          if(event.index == 0 )
          {
            this.displayMode = 'open';
          }
          if(event.index == 1 )
          {
            this.displayMode = 'close';
          }
        },
        updateData(){
          let self = this;
          //self.chartData.splice(0);
          var req = self.$store.state.host + self.$store.state.net.NETREQ_getTopicList;
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
  .ChoiceDisplay{
    width: 100%;
  }
</style>
