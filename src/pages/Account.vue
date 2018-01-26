<template>
  <v-ons-page>
    <div class="Account">
      <img style="width: 68px;height: 68px" class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
      <p>{{this.$store.state.name}}</p>
      <v-ons-button v-show ="ifSignIn"
                    @click="login()"
                    class="my-button button button--outline " >Sign in</v-ons-button>
      <v-ons-button v-show ="ifRegister"
                    @click="register()"
                    class="my-button button button--outline " >Register</v-ons-button>
      <v-ons-button v-show ="ifSignOut"
                    @click = "logout()"
                    class="my-button button button--outline " >Sign out</v-ons-button>

      <v-ons-button @click = "Community()"
                    class="my-button button button--outline " >Community</v-ons-button>

      <v-ons-button v-bind:disabled="eload"
                    v-show ="ifSignOut"
                    @click = "loadEtime()"
                    class="my-button button button--outline " >
        <label v-if="!eload">Load Etime</label>
        <v-ons-icon v-if="eload" icon="ion-load-c" spin size="26px"></v-ons-icon>
      </v-ons-button>

      <v-ons-button v-show ="ifSignOut"
                    @click = "alertDialog1Visible=true"
                    class="my-button button button--outline " >Change Bonus</v-ons-button>

      <v-ons-alert-dialog modifier="rowfooter"
                          :visible.sync="alertDialog1Visible"
      >
        <span slot="title">Input bonus</span>

        <div class="center">
          <v-ons-input id="bonus-input" v-model="modifyBonus" type="number" placeholder="Unit minutes" float></v-ons-input>
        </div>

        <template slot="footer">
          <div class="alert-dialog-button" @click="changeBonus(false)">Reduce</div>
          <div class="alert-dialog-button" @click="changeBonus(true)">Add</div>
        </template>
      </v-ons-alert-dialog>

      <label v-show ="ifSignOut" style="text-align: center">
        Etime:    {{eHour}}h {{eMin}}m <br>
        BonusTime:{{(bonus/60/60).toFixed(1)}}h {{(bonus/60).toFixed(1)}}m
      </label>

    </div>
  </v-ons-page>
</template>

<script>
  import login from '../components/account/login.vue';
//  import community from '../components/account/Community.vue';
  import register from '../components/account/register.vue';
  import axios from 'axios';
  import Bus from '../components/bus.js';

  export default {
    data() {
      return {
        modifyBonus:0,
        eload:false,
        eHour:0,
        eMin:0,
        etime:0,
        bonus:0,
        alertDialog1Visible: false,
      }
    },
    created(){
      Bus.$on('tabChange',this.tabHandler);
    },
    beforeDestroy () {
      Bus.$off('tabChange', this.tabHandler)
    },
    computed:{
      ifSignIn:function () {
        return !this.$store.state.login;
      },
      ifRegister:function () {
        return !this.$store.state.login;
      },
      ifSignOut:function () {
        return this.$store.state.login;
      }
    },
    methods: {
      tabHandler:function(label){
        if(label == 'Me')
        {
          this.updateData();
        }
      },
      showError:function(msg){
        this.$ons.notification.alert(msg,{title:'Warning'});
      },
      changeBonus:function(ifadd){
        if(this.modifyBonus<0)
        {
          this.modifyBonus =0;
        }
        let self = this;
        var req = this.$store.state.host + self.$store.state.net.NETREQ_changeBonus;
        axios.post(req, {
          ifadd:ifadd,
          modifyBonus:self.modifyBonus,
        })
          .then(function (response) {
            console.log("xxxxx");
            console.log("code:"+response.data.code+"|msg:"+response.data.msg);
            if(response.data.code!='200')
            {
              self.showError(response.data.msg);
            }else {
              self.bonus = response.data.bonus;
            }
          })
          .catch(function (error) {
            self.showError(error.toString());
          });

        this.alertDialog1Visible=false;
      },
      loadEtime:function(){
        let self = this;
        self.eload=true;
        var req = this.$store.state.host + self.$store.state.net.NETREQ_getEtime;
        axios.post(req, {
           some:'',
        })
          .then(function (response) {
            console.log("xxxxx");
            console.log("code:"+response.data.code+"|msg:"+response.data.msg);
            if(response.data.code!='200')
            {
              self.eload=false;
              self.showError(response.data.msg);
            }else {
              setTimeout(() => {
                self.eload=false;
                self.etime = response.data.etime;
                self.bonus = response.data.bonus;
                self.eMin  = (self.etime/60).toFixed(1);
                self.eHour = (self.eMin/60).toFixed(1);
              }, 1000)
            }
          })
          .catch(function (error) {
            self.eload=false;
            self.showError(error.toString());
          });
      },
      updateData:function(){
        let self = this;
        var req = this.$store.state.host + self.$store.state.net.NETREQ_cache;
        axios.get(req)
          .then(function (response) {
            console.log("xxxxx");
            console.log("code:"+response.data.code+"|msg:"+response.data.msg);
            if(response.data.code!='200')
            {
              //self.showError(response.data.msg);
              self.$store.state.name  ='Who are you?';
              self.$store.state.login =false;
            }else {
              self.$store.state.name  =response.data.name;
              self.$store.state.login =true;
            }
          })
          .catch(function (error) {
            self.showError(error);
          });
      },
      Community:function(){
        this.$store.commit('navigator/options', {
          // Sets animations
          animation: 'slide-ios',
          // Resets default options
          callback: () => this.$store.commit('navigator/options', {})
        });
        this.$store.commit('navigator/push', {
          extends: community,
          data() {
            return {
              label : 'Community'
            }
          }
        });
      },
      login:function() {
        this.$store.commit('navigator/options', {
          // Sets animations
          animation: 'lift-ios',
          // Resets default options
          callback: () => this.$store.commit('navigator/options', {})
        });
        this.$store.commit('navigator/push', {
          extends: login,
          data() {
            return {
             label : 'Sign-in'
            }
          }
        });
      },
      register:function() {
        this.$store.commit('navigator/options', {
          // Sets animations
          animation: 'lift-ios',
          // Resets default options
          callback: () => this.$store.commit('navigator/options', {})
        });
        this.$store.commit('navigator/push', {
          extends: register,
          data() {
            return {
              label : 'Register'
            }
          }
        });
      },
      logout:function(){
        var req = this.$store.state.host + this.$store.state.net.NETREQ_logout;
        //Send to Server.
        axios.get(req)
          .then(function (response) {
            console.log("xxxxx");
          })
          .catch(function (error) {
            console.log(error);
          });
        //clear data
        this.$store.state.name  ='No one';
        this.$store.state.login =false;
      }
    }
  };
</script>

<style scoped>
  .Account {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
  .my-button{
    width: 45%;
    margin: 10px auto;
    text-align: center;
  }

</style>

