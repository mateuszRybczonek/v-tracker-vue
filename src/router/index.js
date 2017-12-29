import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import WelcomePage from '../components/welcome/welcome.vue'
import DashboardPage from '../components/dashboard/dashboard.vue'
import SignupPage from '../components/auth/signup.vue'
import SigninPage from '../components/auth/signin.vue'
import VesselsPage from '../components/vessels/index.vue'
import ReportsPage from '../components/reports/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter (to, from, next) { // authentication guard
      if (store.state.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/vessels',
    component: VesselsPage,
    beforeEnter (to, from, next) { // authentication guard
      if (store.state.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/reports',
    component: ReportsPage,
    beforeEnter (to, from, next) { // authentication guard
      if (store.state.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  }
]

export default new VueRouter({mode: 'history', routes})
