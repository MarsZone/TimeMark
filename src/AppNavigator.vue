<template>
  <v-ons-navigator swipeable swipe-target-width="50px"
                   :page-stack="pageStack"
                   :pop-page="storePop"
                   :options="options"
                   @deviceBackButton="$event.preventDefault()"
                   @postpush="showPopTip"
  ></v-ons-navigator>
</template>

<script>
  import AppSplitter from './AppSplitter.vue';

  export default {
    beforeCreate() {
      this.$store.commit('navigator/push', AppSplitter);
    },
    created() {
      try {
        document.body.removeChild(document.getElementById('appLoading'));
      } catch (e) {

      }
    },
    data() {
      return {
        shutUp: this.md
      }
    },
    mounted (){
//      document.addEventListener("backbutton", onBackKeyDown, false);
    },
    computed: {
      pageStack() {
        return this.$store.state.navigator.stack;
      },
      options() {
        return this.$store.state.navigator.options;
      }
    },
    methods: {
      onBackKeyDown(){
        //this.$store.commit('navigator/pop');
      },
      storePop() {
        this.$store.commit('navigator/pop');
      },
      showPopTip() {
        !this.shutUp && this.$ons.notification.toast({
          message: 'Demo Version Made by Mars.',
          buttonLabel: 'Tips',
          timeout: 1000
        }).then(i => this.shutUp = i === 0);
      }
    }
  };
</script>

<style>

</style>
