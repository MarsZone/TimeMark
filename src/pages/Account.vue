<template>
  <v-ons-page>
    <div class="Account">
      <img style="width: 68px;height: 68px" class="list-item__thumbnail" src="http://placekitten.com/g/40/40">
      <p>No one</p>
      <v-ons-button v-bind:disabled="able_sign_in"
                    @click="login()"
                    class="my-button button button--outline " >Sign in</v-ons-button>
      <v-ons-button v-bind:disabled="able_Register"
                    class="my-button button button--outline " >Register</v-ons-button>
      <v-ons-button v-bind:disabled="able_sign_out"
                    class="my-button button button--outline " >Sign out</v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
  import login from '../components/account/login.vue'
  export default {
    data() {
      return {
        able_sign_in: false,
        able_Register:false,
        able_sign_out:true,
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
