<template>
  <v-ons-page>
    <custom-toolbar backLabel="Me">
      {{ label }}
    </custom-toolbar>
    <section style="">
      <v-ons-segment
        active-index=0
        @postchange="displayChange"
        class="ChoiceDisplay"
        >
        <button>Open</button>
        <button>Close</button>
      </v-ons-segment>

      <v-ons-list >
        <v-ons-list-item
          v-for = "topic of list" :key = "topic.id"
          tappable style="width: 100%;"
          v-bind:class=[topic.typeClass]
        >
          <div class="center">
            <span class="list-item__title">{{topic.content}}</span>
          </div>

          <div class="left">
            <v-ons-icon
              @click = "like(topic.topicId)"
              size="24px" style="color: #6cce51;margin-right: 10px" icon = "ion-thumbsup"></v-ons-icon>
            <v-ons-icon
              @click = "dislike(topic.topicId)"
              size="24px" style="color: #61adce;" icon = "ion-thumbsdown"></v-ons-icon>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </section>

    <v-ons-fab position="bottom right">
      <v-ons-icon
        @click = "showTopicDialog"
        icon="md-plus"></v-ons-icon>
    </v-ons-fab>

    <v-ons-dialog v-bind:cancelable="ifCancelable"
                  class="lorem-dialog"
                  :visible.sync="dialogVisible"
    >
      <!-- Optional page. This could contain a Navigator as well. -->
      <v-ons-page>
        <v-ons-toolbar>
          <div class="center">New Topic</div>
        </v-ons-toolbar>

        <p style="text-align: center">Say Something</p>

        <v-ons-list-item>
          <div class="center" style="text-align: center">
            <v-ons-select style="width: 120px" v-model="selectValue">
              <option v-for="item in items" :value="item.value">
                {{ item.value }}
              </option>
            </v-ons-select>
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          Topic Type:{{ selectText }}
        </v-ons-list-item>

        <v-ons-list-item modifier="nodivider">
          <div class="center">
          <textarea v-model="content" class="textarea" rows="4"
                    style="width: 100%"
                    placeholder="Write here."></textarea>
          </div>
        </v-ons-list-item>

        <p style="text-align: center">
          <v-ons-button v-bind:disabled = 'ifCanSend'
                        modifier="light" @click="addNewTopic">Send</v-ons-button>
          <v-ons-button modifier="light" @click="closeDialog">Close</v-ons-button>
        </p>
      </v-ons-page>
    </v-ons-dialog>

  </v-ons-page>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
      data() {
        return {
          label:'',
          isActive:true,
          dialogVisible: false,
          displayMode: 'open',
          selectValue:'Advise',
          ifCancelable:false,
          ifCanSend:false,
          content:'',
          items: [
            { text: 'Advise', value: 'Advise' },
            { text: 'Bug Report', value: 'Bug' },
            { text: 'Something your want', value: 'Improve' },
            { text: 'Anything want to talk', value: 'Anything' },
          ],
          list:[
            {
//              id: '0',
//              template: 'AA',
//              title: 'ABCD',
//              img:'http://marszm.cn/image/template/agenda.png',
//              desc: 'Reading make me happy'
            }
          ],
        };
      },
      created(){
        this.updateData();
      },
      computed: {
        selectText: function () {
          var itemlist = this.items;
          for(var i in itemlist)
          {
            if(itemlist[i].value == this.selectValue)
            {
              return itemlist[i].text;
            }
          }
          return '';
        },
      },
      methods: {
        like(){

        },
        dislike(){

        },
        closeDialog(){
          this.dialogVisible = false;
        },
        showTopicDialog(){
          this.content='';
          this.dialogVisible=true;
        },
        addNewTopic(){
          this.ifCanSend = true;
          let self = this;
          var req = self.$store.state.host + self.$store.state.net.NETREQ_createTopic;
          axios.post(req, {
            createTime:moment().format(),
            content:self.content,
            type:self.selectValue,
          })
            .then(function (response) {
              self.content='';
              self.dialogVisible = false;
              self.ifCanSend = false;
              console.log(response.data);
              console.log("code:"+response.data.code+"|msg:"+response.data.msg);
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
          self.list.splice(0);
          var req = self.$store.state.host + self.$store.state.net.NETREQ_getTopicList;
          axios.post(req, {
          })
            .then(function (response) {
              console.log(response.data);
              console.log("code:"+response.data.code+"|msg:"+response.data.msg);
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {
                for(let i in response.data.list)
                {
                  var list = {};
                  list.id = response.data.list[i]._id;
                  list.topicId = response.data.list[i]._id;
                  list.content = response.data.list[i].content;
                  list.like = response.data.list[i].like;
                  list.type = response.data.list[i].type;
                  list.createTime = response.data.list[i].createTime;
                  if(list.type == 'Bug')
                  {
                    list.typeClass = 'bugLine';
                  }
                  if(list.type == 'Advise')
                  {
                    list.typeClass = 'adviseLine';
                  }
                  if(list.type == 'Improve')
                  {
                    list.typeClass = 'ImproveLine';
                  }
                  if(list.type == 'Anything')
                  {
                    list.typeClass = 'AnythingLine';
                  }

                  self.list.push(list);
                }
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
  .lorem-dialog .dialog-container {
    height: 400px;
  }
  .bugLine{
    background: rgba(205, 206, 0, 0.2);
  }
  .adviseLine{
    background: rgba(13, 147, 206, 0.2);
  }
  .ImproveLine{
    background: rgba(48, 40, 238, 0.2);
  }
  .AnythingLine{
    background: rgba(238, 0, 112, 0.2);
  }
</style>
