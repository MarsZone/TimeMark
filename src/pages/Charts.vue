<template>
  <v-ons-page>
    <v-ons-card v-for="chart of charts" :key="chart.label"
    @click="push(chart.component, chart.label)"
    >
    <div class="title">{{ chart.label }}</div>
      <div class="content">{{ chart.desc }}</div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
  import Week from '../components/charts/Week.vue';
  export default {
    components: {
      Week
    },
    data: function () {
      return {
        charts:[
          {
            component: Week,
            label:'Week View'
          }
        ]
      }
    },
    methods: {
      push(chart, key) {
        this.$store.commit('navigator/push', {
          extends: chart,
          data() {
            return {
              toolbarInfo: {
                backLabel: 'Chart',
                title: key
              }
            }
          }
        });
      }
    }
  }
</script>

<style scoped>
  .Charts {

  }

</style>
