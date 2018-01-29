<template>
  <v-ons-page>
    <custom-toolbar backLabel="Topic">
      {{ label }}
    </custom-toolbar>
    <v-ons-list>

      <v-ons-list-header>Topic</v-ons-list-header>
      <v-ons-card >
        <div class="title">{{ title }}</div>
        <div class="content">{{ content }}</div>
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
            <span>Date:{{comment.date}}</span>
          </div>

        </v-ons-list-item>
      </v-ons-list>

    </v-ons-list>
  </v-ons-page>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
      data() {
        return {
          label:'',
          content:'',
          title:'',
          list:[
            {
              id:'e1',
              name:'mars',
              content:'nice day',
              date:'2018-1-1',
            }
          ]
        };
      },
    }
</script>

<style>

</style>
