<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>

    <ons-list-title>Add a new {{this.$store.template_label}} task</ons-list-title>
    <ons-list>
      <!--Title-->
      <ons-list-item modifier="nodivider">
        <div class="center">
          <ons-input id="title-input" type="text" placeholder="Title" float></ons-input>
        </div>
      </ons-list-item>

      <!--Description-->
      <ons-list-item modifier="nodivider">
        <div class="center">
          <ons-input id="description-input" type="text" placeholder="Description" float></ons-input>
        </div>
      </ons-list-item>
    </ons-list>

    <v-ons-list-title>Other options</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item modifier="nodivider">
        <label class="center" for="inner-highlight-input">
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
    <!--DateTime-->
    <ons-list v-if="!switchOn">
      <ons-list-item modifier="nodivider">
        <div class="left">
          <label class="center" for="inner-highlight-input">
            Select The end date.
          </label>
        </div>
        <div class="center">
          <datetime v-model="date"></datetime>
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
          date: '2017-11-28',
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .datetime{

  }

</style>
