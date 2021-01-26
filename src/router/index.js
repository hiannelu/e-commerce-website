import Vue from 'vue'
import VueRouter from 'vue-router'
//import Cart from '@/components/Cart.vue'
import Dashboard from '@/components/Dashboard.vue'
import Signin from '@/components/pages/Signin.vue'
import Admin from '@/components/pages/Admin.vue'
import User from '@/components/pages/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/admin',
    component: Dashboard,
    children: [
      {
        path: 'products',
        component: Admin,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/user',
    component: Dashboard,
    children: [
      {
        path: 'products',
        component: User,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
