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

Vue.use(Vuex);
Vue.use(Datetime);
Vue.use(VueOnsen);
Vue.config.productionTip = false;
// Register components globally
// Object.values(OnsenComponents).forEach(component => Vue.component(component.name, component)); // For ESM
Vue.component('custom-toolbar', CustomToolbar); // Common toolbar

/* eslint-disable no-new */
new Vue({
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
    if (window.location.search.match(/iphonex/i)) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
    }
  }
  //template: '<App/>',
  //components: { App } //1.0 2.0->render : h => h(App)
}).$mount('#app')
