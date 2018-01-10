<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>

    <v-ons-list-title>Add a new {{this.$store.template_label}} task</v-ons-list-title>
    <v-ons-list>
      <!--Title-->
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <v-ons-input id="title-input" type="text" placeholder="Title" float></v-ons-input>
        </div>
      </v-ons-list-item>

      <!--Description-->
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <v-ons-input id="description-input" type="text" placeholder="Description" float></v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <!--Expend-->
    <!--Reading-->
      <!--Total Page-->
      <v-ons-list v-if="this.$store.template_label === 'Reading'">
        <v-ons-list-item modifier="nodivider">
          <div class="center">
            <v-ons-input id="page-input" type="number" placeholder="Total Page" float></v-ons-input>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    <!--Project-->
      <!--Progress-->
      <v-ons-list-item v-if="this.$store.template_label === 'Project'">
        Set Project Progress
        <v-ons-row>
          <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
            <v-ons-icon class="fa fa-signal"></v-ons-icon>
          </v-ons-col>
          <v-ons-col>
            <v-ons-range v-model="progress" style="width: 100%;"></v-ons-range>
          </v-ons-col>
        </v-ons-row>
        Progress: {{ progress }} <span v-show="Number(progress) > 80">&nbsp;(Are you sure?)</span>
      </v-ons-list-item>

    <!--Studying-->
      <!--Category-->
    <!--Sports-->
    <!--Entertainment-->

    <!--/Expend-->
    <!--StartTime-->
    <ons-list>
      <ons-list-item modifier="nodivider">
        <div class="left">
          <label class="center" >
            Select the Start date.
          </label>
        </div>
        <div class="center">
          <datetime class="datetimeStyle" v-model="startDate"></datetime>
        </div>
      </ons-list-item>
    </ons-list>

    <v-ons-list-title>Other options</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item modifier="nodivider">
        <label class="center" >
          TaskRepeat ({{ switchOn ? 'on' : 'off' }})
        </label>
        <div class="right">
          <v-ons-switch id="highlight-input" input-id="inner-highlight-input"
                      v-model="switchOn"></v-ons-switch>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <!--<v-ons-list-header>Chose the day - {{checkedDays}}</v-ons-list-header>-->
    <transition name="fade">
    <ons-list v-if="switchOn">
    <v-ons-list-item v-for="(day, $index) in weeks" :key="day" tappable>
      <label class="left">
        <v-ons-checkbox
          :input-id="'checkbox-' + $index"
          :value="day"
          v-model="checkedDays"
        >
        </v-ons-checkbox>
      </label>
      <label class="center" :for="'checkbox-' + $index">
        {{ day }}
      </label>
    </v-ons-list-item>
    </ons-list>
    </transition>

    <transition name="fade">
    <!--EndTime-->
    <ons-list v-if="!switchOn">
      <ons-list-item modifier="nodivider">
        <div class="left">
          <label class="center">
            Select the End date.
          </label>
        </div>
        <div class="center">
            <datetime class="datetimeStyle" v-model="endDate"></datetime>
        </div>
      </ons-list-item>
    </ons-list>
    </transition>

    <ons-if platform="ios other">
      <ons-button class="button button--outline my-button" >Add New Task</ons-button>
    </ons-if>
  </v-ons-page>
</template>

<script>
  import { Datetime } from 'vue-datetime';

    export default {
      data() {
        return {
          progress: 25,
          startDate:'2018-01-01 12:25:32',
          endDate:'2018-01-01 12:25:32',
          name: '',
          switchOn: false,
          weeks: ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
          checkedDays: ['Monday', 'Tuesday'],
        };
      },
      components: {
        datetime: Datetime
      }
    };
</script>

<style>
  .my-button{
    width: 100%;
    margin: 10px auto;
    text-align: center;
  }
  .datetimeStyle{
    padding: 8px 10px;
    border: 1px solid #ddd;
  }
  .datetimeStyle input{
    font-size:14px;
    color: #444;
  }
  .datetimeStyle .vdatetime-popup__header,
  .datetimeStyle .vdatetime-popup__date-picker__item--selected > span > span,
  .datetimeStyle .vdatetime-popup__date-picker__item--selected:hover > span > span {
    background: #FF9800;
  }
  .datetimeStyle .vdatetime-popup__list-picker__item--selected,
  .datetimeStyle .vdatetime-popup__actions__button {
    color: #FF9800;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
