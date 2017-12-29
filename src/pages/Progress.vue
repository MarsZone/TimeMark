<template>
    <v-ons-page>
      <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
      <div class="time-container">

        <p>{{hour}}:{{minutes}}:{{seconds}}</p>

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
      </div>
    </v-ons-page>
</template>

<script>
    export default {
      data(){
        return{
          states:'idle',
          dis_start:false,
          dis_pause:true,
          dis_stop:true,
          isPause:false,
          timer: 0,
          si: '',
          hour: '00',
          minutes: '00',
          seconds: '00',
        }
      },
      methods: {
        startTimer(){
          this.dis_start = true;
          this.dis_pause = false;
          this.dis_stop = false;
          console.log("Start");
          let self = this;
          self.timer = 0;
          this.si = setInterval(function () {
            self.timer++;
            let d, h, m, s;
            s = Math.floor( self.timer );
            m = Math.floor( s / 60 );
            h = Math.floor( m / 60 );
            self.seconds = self.padNumber(s % 60);
            self.minutes = self.padNumber(m % 60);
            self.hour = self.padNumber(h % 24);
          }, 1000);
        },
        stopTimer(){
          console.log("Stop");
          this.dis_pause = true;
          this.dis_stop =true;
          this.dis_start = false;
          let self = this;
          clearInterval(self.si);
        },
        pauseTimer(){
          this.isPause=true;
          console.log("pause");
          let self = this;
          clearInterval(self.si);
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
          return n < 10 ? '0' + String( n ) : n;
        },
      }
    }
</script>

<style scoped>
  .time-container{
    display: flex;
    min-height: 100%;
    flex-flow: row wrap;
    justify-content:center;
  }
  .button-group{
    align-self: flex-end;
  }

  .button {
    display: inline-block;
    position: relative;
    margin: 10px;
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
