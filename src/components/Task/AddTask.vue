<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>

    <v-ons-list-title>Add a new {{this.$store.template_label}} task</v-ons-list-title>
    <v-ons-list>
      <!--Title-->
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <v-ons-input id="title-input" v-model="title" type="text" placeholder="Title" float></v-ons-input>
        </div>
      </v-ons-list-item>

      <!--Description-->
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <v-ons-input id="description-input" v-model="description" type="text" placeholder="Description" float></v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <!--Expend-->
    <!--Reading-->
      <!--Total Page-->
      <v-ons-list v-if="this.$store.template_label === 'Reading'">
        <v-ons-list-item modifier="nodivider">
          <div class="center">
            <v-ons-input id="page-input" v-model="totalPage" type="number" placeholder="Total Page" float></v-ons-input>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    <!--Project-->
      <!--Progress-->
      <v-ons-list-item v-if="this.$store.template_label === 'Project'">
        Set Project Progress
        <v-ons-row>
          <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
            <v-ons-icon class="fa fa-signal"></v-ons-icon>
          </v-ons-col>
          <v-ons-col>
            <v-ons-range v-model="progress" style="width: 100%;"></v-ons-range>
          </v-ons-col>
        </v-ons-row>
        Progress: {{ progress }} <span v-show="Number(progress) > 80">&nbsp;(Are you sure?)</span>
      </v-ons-list-item>

    <!--Studying-->
      <!--Category-->
    <!--Sports-->
    <!--Entertainment-->

    <!--/Expend-->
    <!--StartTime-->
    <v-ons-list>
      <ons-list-item modifier="nodivider">
        <div class="left">
          <label class="center" >
            Select the Start date. {{getDt}}{{diffDay}}Day
          </label>
        </div>
        <div class="center">
          <datetime class="datetimeStyle" v-model="startDate"
                    :i18n="{ok:'确认', cancel:'取消'}"
                    input-format="YYYY-MM-DD"
                    moment-locale="zh-cn">
          </datetime>
        </div>
      </ons-list-item>
    </v-ons-list>

    <!--Weight-->
    <v-ons-list-item>
      Set task weight: {{ weight /10 }}
      <v-ons-row>
        <v-ons-col>
          <v-ons-range v-model="weight" style="width: 100%;"
                       min="1" max="20"></v-ons-range>
        </v-ons-col>
      </v-ons-row>
    </v-ons-list-item>

    <v-ons-list-title>Other options</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item modifier="nodivider">
        <label class="center" >
          TaskRepeat ({{ ifRepeat ? 'on' : 'off' }})
        </label>
        <div class="right">
          <v-ons-switch id="highlight-input" input-id="inner-highlight-input"
                      v-model="ifRepeat"></v-ons-switch>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <!--<v-ons-list-header>Chose the day - {{checkedDays}}</v-ons-list-header>-->
    <transition name="fade">
    <v-ons-list v-if="ifRepeat">
      <v-ons-list-item v-for="(day, $index) in weeks" :key="day" tappable>
        <label class="left">
          <v-ons-checkbox
            :input-id="'checkbox-' + $index"
            :value="day"
            v-model="checkedDays"
          >
          </v-ons-checkbox>
        </label>
        <label class="center" :for="'checkbox-' + $index">
          {{ day }}
        </label>
      </v-ons-list-item>
    </v-ons-list>
    </transition>

    <transition name="fade">
    <!--EndTime-->
    <ons-list v-if="!ifRepeat">
      <ons-list-item modifier="nodivider">
        <div class="left">
          <label class="center">
            Select the End date.
          </label>
        </div>
        <div class="center">
            <datetime class="datetimeStyle"
                      input-format="YYYY-MM-DD"
                      v-model="endDate"></datetime>
        </div>
      </ons-list-item>
    </ons-list>
    </transition>

    <!--Commit Button-->
    <div style="width: 100%; text-align: center">
    <v-ons-button id="addNewTask"
                  class="button button--outline my-button"
                  @click="PushData">Add New Task</v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
  import { Datetime } from 'vue-datetime';
  import axios from 'axios';
  import moment from 'moment';
  axios.defaults.withCredentials = true;
    export default {
      data() {
        return {
          title:'',
          description:'',
          totalPage: '',
          weight:10,
          progress: 1,
          extendsData:{},
          diffSeconds:0,
          diffMin: 0,
          diffHour: 0,
          diffDay:0,
          startDate: moment().format(),
          endDate:  moment().format(),
          ifRepeat: false,
          weeks: ['LongTime','Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
          checkedDays: [],
          toolbarInfo: {
            backLabel: 'Home',
            title: 'New Task'
          },
        };
      },
      methods:{
        PushData(){
          //check if title, description
          if(this.title == ''){this.warningToast('Please fill the title');return;}
          if(this.description == ''){this.warningToast('Please fill the description');return;}
          //if book template check totalPage and set extends
          if(this.totalPage == ''){this.warningToast('Please fill the totalPage');return;}
          var thisTotalPage = Number(this.totalPage);
          if(thisTotalPage<0)
          {
            thisTotalPage = 1;
          }
          if(this.$store.template_label == 'Reading')
          {

            this.extendsData = {
              book:{
                curPage:1,
                totalPage:thisTotalPage,
              }
            }
          }
          //if project check progress and set extends
          if(this.$store.template_label == 'Project')
          {
            this.extendsData = {
              Project:{
                curProgress:this.progress,
                maxProgress:100,
              }
            }
          }
          //StartDate,EndDate,ifRepeat
          this.PostToServer();
        },
        PostToServer(){
          //Post to server.
          let self = this;
          var req = this.$store.state.host + self.$store.state.net.NETREQ_createTask;
          axios.post(req, {
            title: this.title,
            description: this.description,
            weight: (this.weight/10),
            startDate: this.startDate,
            endDate: this.endDate,
            ifRepeat:this.ifRepeat,
            checkedDays:this.checkedDays,
            extendsData:this.extendsData,
            templateId:this.$store.template_id,
            extendsData:this.extendsData,

          })
            .then(function (response) {
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {
                //成功返回
                //self.pop();
                self.$ons.notification.toast({
                  message:response.data.msg,
                  buttonLabel: 'OK',
                  timeout: 1000
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
        showError(msg){
          this.$ons.notification.alert(msg,{title:'Warning'});
        },
        warningToast(message){
          this.$ons.notification.alert(message,{title:'Warning'});
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
            this.endDate = this.startDate
            this.diffSeconds = 0;
          }
          this.diffMin = this.diffSeconds / 60;
          this.diffHour = this.diffMin / 60;
          this.diffDay = this.diffHour /24;

        }
      },
      components: {
        datetime: Datetime
      }
    };
</script>

<style>
  .my-button{
    width: 90%;
    margin: 10px auto;
    text-align: center;
  }
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
