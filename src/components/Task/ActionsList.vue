<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <!-- Load more items on scroll bottom -->
    <v-ons-page :infinite-scroll="loadMore">
      <p class="intro">
          Get Action List
      </p>

      <v-ons-list>
        <v-ons-list-item v-for="item in list" :key="item">
          Item #{{ item }}
        </v-ons-list-item>
      </v-ons-list>

      <div class="after-list">
        <v-ons-icon icon="fa-spinner" size="26px" spin></v-ons-icon>
      </div>
    </v-ons-page>

  </v-ons-page>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
      data(){
        return{
          list: [
            {
              startTime: '',
              endTime:   '',
              remark :   '',
              total_seconds:  '',
            }
          ],

          toolbarInfo: {
            backLabel: 'Panel',
            title: 'Record'
          },
        }
      },
      created() {
        //LoadFromServer.
      },
      methods: {
        loadMore(done) {

        },
      }
    }
</script>

<style>

</style>
