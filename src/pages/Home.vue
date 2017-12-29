<template>
  <v-ons-page>
    <div class="tabbar tabbar--top tabbar--top-border">
      <label class="tabbar__item tabbar--top-border__item">
        <input type="radio" name="top-tabbar-b" checked="checked">
        <button class="tabbar__button tabbar--top-border__button">
          <i class="tabbar__icon fa fa-history"></i>
        </button>
      </label>

      <label class="tabbar__item tabbar--top-border__item">
        <input type="radio" name="top-tabbar-b">
        <button class="tabbar__button tabbar--top-border__button">
          <i class="tabbar__icon ion-ios-book" ></i>
        </button>
      </label>

      <label class="tabbar__item tabbar--top-border__item">
        <input type="radio" name="top-tabbar-b">
        <button class="tabbar__button tabbar--top-border__button">
          <i class="tabbar__icon ion-android-bicycle"></i>
        </button>
      </label>
    </div>
    <!--<v-ons-card v-for="page of pages" :key="page.label"-->
                <!--@click="push(page.component, page.label)"-->
    <!--&gt;-->
      <!--<div class="title">{{ page.label }}</div>-->
    <!--</v-ons-card>-->

    <TaskList></TaskList>

  </v-ons-page>
</template>

<script>
  import TaskList from '../components/home/TaskList.vue';
  export default {
    data () {
      return {
        pages: [

        ]
      };
    },
    components: { TaskList }
  };
</script>

<style>
  .intro {
    text-align: left;
    padding: 0 22px;
    margin-top: 20px;
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
