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

      <v-ons-button @click = "loadEtime()"
                    class="my-button button button--outline " >
        <label v-if="!eload">Load Etime</label>
        <v-ons-icon v-if="eload" icon="ion-load-c" spin size="26px"></v-ons-icon>
      </v-ons-button>
      <label v-if="etime!=0">Etime:{{eHour}}h{{eMin}}m{{eSecond}}s</label>
    </div>
  </v-ons-page>
</template>

<script>
  import login from '../components/account/login.vue';
  import register from '../components/account/register.vue';
  import axios from 'axios';
  import Bus from '../components/bus.js';

  export default {
    data() {
      return {
        eload:false,
        eHour:0,
        eMin:0,
        eSecond:0,
        etime:0,
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
      tabHandler(label){
        if(label == 'Me')
        {
          this.updateData();
        }
      },
      showError(msg){
        this.$ons.notification.alert(msg,{title:'Warning'});
      },
      loadEtime(){
        this.eload=true;
        let self = this;
        var req = this.$store.state.host + '/app/getEtime';
        axios.post(req, {
           some:'',
        })
          .then(function (response) {
            console.log(response);
            console.log("code:"+response.data.code+"|msg:"+response.data.msg);
            if(response.data.code!='200')
            {
              self.showError(response.data.msg);
            }else {
              
            }
            self.eload=false;
          })
          .catch(function (error) {
            self.eload=false;
            self.showError(error.toString());
          });
      },
      updateData(){
        let self = this;
        var req = this.$store.state.host + '/app/cache';
        axios.get(req)
          .then(function (response) {
            console.log(response);
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
      login() {
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
      register() {
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
      logout(){
        var req = this.$store.state.host + '/logout';
        //Send to Server.
        axios.get(req)
          .then(function (response) {
            console.log(response);
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
