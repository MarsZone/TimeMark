<template>
  <div>
      <v-ons-list v-for = "task of list" :key = "task.id"
                  @click="push(task.taskid, task.title,task.extends)"
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
            <v-ons-icon
              @click = "runTask(task.taskid, task.title)"
              size="30px" style="color: #bbcebb;" icon = "ion-play"></v-ons-icon>
          </div>
        </v-ons-list-item>
      </v-ons-list>
  </div>
</template>

<script>
    import taskPanel from '../../components/Task/TaskPanel.vue';
    import axios from 'axios';
    import Bus from '../../components/bus';
    import progress from '../../components/Task/Progress.vue';
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
          ],
          ifClickIcon:false,
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
                if(response.data.code=='401')
                {
                  self.$ons.notification.alert({
                    message:response.data.msg,
                    title:'Warning',
                    callback:function () {
                      self.$store.commit('tabbar/set', 4)//4 is the index of me.
                    }
                  });
                }else {
                  self.showError(response.data.msg);
                }
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
                  list.extends = response.data.list[i].extends;
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
        runTask(id,key){
          this.$store.state.task_id = id;
          this.$store.state.task_label = key;
          this.ifClickIcon = true;
          this.$store.commit('navigator/push', {
            extends: progress,
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
        push(id, key,ext) {
          if(this.ifClickIcon == true)
          {
            this.ifClickIcon = false;
          }else{
            this.$store.state.task_id = id;
            this.$store.state.task_label = key;
            this.$store.state.extends_data = ext;

            this.$store.commit('navigator/push', {
              extends: taskPanel,
              data() {
                return {
                  toolbarInfo: {
                    backLabel: 'Home',
                    title: key
                  }
                }
              }
            });
          }
        },
        components: {taskPanel,progress}
      },
    }
</script>

<style>

</style>
