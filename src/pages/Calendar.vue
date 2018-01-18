<template>
  <v-ons-page>
    <ons-toolbar>
      <div class="center">
        <v-ons-segment
          active-index=1
          @postchange="displayChange"
          class="ChoiceDisplay">
          <button>Week</button>
          <button>Month</button>
          <button>Year</button>
        </v-ons-segment>
      </div>
    </ons-toolbar>

    <div class="Calendar">
      <calendar-view
        :show-date="showDate"
        :events = "events"
        :display-period-uom="displayMode"
        @setShowDate="setShowDate"
        class="holiday-us-traditional holiday-us-official"
      />
    </div>
  </v-ons-page>
</template>

<script>
  import CalendarView from "vue-simple-calendar";
  require("vue-simple-calendar/dist/static/css/default.css");
  require("vue-simple-calendar/dist/static/css/holidays-us.css");

  //document.write(parseISOLocal('2015-11-24T19:40:00'));
  export default {

    data: function() {
      return {
        showDate: new Date(),
        locale : 'en',
        displayMode: 'month',
        activeIndex:1,
        events:[
          {
            id:'e1',
            title:'Study abc',
            startDate: new Date(2017,11,28),
            endDate: new Date(2017,11,28),
          },
          {
            id:'e2',
            title:'Read a book',
            startDate:'2017-12-5',
            endDate:'2017-12-5',
          },
          {
            id:'e3',
            title:'CCC',
            startDate:'2017-12-5',
            endDate:'2017-12-5',
          },
          {
            id:'e4',
            title:'DDD',
            startDate:'2017-12-5',
            endDate:'2017-12-5',
          },
          {
            id:'e5',
            title:'FFF',
            startDate:'2017-12-5',
            endDate:'2017-12-5',
          }
        ]
      }
    },
    computed: {

    },
    components: {
      CalendarView
    },
    methods: {
      displayChange(event){
        if(event.index == 0 )
        {
          this.displayMode = 'week';
        }
        if(event.index == 1 )
        {
          this.displayMode = 'month';
        }
        if(event.index == 2 )
        {
          this.displayMode = 'year';
        }
      },
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
    display: flex;
    flex-direction: column;
    background-color: whitesmoke;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  .calendar-view {
    flex: 1 1 auto;
    margin-bottom: 1em;
  }
  .ChoiceDisplay{
    width: 90%;
  }



</style>
