<template>
  <v-ons-page>
    <div class="Calendar">
      <calendar-month
        :show-date="showDate"
        :events = "events"
        @setShowDate="setShowDate"
        class="holiday-us-traditional holiday-us-official"
      />
    </div>
  </v-ons-page>
</template>

<script>
  import CalendarMonth from "vue-simple-calendar";
  require("vue-simple-calendar/dist/static/css/default.css");
  require("vue-simple-calendar/dist/static/css/holidays-us.css");

  //document.write(parseISOLocal('2015-11-24T19:40:00'));
  export default {

    data: function() {
      return {
        showDate: new Date(),
        locale : 'en',
        events:[
          {
            id:'1',
            title:'Study abc',
            startDate: new Date(2017,11,28),
            endDate: new Date(2017,11,28),
          },
          {
            id:'2',
            title:'Read a book',
            startDate:'2017-12-5',
            endDate:'2017-12-5',
          },
          {
            id:'3',
            title:'CCC',
            startDate:'2017-12-5',
            endDate:'2017-12-5',
          },
          {
            id:'4',
            title:'DDD',
            startDate:'2017-12-5',
            endDate:'2017-12-5',
          },
          {
            id:'5',
            title:'FFF',
            startDate:'2017-12-5',
            endDate:'2017-12-5',
          }
        ]
      }
    },
    components: {
      CalendarMonth
    },
    methods: {
      setShowDate(d) {
        this.showDate = d;
      },
    }
  };
</script>

<style scoped>
  .Calendar {
    width: 100%;
    height: 100%;
    background-color: whitesmoke;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

</style>
