<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <p class="intro">
      This is {{this.$store.state.task_label}} Task.<br>
    </p>

    <v-ons-card v-for="page of pages" :key="page.label"
                @click="push(page.component, page.label)"
    >
      <div style="width: 100% ;text-align: center;"class="title">{{ page.label }}</div>
      <div style="width: 100% ;text-align: center;"class="content">{{ page.desc }}</div>
    </v-ons-card>

    <div style="width: 100% ;text-align: center;" >
      <v-ons-icon tappable size="40px" style="color: #ffaf53;" icon = "ion-checkmark-circled"></v-ons-icon>
    </div>


    <p class="taskData">
      Created Date: 2018-1-1 12:00:01<br>
      Process Actions: 10 times<br>
      Total Time : 120min | 2H <br>
      <br>
    </p>

    <div style="width: 100% ;text-align: center;" >
      <v-ons-icon size="40px" style="color: #ff0d26;" icon = "ion-ios-trash-outline"></v-ons-icon>
    </div>

  </v-ons-page>
</template>

<script>
    import progress from './Progress.vue';
    import createAction from './CreateAction.vue';
    export default {
      data () {
        return {
          pages: [
            {
              component: progress,
              label: 'Record',
              desc: 'Normal Record'
            },
            {
              component: progress,
              label: 'Create Action',
              desc: 'Add one action'
            },
            {
              component: progress,
              label: 'ActionsList',
              desc: 'CheckTheList'
            },
          ],
          toolbarInfo: {
            backLabel: 'Home',
            title: ''
          },
        };
      },
      methods: {
        push(page, key) {
          this.$store.commit('navigator/push', {
            extends: page,
            data() {
              return {
                toolbarInfo: {
                  backLabel: 'Panel',
                  title: key
                }
              }
            }
          });
        }
      }

    }
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
  .taskData{
    text-align: center;
    padding: 0 22px;
    font-size: 14px;
    line-height: 1.4;
    color: rgba(0, 0, 0, .54);
  }
  ons-card {
    cursor: pointer;
    color: #333;
  }
  .card__title, .card--material__title {
    font-size: 20px;
  }
</style>
