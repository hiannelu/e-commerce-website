import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
 
// import style
import 'swiper/swiper-bundle.css'

Vue.use(BootstrapVue)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueAxios, axios)


// router.beforeEach((to) => {
//     console.log(to.meta.requiresAuth)
//   if (to.meta.requiresAuth) {
//     const api = 'https://vue-course-api.hexschool.io/api/user/check';

//     axios.post(api).then(response => {
//       console.log(response)
//     })  
//   }
// })


