// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from  'vuex'
//import App from './App'
import router from './router'
import store from './store'
// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui'; // This already imports 'onsenui'
import CustomToolbar from './partials/CustomToolbar.vue';
import AppNavigator from './AppNavigator.vue';
import Datetime from 'vue-datetime';

import ECharts from 'vue-echarts/components/ECharts'

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/theme/dark'

Vue.use(Vuex);
Vue.use(Datetime);
Vue.use(VueOnsen);
Vue.config.productionTip = false;
// Register components globally
// Object.values(OnsenComponents).forEach(component => Vue.component(component.name, component)); // For ESM
Vue.component('custom-toolbar', CustomToolbar); // Common toolbar

// register component to use
Vue.component('chart', ECharts);

/* eslint-disable no-new */
const app = new Vue({
  //el: '#app',
  router,
  store,
  //render: h => h(App),
  render: h => h(AppNavigator),
  beforeCreate() {
    //Vue.prototype.md = this.$ons.platform.isAndroid();
    Vue.prototype.md = null;
    // Set iPhoneX flag based on URL
    this.$ons.disableAutoStyling(); // Or any other method
    // this.$ons.enableDeviceBackButtonHandler();
    // this.$ons.setDefaultDeviceBackButtonListener(function(event) {
    //   this.$ons.notification.confirm('Do you want to close the app?') // Ask for confirmation
    //     .then(function(index) {
    //       if (index === 1) { // OK button
    //         this.navigator.app.exitApp(); // Close the app
    //       }
    //     });
    // });
    if (window.location.search.match(/iphonex/i)) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
    };
  },
  mounted(){
    var self = this;
    self.$ons.ready(function() {
      console.log("On ready");
      self.$ons.enableDeviceBackButtonHandler();
      // Set a new handler
      self.$ons.setDefaultDeviceBackButtonListener(function(event) {
        var stack = self.$store.state.navigator.stack;
        console.log("Stack:"+stack.length);
        if(stack.length > 1)
        {
          self.$store.commit('navigator/pop');
        }else {
          self.$ons.notification.confirm('Do you want to close the app?') // Ask for confirmation
            .then(function(index) {
              if (index === 1) { // OK button
                navigator.app.exitApp(); // Close the app
              }
            });
        }
      });
      //document.addEventListener("backbutton", self.onBackKeyDown, false);
    });
  },
  methods:{
    onBackKeyDown:function () {
      // var self = this;
      // var stack = self.$store.state.navigator.stack;
      // console.log("backbuttonStack:"+stack.length);
      // if(stack.length > 1)
      // {
      //   //self.$store.commit('navigator/pop');
      // }else {
      //   self.$ons.notification.confirm('Do you want to close the app?') // Ask for confirmation
      //     .then(function(index) {
      //       if (index === 1) { // OK button
      //         navigator.app.exitApp(); // Close the app
      //       }
      //     });
      // }
      //console.log("Click Back");
    },
    init:function() {
      this.status = true;
    }
  }
  //template: '<App/>',
  //components: { App } //1.0 2.0->render : h => h(App)
}).$mount('#app')
