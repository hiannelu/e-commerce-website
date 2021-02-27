import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import Signin from '@/components/Signin.vue'
import Admin from '@/components/pages/Admin.vue'
import User from '@/components/pages/User.vue'
import Cart from '@/components/pages/Cart.vue'

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
        component: Admin
      }
    ]
  },
  {
    path: '/user',
    component: Dashboard,
    children: [
      {
        path: 'products',
        component: User
      },
      {
        path: 'cart',
        component: Cart
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
