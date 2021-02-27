import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'swiper/swiper-bundle.css';

Vue.use(BootstrapVue)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.prototype.$api = 'http://localhost:3000';
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueAxios, axios)
