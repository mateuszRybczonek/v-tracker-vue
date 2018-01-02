import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import WelcomePage from '../components/welcome/welcome.vue'
import DashboardPage from '../pages/dashboard.vue'
import DashboardIndex from '../components/dashboard/index.vue'
import SignupPage from '../pages/auth/signup.vue'
import SigninPage from '../pages/auth/signin.vue'
import VesselsPage from '../pages/vessels.vue'
import ReportsPage from '../pages/reports.vue'
import NewVessel from '../pages/new-vessel.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  {
    path: '/dashboard',
    component: DashboardPage,
    children: [
      { path: '', component: DashboardIndex },
      { path: 'vessels', component: VesselsPage },
      { path: 'reports', component: ReportsPage },
      { path: 'vessels/new', component: NewVessel }
    ],
    beforeEnter (to, from, next) { // authentication guard
      if (store.state.auth.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  }
]

export default new VueRouter({mode: 'history', routes})
