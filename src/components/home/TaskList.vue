<template>
  <div>
      <v-ons-list v-for = "task of list" :key = "task.id"
                  @click="push(task.id, task.title)"
      >
        <v-ons-list-item tappable
                        >
          <div class="left">
            <img :src=task.img class="list-item__thumbnail" style="width: 36px;height: 36px;"/>
          </div>
          <div class="center">
            <span class="list-item__title">{{task.title}}</span><span class="list-item__subtitle">{{task.desc}}</span>
          </div>
          <div class="right">
            <v-ons-icon size="25px" style="color: #ff0d26;" icon = "ion-ios-trash-outline"></v-ons-icon>
          </div>
        </v-ons-list-item>
      </v-ons-list>
  </div>
</template>

<script>
    import TaskProgress from '../../pages/Progress.vue';
    import axios from 'axios';
    import Bus from '../../components/bus';
    export default {
      data () {
        return {
          list:[
            {
              id: '0',
              template: 'AA',
              title: 'C# Book',
              img:'http://marszm.cn/image/template/agenda.png',
              desc: 'Reading make me happy'
            },
            {
              id: '1',
              template: 'BB',
              title: 'Running',
              img:'http://marszm.cn/image/template/dumbbell.png',
              desc: 'Fit make me strong'
            },
            {
              id: '2',
              template: 'BB',
              title: 'Dev TimeMark',
              img:'http://marszm.cn/image/template/coding.png',
              desc: 'Dev make me smart'
            }
          ]
        };
      },
      created(){
        Bus.$on('tabChange',this.tabHandler);
        this.updateData();
      },
      beforeDestroy () {
        Bus.$off('tabChange', this.tabHandler)
      },
      methods: {
        tabHandler(label){
          if(label == 'Home')
          {
            this.updateData();
          }
        },
        updateData(){
          let self = this;
          var req = this.$store.state.host + '/app/taskList';
          self.list.splice(0);
          axios.post(req, {
            username: this.$store.state.name
          })
            .then(function (response) {
              console.log(response);
              console.log("code:"+response.data.code+"|msg:"+response.data.msg);
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
                  list.taskid = response.data.list[i]._id;
                  list.title = response.data.list[i].title;
                  list.template = response.data.list[i].templateId;
                  list.desc = response.data.list[i].description;
                  list.img = response.data.list[i].imgUrl;
                  self.list.push(list);
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
        push(id, key) {
          this.$store.state.task_id = id;
          this.$store.commit('navigator/push', {
            extends: TaskProgress,
            data() {
              return {
                toolbarInfo: {
                  backLabel: 'Home',
                  title: key
                }
              }
            }
          });
        },
        components: { TaskProgress }
      },
    }
</script>

<style>

</style>
