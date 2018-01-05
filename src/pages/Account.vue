<template>
  <v-ons-page>
    <div class="Account">
      <img style="width: 68px;height: 68px" class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
      <p>{{this.$store.state.name}}</p>
      <v-ons-button v-show ="ifSignIn"
                    @click="login()"
                    class="my-button button button--outline " >Sign in</v-ons-button>
      <v-ons-button v-show ="ifRegister"
                    class="my-button button button--outline " >Register</v-ons-button>
      <v-ons-button v-show ="ifSignOut"
                    @click = "logout()"
                    class="my-button button button--outline " >Sign out</v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
  import login from '../components/account/login.vue';
  import axios from 'axios';
  export default {
    data() {
      return {
      }
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
      logout(){
        //Send to Server.
        axios.get('http://localhost:3000/logout')
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
