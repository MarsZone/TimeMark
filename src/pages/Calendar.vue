<template>
  <v-ons-page>
    <ons-toolbar>
      <div class="center">
        <v-ons-segment
          active-index=1
          @postchange="displayChange"
          class="ChoiceDisplay"
        >
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
        @clickDay="onClickDay"
        @clickEvent="onClickEvent"
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
  import axios from 'axios';
  import Bus from '../components/bus.js';

  //document.write(parseISOLocal('2015-11-24T19:40:00'));
  export default {
    created(){
      Bus.$on('tabChange',this.tabHandler);
    },
    beforeDestroy () {
      Bus.$off('tabChange', this.tabHandler)
    },
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
            startDate: '2018-1-22',
            endDate: '2018-1-22',
          },
        ]
      }
    },
    computed: {

    },
    components: {
      CalendarView
    },
    methods: {
      onClickDay(d) {
        console.log(`You clicked: ${d.toLocaleDateString()}`);//To day list
      },
      onClickEvent(e) {
        console.log(`You clicked: ${e.title}`);//To event
        console.log(`You clicked: ${e.startDate}`);//To event
      },
      tabHandler(label){
        if(label == 'Calendar')
        {
          this.updateData();
        }
      },
      updateData(){
        let self = this;
        self.events.splice(0);
        var req = self.$store.state.host + self.$store.state.net.NETREQ_calendarMonth;
        axios.post(req, {
          email:self.$store.state.email
        })
          .then(function (response) {
            console.log(response.data);
            console.log("code:"+response.data.code+"|msg:"+response.data.msg);
            if(response.data.code!='200')
            {
              self.showError(response.data.msg);
            }else {
              self.events.splice(0);
              for(let i in response.data.list){
                for(var task in response.data.list[i])
                {
                  var event = {
                      id : 'e'+task,
                      title : task,
                      taskId: response.data.list[i][task],
                      startDate: i,
                  }
                  self.events.push(event);
                }
              }
//              //成功获取
//              for(let i in response.data.list)
//              {
//                var list = {};
//                list.id = 'e'+ i;
//                list.title = response.data.list[i]._id;
//                list.startDate = response.data.list[i]._id;
//                list.endDate = response.data.list[i]._id;
//                self.events.push(list);
//              }
//              console.log(self.events);
              //self.$forceUpdate();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      showError(msg){
        this.$ons.notification.alert(msg,{title:'Warning'});
      },
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
    font-size:0.7em;
  }
  .ChoiceDisplay{
    width: 90%;
  }
  .calendar-view.period-year.weeks.week{
    min-height: 4em;
  }




</style>
