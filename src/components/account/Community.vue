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
            <v-ons-select style="width: 120px" v-model="selectedItem">
              <option v-for="item in items" :value="item.value">
                {{ item.text }}
              </option>
            </v-ons-select>
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          Topic Type:{{ selectedItem }}
        </v-ons-list-item>

        <v-ons-list-item modifier="nodivider">
          <div class="center">
          <textarea v-model="content" class="textarea" rows="4"
                    style="width: 100%"
                    placeholder="Write here."></textarea>
          </div>
        </v-ons-list-item>

        <p style="text-align: center">
          <v-ons-button modifier="light" @click="dialogVisible = false">Send</v-ons-button>
          <v-ons-button modifier="light" @click="dialogVisible = false">Close</v-ons-button>
        </p>
      </v-ons-page>
    </v-ons-dialog>

  </v-ons-page>
</template>

<script>
    import axios from 'axios';
    export default {
      data() {
        return {
          label:'',
          dialogVisible: false,
          displayMode: 'open',
          selectedItem: 'Advise',
          ifCancelable:false,
          content:'',
          items: [
            { text: 'Advise', value: 'Advise' },
            { text: 'Bug', value: 'Bug Report' },
            { text: 'Improve', value: 'Something your want' },
            { text: 'Anything', value: 'Anything want to talk' },
          ],
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
        showTopicDialog(){
          this.dialogVisible=true;
        },
        addNewTopic(){

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
          })
            .then(function (response) {
              console.log(response.data);
              console.log("code:"+response.data.code+"|msg:"+response.data.msg);
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {

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
</style>
