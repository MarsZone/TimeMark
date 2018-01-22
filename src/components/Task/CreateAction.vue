<template>
    <v-ons-page>
      <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
      <v-ons-list-title>Add a new action</v-ons-list-title>
      <!--StartTime-->
      <v-ons-list>
        <ons-list-item modifier="nodivider">
          <div class="left">
            <label class="center" >
              Select the Start date.
            </label>
          </div>
          <div class="center">
            <datetime class="datetimeStyle" v-model="startDate" type="datetime" auto-continue></datetime>
          </div>
        </ons-list-item>
      </v-ons-list>

      <!--EndTime-->
      <ons-list>
        <ons-list-item modifier="nodivider">
          <div class="left">
            <label class="center">
              Select the End date .
            </label>
          </div>
          <div class="center">
            <datetime class="datetimeStyle" v-model="endDate" type="datetime" auto-continue></datetime>
          </div>
        </ons-list-item>
      </ons-list>

      <ons-list>
        <ons-list-item modifier="nodivider">
          <div class="left">
            <label class="center">
              {{getDt}}{{diffHour}}h  {{diffMin}}m  {{diffSeconds}}s
            </label>
          </div>
        </ons-list-item>
      </ons-list>

      <v-ons-list>
        <!--Remark-->
        <v-ons-list-item modifier="nodivider">
          <div class="center">
            <textarea v-model="remark" class="textarea" rows="3"
                      style="width: 100%"
                      placeholder="Remark write something about this process."></textarea>
          </div>
        </v-ons-list-item>
      </v-ons-list>

      <div style="width: 100%; text-align: center">
        <v-ons-button id="createAction"
                      @click="createAction"
                      class="my-button button button--outline " >Create
        </v-ons-button>
      </div>
    </v-ons-page>
</template>

<script>
    import { Datetime } from 'vue-datetime';
    import axios from 'axios';
    import moment from 'moment';
    axios.defaults.withCredentials = true;
    export default {
      data(){
        return{
          remark:'',
          startDate: moment().format(),
          endDate:  moment().format(),
          diffSeconds:0,
          diffMin: 0,
          diffHour: 0,
          toolbarInfo: {
            backLabel: 'Panel',
            title: 'Record'
          },
        }
      },
      methods:{
        showError(msg){
          this.$ons.notification.alert(msg,{title:'Warning'});
        },
        createAction(){
          //遇到个问题，如果action日期重复怎么办。暂时没什么好办法解决，先放着.
          // 其实不解决也可以，因为同一时间确实可以做两件事
          //Post to server.
          let self = this;
          var req = self.$store.state.host + self.$store.state.net.NETREQ_createAction;
          console.log(req);
          axios.post(req, {
            task_id:        self.$store.state.task_id,
            task_title:     self.$store.state.task_label,
            total_seconds:  self.diffSeconds,
            startTime:      self.startDate,
            endTime:        self.endDate,
            remark:         self.remark,
            state:         'End',
          })
            .then(function (response) {
              console.log("xxxxx");
              console.log(response.data.code);
              console.log(response.data.msg);
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {
                //self.pop();
                self.$ons.notification.toast({
                  message:response.data.msg,
                  buttonLabel: 'OK',
                  timeout: 500
                }).then(function () {
                  //成功返回
                  self.pop();
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        pop(){
          this.$store.commit('navigator/pop');
        }
      },
      computed:{
        getDt:function () {
          var st = moment(this.startDate);
          var et = moment(this.endDate);
          //this.diffSeconds = st.diff(et) / 1000;
          this.diffSeconds = moment(et - st) / 1000;
          if(this.diffSeconds < 0)
          {
            this.showError("EndDate must after start date.");
            this.startDate = moment().format();
            this.endDate = moment().format();
            this.diffSeconds = 0;
          }else {
            this.diffMin = this.diffSeconds / 60;
            this.diffHour = (this.diffMin / 60).toFixed(1);
          }
        }
      }
    }
</script>

<style>
  .datetimeStyle{
    padding: 8px 10px;
    border: 1px solid #ddd;
  }
  .datetimeStyle input{
    font-size:14px;
    color: #444;
  }
  .datetimeStyle .vdatetime-popup__month-selector{
    padding: 0px;
  }
  .datetimeStyle .vdatetime-popup__header,
  .datetimeStyle .vdatetime-popup__date-picker__item--selected > span > span,
  .datetimeStyle .vdatetime-popup__date-picker__item--selected:hover > span > span {
    background: #FF9800;
  }
  .datetimeStyle .vdatetime-popup__list-picker__item--selected,
  .datetimeStyle.vdatetime-popup__actions__button {
    color: #FF9800;
  }
  .my-button{
    width: 90%;
    margin: 10px auto;
    text-align: center;
  }
</style>
