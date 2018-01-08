<template>
  <v-ons-page>
    <p class="intro">
      Click category to add task<br><br>
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
            id : "100",
            tid:"1",
            label: 'xDefault',
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
        this.$store.commit('navigator/push', {
          extends: AddTask,
          data() {
            return {
              toolbarInfo: {
                backLabel: 'Chart',
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

        axios.post('http://localhost:3000/app/templateList', {
          username: this.$store.state.name
        })
          .then(function (response) {
            console.log(response);
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
              console.log(self.templateList);
              self.$forceUpdate();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    computed: {

    },
    components: {
      AddTask,
    }
  };
</script>

<style scoped>

  .intro {
    text-align: left;
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
