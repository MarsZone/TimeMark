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

  export default {

    data: function() {
      return {
        showDate: new Date(),
        locale : 'en',
        events:[
          {
            id:'1',
            title:'Study abc',
            startDate:'2017-12-28',
            endDate:'2017-12-28',
          },
          {
            id:'2',
            title:'Read a book',
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
