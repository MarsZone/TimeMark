<template>
    <v-ons-page>
      <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
      <v-ons-list-title>Add a new action</v-ons-list-title>
      <!--StartTime-->
      <v-ons-list>
        <ons-list-item modifier="nodivider">
          <div class="left">
            <label class="center" >
              Select the Start date.
            </label>
          </div>
          <div class="center">
            <datetime class="datetimeStyle" v-model="startDate" type="datetime" auto-continue></datetime>
          </div>
        </ons-list-item>
      </v-ons-list>

      <!--EndTime-->
      <ons-list>
        <ons-list-item modifier="nodivider">
          <div class="left">
            <label class="center">
              Select the End date .
            </label>
          </div>
          <div class="center">
            <datetime class="datetimeStyle" v-model="endDate" type="datetime" auto-continue></datetime>
          </div>
        </ons-list-item>
      </ons-list>

      <ons-list>
        <ons-list-item modifier="nodivider">
          <div class="left">
            <label class="center">
              {{getDt}}{{diffHour}}h  {{diffMin}}m  {{diffSeconds}}s
            </label>
          </div>
        </ons-list-item>
      </ons-list>

      <v-ons-list>
        <!--Remark-->
        <v-ons-list-item modifier="nodivider">
          <div class="center">
            <textarea v-model="remark" class="textarea" rows="3"
                      style="width: 100%"
                      placeholder="Remark write something about this process."></textarea>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
</template>

<script>
    import { Datetime } from 'vue-datetime';
    import axios from 'axios';
    import moment from 'moment';
    axios.defaults.withCredentials = true;
    export default {
      data(){
        return{
          remark:'',
          startDate: moment().format(),
          endDate:  moment().format(),
          diffSeconds:0,
          diffMin: 0,
          diffHour: 0,
          toolbarInfo: {
            backLabel: 'Panel',
            title: 'Record'
          },
        }
      },
      computed:{
        getDt:function () {
          var st = moment(this.startDate);
          var et = moment(this.endDate);
          this.diffSeconds = Math.abs(st.diff(et)) / 1000;
          this.diffMin = this.diffSeconds / 60;
          this.diffHour = (this.diffMin / 24).toFixed(1);
        }
      }
    }
</script>

<style>
  .datetimeStyle{
    padding: 8px 10px;
    border: 1px solid #ddd;
  }
  .datetimeStyle input{
    font-size:14px;
    color: #444;
  }
  .datetimeStyle .vdatetime-popup__month-selector{
    padding: 0px;
  }
  .datetimeStyle .vdatetime-popup__header,
  .datetimeStyle .vdatetime-popup__date-picker__item--selected > span > span,
  .datetimeStyle .vdatetime-popup__date-picker__item--selected:hover > span > span {
    background: #FF9800;
  }
  .datetimeStyle .vdatetime-popup__list-picker__item--selected,
  .datetimeStyle.vdatetime-popup__actions__button {
    color: #FF9800;
  }
</style>
