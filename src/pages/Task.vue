<template>
  <v-ons-page>
    <p class="intro">
      Click category to add new task<br><br>
    </p>

    <v-ons-list>
      <v-ons-list-item tappable modifier="longdivider"
                       style="height:50px; min-height: 50px"
                       v-for="template in templateList" :key="template.label"
                       @click="push(template.tid, template.label)">
        <!--<div class="left">-->
          <!--<v-ons-icon icon="md-face" class="list-item__icon"></v-ons-icon>-->
        <!--</div>-->
        <div class="title" style="width: 100% ;text-align: center;">{{ template.label }}</div>
      </v-ons-list-item>
    </v-ons-list>


  </v-ons-page>
</template>

<script>
  import axios from 'axios';
  import Bus from '../components/bus.js';
  import AddTask from '../components/Task/AddTask.vue';
  export default {
    data () {
      return {
        templateList: [
          {
            id : "",
            tid:"",
            label: '',
          }
        ]
      }
    },
    created(){
      Bus.$on('tabChange',this.tabHandler);
    },
    beforeDestroy () {
      Bus.$off('tabChange', this.tabHandler)
    },
    mounted(){

    },
    methods:{
      push(id, key) {
        this.$store.template_id = id;
        this.$store.template_label = key;
        this.$store.commit('navigator/push', {
          extends: AddTask,
          data() {
            return {
              toolbarInfo: {
                backLabel: 'Task',
                label: key
              }
            }
          }
        });
      },
      tabHandler(label){
        if(label == 'Task')
        {
          this.updateData();
        }
      },
      updateData(){
        let self = this;
        var req = this.$store.state.host +self.$store.state.net.NETREQ_templateList;
        axios.post(req, {
          email: this.$store.state.email
        })
          .then(function (response) {
            console.log("xxxxx");
            console.log("code:"+response.data.code+"|msg:"+response.data.msg);
            if(response.data.code!='200')
            {
              self.showError(response.data.msg);
            }else {
              self.templateList.splice(0);
              //成功获取
              for(let i in response.data.list)
              {
                var list = {};
                list.id = i;
                list.tid = response.data.list[i]._id;
                list.label = response.data.list[i].templateName;
                self.templateList.push(list);
              }
              //console.log(self.templateList);
              //self.$forceUpdate();
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
    computed: {

    },
    components: {
      AddTask,
    }
  };
</script>

<style>

  .intro {
    text-align: center;
    padding: 0 22px;
    margin-top: 20px;
    font-size: 14px;
    line-height: 1.4;
    color: rgba(0, 0, 0, .54);
  }
  v-ons-list{
  }
  .title{
  }
  .card__title, .card--material__title {
    font-size: 20px;
  }

</style>
