<template>
  <v-ons-page>
    <custom-toolbar backLabel="Topic">
      {{ label }}
    </custom-toolbar>
    <v-ons-list>

      <v-ons-list-header>Topic</v-ons-list-header>
      <v-ons-card >
        <div class="title">{{ title }}</div>
        <div class="content">{{ content }}
          <br>Date:{{ createTopicDate }}
        </div>
      </v-ons-card>

      <v-ons-list-header>Comment</v-ons-list-header>
      <v-ons-list>
        <v-ons-list-item
          v-for = "comment of list" :key = "comment.id"
          tappable style="width: 100%;"
        >
          <div class="left">
            <v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>
          </div>
          <div class="center">
            <span class="list-item__title">{{comment.name}}</span><span class="list-item__subtitle">{{comment.content}}</span>
          </div>
          <div class="right">
            <span style="font-size: 5px">Date:{{comment.date}}</span>
            <v-ons-icon
              v-show="comment.canDelete"
              @click="removeComment(comment.id)"
              size="32px" style="color: #ff0d26;" icon = "ion-ios-trash-outline"></v-ons-icon>
          </div>

        </v-ons-list-item>
      </v-ons-list>
    </v-ons-list>
    <div v-show = "ifCanDelete"
      style="width: 100%; text-align: center">
      <!--open-->
      <v-ons-button v-bind:disabled="loading"
                    v-show ="ifClosed"
                    id="openTopic"
                    @click="ReOpenTopic"
                    class=" my-button button button--outline " >
        <label v-if="!loading">OpenTopic</label>
        <v-ons-icon v-if="loading" icon="ion-load-c" spin size="26px"></v-ons-icon>
      </v-ons-button>

      <!--Close-->
      <v-ons-button v-bind:disabled="loading"
                    v-show ="!ifClosed"
                    id="closeTopic"
                    @click="CloseTopic"
                    class=" my-button button button--outline " >
        <label v-if="!loading">CloseTopic</label>
        <v-ons-icon v-if="loading" icon="ion-load-c" spin size="26px"></v-ons-icon>
      </v-ons-button>

      <!--Delete-->
      <v-ons-button v-bind:disabled="loading"
                    id="deleteTopic"
                    @click=""
                    class="delete my-button button button--outline " >
        <label v-if="!loading">DeleteTopic</label>
        <v-ons-icon v-if="loading" icon="ion-load-c" spin size="26px"></v-ons-icon>
      </v-ons-button>
    </div>
    <v-ons-fab position="bottom center">
      <v-ons-icon
        @click = "showTopicDialog"
        icon="md-plus"></v-ons-icon>
    </v-ons-fab>


    <!--Add New topic-->
    <v-ons-dialog v-bind:cancelable="ifCancelable"
                  class="comment-dialog"
                  :visible.sync="dialogVisible"
    >
      <v-ons-page>
        <v-ons-toolbar>
          <div class="center">Reply</div>
        </v-ons-toolbar>

        <!--Input Content-->
        <v-ons-list-item modifier="nodivider">
          <div class="center">
          <textarea v-model="commentContent" class="textarea" rows="4"
                    style="width: 100%"
                    placeholder="Write here."></textarea>
          </div>
        </v-ons-list-item>

        <p style="text-align: center">
          <v-ons-button v-bind:disabled = 'ifCanSend'
                        modifier="light" @click="addNewReply">Send</v-ons-button>
          <v-ons-button modifier="light" @click="closeDialog">Close</v-ons-button>
        </p>
      </v-ons-page>
    </v-ons-dialog>

  </v-ons-page>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import Bus from '../../components/bus.js';
    export default {
      data() {
        return {
          loading:false,
          label:'',
          content:'',
          ifClosed:false,
          ifCanDelete:false,
          commentContent:'',
          title:'',
          createTopicDate:'',
          ifCancelable:false,
          ifCanSend:false,
          dialogVisible: false,
          list:[
            {
              id:'e1',
              name:'mars',
              content:'nice day',
              date:'2018-1-1',
            },
          ]
        };
      },
      created(){
        this.updateData();
      },
      methods: {
        removeComment:function (id) {
          let self = this;
          self.loading = true;
          var req = self.$store.state.host + self.$store.state.net.NETREQ_removeComment;
          axios.post(req, {
            cid:id
          })
            .then(function (response) {
              //console.log(response.data);
              //console.log("code:"+response.data.code+"|msg:"+response.data.msg);
              if(response.data.code!='200')
              {
                self.loading = false;
                self.showError(response.data.msg);
              }else {
                self.$ons.notification.toast({
                  message:response.data.msg,
                  buttonLabel: 'OK',
                  timeout: 1000
                }).then(function () {
                  self.loading = false;
                  self.updateData();
                });
              }
            })
            .catch(function (error) {
              self.loading = false;
              console.log(error);
            });
        },
        ReOpenTopic(){
          this.ResetTopic(false);
        },
        CloseTopic(){
          this.ResetTopic(true);
        },
        ResetTopic(ifClose){
          let self = this;
          self.loading = true;
          var req = self.$store.state.host + self.$store.state.net.NETREQ_closeTopic;
          axios.post(req, {
            topicId:self.$store.state.topicId,
            ifClose:ifClose
          })
            .then(function (response) {
              //console.log(response.data);
              //console.log("code:"+response.data.code+"|msg:"+response.data.msg);
              if(response.data.code!='200')
              {
                self.loading = false;
                self.showError(response.data.msg);
              }else {
                Bus.$emit('reloadTopic','abc');
                self.$ons.notification.toast({
                  message:response.data.msg,
                  buttonLabel: 'OK',
                  timeout: 1000
                }).then(function () {
                  self.loading = false;
                  //成功返回
                  self.$store.commit('navigator/pop');
                });
              }
            })
            .catch(function (error) {
              self.loading = false;
              console.log(error);
            });
        },
        closeDialog(){
          this.dialogVisible = false;
        },
        showTopicDialog(){
          this.dialogVisible=true;
        },
        addNewReply(){
          if(this.commentContent=='')
          {
            this.showError("Input Content");
            return;
          }
          this.ifCanSend = true;

          let self = this;
          var req = self.$store.state.host + self.$store.state.net.NETREQ_createComment;
          axios.post(req, {
            createTime:moment().format(),
            content:self.commentContent,
            topicId:self.$store.state.topicId,
          })
            .then(function (response) {
              self.commentContent='';
              self.dialogVisible = false;
              self.ifCanSend = false;
              //console.log(response.data);
              //console.log("code:"+response.data.code+"|msg:"+response.data.msg);
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {
                self.updateData();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        updateData(){
          let self = this;
          //self.chartData.splice(0);
          self.list.splice(0);
          var req = self.$store.state.host + self.$store.state.net.NETREQ_getComments;
          axios.post(req, {
            topicId:self.$store.state.topicId
          })
            .then(function (response) {
              //console.log(response.data);
              //console.log("code:"+response.data.code+"|msg:"+response.data.msg);
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {
                for(let i in response.data.list)
                {
                  var list = {};
                  list.id = response.data.list[i]._id;
                  list.name = response.data.list[i].user_name;
                  list.content = response.data.list[i].content;
                  list.date = response.data.list[i].createTime;
                  if(self.$store.state.name == list.name)
                  {
                    list.canDelete = true;
                  }else{
                    list.canDelete = false;
                  }
                  self.list.push(list);
                }
                self.ifCanDelete = response.data.ifCanDelete;
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
  .comment-dialog .dialog-container {
    height: 250px;
  }
  .my-button{
    margin: 10px;
  }
  .delete{
    border: 1px solid #ff4700;
    color:#ff4700;
  }
  .close{
  }
  .open{

  }
</style>
