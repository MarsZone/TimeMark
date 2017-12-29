<template>
  <div>
      <v-ons-list v-for = "task of list" :key = "task.id"
                  @click="push(task.id, task.title)"
      >
        <v-ons-list-item tappable>
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
      methods: {
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
