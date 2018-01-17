<template>
    <v-ons-page>
      <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
      <div class="time-container">
        <div class="time-label">
          <div class="time-label-desc">
            <p style="margin-left: 10%">Hours</p>
            <p>Minutes</p>
            <p style="margin-right: 10%">Seconds</p>
          </div>
          <div class="countdownHolder">
              <span class="countHours">
                <span class="position">
                  <span class="digit static" style="top: 0px; opacity: 1;">{{hour[0]}}</span>
                </span>
                <span class="position">
                  <span class="digit static" style="top: 0px; opacity: 1;">{{hour[1]}}</span>
                </span>
              </span>

            <span class="countDiv countDiv1"></span>

            <span class="countMinutes">
              <span class="position">
                <span class="digit static" style="top: 0px; opacity: 1;">{{minutes[0]}}</span>
              </span>
              <span class="position">
                <span class="digit static" style="top: 0px; opacity: 1;">{{minutes[1]}}</span>
              </span>
            </span>
            <span class="countDiv countDiv2"></span>

            <span class="countSeconds">
              <span class="position">
                <span class="digit static" style="top: 0px; opacity: 1;">{{seconds[0]}}</span>
              </span>
              <span class="position">
                <span class="digit static" style="top: 0px; opacity: 1;">{{seconds[1]}}</span>
              </span>
            </span>
          </div>

        </div>

        <div class="button-group">
        <transition name="fade" mode="out-in">
          <button v-if="isPause"
                  v-on:click='continueTimer' v-bind:disabled="dis_pause" class="button pause">Continue</button>
          <button v-else
                  v-on:click='pauseTimer' v-bind:disabled="dis_pause" class="button pause">Pause</button>
        </transition>

        <button v-on:click='startTimer' v-bind:disabled="dis_start" class="button start">Start</button>
        <button v-on:click='stopTimer'  v-bind:disabled="dis_stop" class="button stop">Stop</button>
        </div>

        <v-ons-alert-dialog modifier="rowfooter"
                            :visible.sync="alertDialog1Visible"
        >
          <span slot="title">End Action</span>

          <div class="center">
            <textarea v-model="remark" class="textarea" rows="3" placeholder="Remark Write Something about this process."></textarea>
          </div>

          <!--Book-->
          <v-ons-list-item v-if = "ifDisplayBook">
              Read Page: {{ readPage }}
            <v-ons-row>
              <v-ons-col>
                <v-ons-range v-model="readPage" style="width: 80%;"
                             v-bind:min="curPage" v-bind:max="maxPage" ></v-ons-range>
              </v-ons-col>
            </v-ons-row>
          </v-ons-list-item>

          <template slot="footer">
            <div class="alert-dialog-button" @click="cancelEnd">Cancel</div>
            <div class="alert-dialog-button" @click="endTimeAction">Ok</div>
          </template>
        </v-ons-alert-dialog>

      </div>
    </v-ons-page>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
      data(){
        return{
          alertDialog1Visible: false,
          remark:'',
          states:'idle',
          readPage:1,
          curPage:'',
          maxPage:'',
          dis_start:false,
          dis_pause:true,
          dis_stop:true,
          isPause:false,
          timer: 0,
          si: '',
          hour: '00',
          minutes: '00',
          seconds: '00',
          toolbarInfo: {
            backLabel: 'Panel',
            title: 'Record'
          },
        }
      },
      computed:{
        ifExtendsData:function () {
          if(this.$store.state.extends_data!=null)
          {
            if(this.$store.state.extends_data[0]!=null){
              return true;
            }else {
              return false;
            }
          }

        },
        ifDisplayBook:function () {
          if(this.$store.state.extends_data!=null)
          {
            if(this.$store.state.extends_data[0]!=null)
            {
              for(var data of this.$store.state.extends_data)
              {
                if(data.hasOwnProperty('book'))
                {
                  this.readPage = data.book.curPage;
                  this.curPage = data.book.curPage;
                  this.maxPage = data.book.totalPage;
                  return true;
                }
              }
            }
          }
          return false;
        }
      },
      methods: {
        startTimer(){
          //Post to server.
          let self = this;
          var req = self.$store.state.host + '/app/createAction';
          axios.post(req, {
            task_id:        self.$store.state.task_id,
            total_seconds:  1,
            startTime:      moment().format(),
            endTime:        moment().format(),
            state:          'Start',
            remark:          '',
          })
            .then(function (response) {
              console.log(response);
              console.log(response.data.code);
              console.log(response.data.msg);
              if(response.data.code!='200')
              {
                self.showError(response.data.msg);
              }else {
                //StartTimer.
                self.timerStart();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        timerStart(){
          this.dis_start = true;
          this.dis_pause = false;
          this.dis_stop = false;
          console.log("Start");
          let self = this;
          self.timer = 0;
          self.seconds ='00';
          this.si = setInterval(function () {
            self.timer++;
            let d, h, m, s;
            s = Math.floor( self.timer );
            m = Math.floor( s / 60 );
            h = Math.floor( m / 60 );
            self.seconds = self.padNumber(s % 60);
            self.minutes = self.padNumber(m % 60);
            self.hour = self.padNumber(h % 24);
            //Every x seconds update the actions.
            //Send Post update
          }, 1000);

          //Update Action on 6s
          this.updateAction = setInterval(function () {
            var req = self.$store.state.host + '/app/updateAction';
            axios.post(req, {
              total_seconds:  self.timer,
              endTime:        moment().format(),
              state:          'updating',
              remark:         '',
            })
          },10000);

        },
        stopTimer(){
          this.alertDialog1Visible =true;
          //Send Post Stop
          console.log("Stop");
          let self = this;
          clearInterval(self.si);
          clearInterval(self.updateAction);
        },
        pauseTimer(){
          //update server action
          this.isPause=true;
          console.log("pause");
          let self = this;
          clearInterval(self.si);
        },
        cancelEnd(){
          this.alertDialog1Visible = false;
          let self = this;
          self.si = setInterval(function () {
            self.timer++;
            let h, m, s;
            s = Math.floor( self.timer );
            m = Math.floor( s / 60 );
            h = Math.floor( m / 60 );
            self.seconds = self.padNumber(s % 60);
            self.minutes = self.padNumber(m % 60);
            self.hour = self.padNumber(h % 24);
          }, 1000);

          self.updateAction = setInterval(function () {
            var req = self.$store.state.host + '/app/updateAction';
            axios.post(req, {
              total_seconds:  self.timer,
              endTime:        moment().format(),
              state:          'updating',
              remark:         '',
            })
          },10000);
        },
        endTimeAction(){
          this.dis_pause = true;
          this.dis_stop =true;
          this.dis_start = false;
          if(this.ifExtendsData)
          {
            for(var data of this.$store.state.extends_data)
            {
              if(data.hasOwnProperty('book'))
              {
                data.book.curPage = this.readPage;
              }
            }
          }
          let self = this;
          self.alertDialog1Visible = false;
          //Send End First.
          var req = self.$store.state.host + '/app/updateAction';
          axios.post(req, {
            task_id:        self.$store.state.task_id,
            total_seconds:  self.timer,
            endTime:        moment().format(),
            state:          'End',
            remark:         self.remark,
            extends_data:   self.$store.state.extends_data
          })
            .then(function (response) {
              console.log(response);
              console.log(response.data.code);
              console.log(response.data.msg);
              self.remark = '';
            })
            .catch(function (error) {
              console.log(error);
            });
          clearInterval(self.si);
          clearInterval(self.updateAction);
        },
        continueTimer(){
          this.isPause=false;
          let self = this;
          this.si = setInterval(function () {
            self.timer++;
            let h, m, s;
            s = Math.floor( self.timer );
            m = Math.floor( s / 60 );
            h = Math.floor( m / 60 );
            self.seconds = self.padNumber(s % 60);
            self.minutes = self.padNumber(m % 60);
            self.hour = self.padNumber(h % 24);
          }, 1000);
        },
        padNumber:function( n ) {
          return n < 10 ? '0' + String( n ) : String(n);
        },
        showError(msg){
          this.$ons.notification.alert(msg,{title:'Warning'});
        },
      }
    }
</script>

<style scoped>
  .time-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items:center;
    justify-content:center;
  }
  .time-label{
    margin-bottom: 5%;
  }
  .time-label-desc{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }

  .countdownHolder{
    width: 450px;
    margin: 0 auto;
    font: 42px/1.5 'Open Sans Condensed',sans-serif;
    text-align: center;
    letter-spacing: -3px;
  }
  .countDiv {
    display: inline-block;
    width: 16px;
    height: 1.6em;
    position: relative;
  }
  .countDiv:before, .countDiv:after {
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #444;
    border-radius: 50%;
    left: 50%;
    margin-left: -3px;
    top: 0.5em;
    box-shadow: 1px 1px 1px rgba(4, 4, 4, 0.5);
    content: '';
  }
  .countDiv:after {
    top: 0.9em;
  }
  .position {
    display: inline-block;
    height: 1.6em;
    overflow: hidden;
    position: relative;
    width: 1.05em;
  }
  .digit.static {
    box-shadow: 1px 1px 1px rgba(4, 4, 4, 0.35);
    background-image: linear-gradient(bottom, #3A3A3A 50%, #444444 50%);
    background-image: -o-linear-gradient(bottom, #3A3A3A 50%, #444444 50%);
    background-image: -moz-linear-gradient(bottom, #3A3A3A 50%, #444444 50%);
    background-image: -webkit-linear-gradient(bottom, #3A3A3A 50%, #444444 50%);
    background-image: -ms-linear-gradient(bottom, #3A3A3A 50%, #444444 50%);
    background-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(0.5, #3A3A3A),
      color-stop(0.5, #444444)
    );
  }
  .digit {
    position: absolute;
    display: block;
    width: 1em;
    background-color: #444;
    border-radius: 0.2em;
    text-align: center;
    color: #fff;
    letter-spacing: -1px;
  }

  /*------------------------*/
  .button-group{
    margin-top:5%;
  }

  .button {
    display: inline-block;
    position: relative;
    margin: 5px;
    padding: 0 20px;
    text-align: center;
    text-decoration: none;
    font: bold 20px/40px Arial, sans-serif;

    text-shadow: 1px 1px 1px rgba(255,255,255, .22);

    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;

    -webkit-box-shadow: 1px 1px 1px rgba(0,0,0, .29), inset 1px 1px 1px rgba(255,255,255, .44);
    -moz-box-shadow: 1px 1px 1px rgba(0,0,0, .29), inset 1px 1px 1px rgba(255,255,255, .44);
    box-shadow: 1px 1px 1px rgba(0,0,0, .29), inset 1px 1px 1px rgba(255,255,255, .44);

    -webkit-transition: all 0.15s ease;
    -moz-transition: all 0.15s ease;
    -o-transition: all 0.15s ease;
    -ms-transition: all 0.15s ease;
    transition: all 0.15s ease;
  }

  .button:hover {
    -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,.29), inset 0px 0px 2px rgba(0,0,0, .5);
    -moz-box-shadow: 1px 1px 1px rgba(0,0,0,.29), inset 0px 0px 2px rgba(0,0,0, .5);
    box-shadow: 1px 1px 1px rgba(0,0,0,.29), inset 0px 0px 2px rgba(0,0,0, .5);
  }
  .button:active {
    -webkit-box-shadow: inset 0px 0px 3px rgba(0,0,0, .8);
    -moz-box-shadow: inset 0px 0px 3px rgba(0,0,0, .8);
    box-shadow: inset 0px 0px 3px rgba(0,0,0, .8);
  }

  .start {
    color: #3e5706;
    background: #a5cd4e;
  }

  .stop {
    color: #dededc;
    background: #e34f37;
  }

  .pause {
    color: #515151;
    background: #d3d3d3;
  }

</style>
