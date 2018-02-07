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
      // banner: 'ca-app-pub-5136550274471376/3820744996',
      // banner: 'ca-app-pub-3940256099942544/6300978111',
      //document.addEventListener("backbutton", self.onBackKeyDown, false);
      let admobid = {};
      if( /(android)/i.test(navigator.userAgent) ) {
        admobid = { // for Android
          banner: 'ca-app-pub-5136550274471376/3820744996',
          interstitial: '',
          rewardvideo: '',
        };
      } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
          banner: 'ca-app-pub-5136550274471376/3820744996',
          interstitial: '',
          rewardvideo: '',
        };
      } else {
        admobid = { // for Windows Phone
          banner: 'ca-app-pub-5136550274471376/3820744996',
          interstitial: '',
          rewardvideo: '',
        };
      }
      //if (! AdMob) { alert( 'admob plugin not ready' );}

      AdMob.getAdSettings(function(info){
        console.log('adId: ' + info.adId + '\n' + 'adTrackingEnabled: ' + info.adTrackingEnabled);
      }, function(){
        console.log('failed to get user ad settings');
      });

      AdMob.setOptions({
        // adSize: 'SMART_BANNER',
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        // isTesting: true, // set to true, to receiving test ad for testing purpose
        bgColor: 'black', // color name, or '#RRGGBB'
        // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
        // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
      });

      // new events, with variable to differentiate: adNetwork, adType, adEvent
      $(document).on('onAdFailLoad', function(e){
        // when jquery used, it will hijack the event, so we have to get data from original event
        if(typeof e.originalEvent !== 'undefined') e = e.originalEvent;
        var data = e.detail || e.data || e;

        // alert('error: ' + data.error +
        //   ', reason: ' + data.reason +
        //   ', adNetwork:' + data.adNetwork +
        //   ', adType:' + data.adType +
        //   ', adEvent:' + data.adEvent); // adType: 'banner', 'interstitial', etc.

        console.log('error: ' + data.error +
          ', reason: ' + data.reason +
          ', adNetwork:' + data.adNetwork +
          ', adType:' + data.adType +
          ', adEvent:' + data.adEvent);
      });
      $(document).on('onAdLoaded', function(e){
        console.log("onAdLoaded");
      });
      $(document).on('onAdPresent', function(e){
        console.log("onAdPresent");
      });
      $(document).on('onAdLeaveApp', function(e){
        console.log("onAdLeaveApp");
      });
      $(document).on('onAdDismiss', function(e){
        console.log("onAdDismiss");
      });
      let adsCount = 0;
      let closeCount = 0;
      let bannerRemoved = false;
      if(AdMob) AdMob.createBanner({
        adId: admobid.banner,
        overlap: $('#overlap').is(':checked'),
        offsetTopBar: $('#offsetTopBar').is(':checked'),
        adSize: $('#adSize').val(),
        position: $('#adPosition').val(),
      });
      let AdMobInstance = AdMob;
      setInterval(() => {
        if(adsCount>10)
        {
          console.log("ReCreate Banner");
          closeCount=0;
          if(AdMobInstance) AdMobInstance.createBanner({
            adId: admobid.banner,
            overlap: $('#overlap').is(':checked'),
            offsetTopBar: $('#offsetTopBar').is(':checked'),
            adSize: $('#adSize').val(),
            position: $('#adPosition').val(),
          });
          adsCount=0;
          bannerRemoved=false;
        }
        if(closeCount >6)
        {
          console.log("Remove Banner");
          if(AdMobInstance){
            AdMobInstance.removeBanner();
          }
          bannerRemoved = true;
          closeCount=0;
        }
        adsCount = adsCount+1;
        if(!bannerRemoved)
        {
          closeCount =closeCount +1;
        }
        console.log("ADSCount:"+adsCount+"|closeCount:"+closeCount);
      }, 50000);
    });
  },
  methods:{
    initApp(){

    },
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
