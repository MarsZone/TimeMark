<template>
    <v-ons-page>
      <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
      <!-- Load more items on scroll bottom -->
      <v-ons-page :infinite-scroll="loadMore">
        <p class="intro">
            Display Action List
        </p>

        <v-ons-list>
          <v-ons-list-item v-for="item in list" :key="item.id">
            <div class="left">
            </div>
            <div class="center">
              <span class="list-item__title">Remark:{{item.remark}}</span>
              <span class="list-item__title">StartDate:{{item.startTime}}</span>
              <span class="list-item__title">EndDate:{{item.endTime}}</span>
              <span class="list-item__title">TotalLast:{{item.total_min}}min</span>
            </div>
            <div class="right">
              <v-ons-icon
                @click="removeAction(item.aid)"
                size="40px" style="color: #ff0d26;" icon = "ion-ios-trash-outline"></v-ons-icon>
            </div>
          </v-ons-list-item>
        </v-ons-list>

        <!--<div class="after-list">-->
          <!--<v-ons-icon icon="fa-spinner" size="26px" spin></v-ons-icon>-->
        <!--</div>-->

      </v-ons-page>
    </v-ons-page>

</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
      data(){
        return{
          list: [
            {
              startTime: '',
              endTime:   '',
              remark :   '',
              total_seconds:  '',
              total_min : '',
            }
          ],

          toolbarInfo: {
            backLabel: 'Panel',
            title: 'Record'
          },
        }
      },
      beforeMount() {
       this.getActionList();
      },
      methods: {
        showError(msg){
          this.$ons.notification.alert(msg,{title:'Warning'});
        },
        removeAction(aid){
          //this.showError(aid);
          let self = this;
          var req = self.$store.state.host + '/app/removeAction';
          axios.post(req, {
            actionId:    aid,
          })
            .then(function (response) {
              console.log("xxxxx");
              console.log(response.data.code);
              console.log(response.data.msg);
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {
                self.getActionList();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        getActionList(){
          //LoadFromServer.Actions List
          let self = this;
          var req = self.$store.state.host + '/app/getActionList';
          axios.post(req, {
            task_id:     self.$store.state.task_id,
            start_index: 0,
            count:       30,
          })
            .then(function (response) {
              console.log("xxxxx");
              console.log(response.data.code);
              console.log(response.data.msg);
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {
                self.list.splice(0);
                //成功获取
                for(let i in response.data.list)
                {
                  var list = {};
                  list.id = i;
                  list.aid = response.data.list[i]._id;
                  list.startTime = response.data.list[i].startTime;
                  list.endTime = response.data.list[i].endTime;
                  list.remark = response.data.list[i].remark;
                  list.total_min = (response.data.list[i].total_seconds / 60).toFixed(2);
                  self.list.push(list);
                }
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        loadMore(done) {
          //LoadFromServer.Actions List
//          let self = this;
//          var req = self.$store.state.host + '/app/getActionList';
//          axios.post(req, {
//            task_id:     self.$store.state.task_id,
//            start_index: self.list.length,
//            count:       30,
//          })
//            .then(function (response) {
//              console.log("xxxxx");
//              console.log(response.data.code);
//              console.log(response.data.msg);
//              if(response.data.code!='200')
//              {
//                self.showError(response.data.msg,done());
//              }else {
//                //self.list.splice(0);
//                //成功获取
//                setTimeout(() => {
//                  for(let i in response.data.list)
//                  {
//                    var list = {};
//                    list.id = response.data.list[i]._id;
//                    list.startTime = response.data.list[i].startTime;
//                    list.endTime = response.data.list[i].endTime;
//                    list.remark = response.data.list[i].remark;
//                    list.total_seconds = response.data.list[i].total_seconds;
//                    self.list.push(list);
//                  }
//                  done();
//                }, 600)
//
//              }
//            })
//            .catch(function (error) {
//              console.log(error);
//            });
        },
      }
    }
</script>

<style>
  .after-list {
    margin: 20px;
    text-align: center;
  }
</style>
