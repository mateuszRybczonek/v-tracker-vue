import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import HomePage from '../pages/HomePage.vue'
import DashboardPage from '../pages/dashboard.vue'
import DashboardIndex from '../components/TheDashboard.vue'
import SignupPage from '../pages/auth/signup.vue'
import SigninPage from '../pages/auth/signin.vue'
import VesselsPage from '../pages/vessels.vue'
import NewVessel from '../pages/new-vessel.vue'
import EditVessel from '../pages/edit-vessel.vue'
import VesselDetails from '../pages/vessel-details.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  {
    path: '/dashboard',
    component: DashboardPage,
    children: [
      { path: '', component: DashboardIndex },
      { path: 'vessels', component: VesselsPage },
      { path: 'vessels/new', component: NewVessel },
      { path: 'vessels/:id/edit', component: EditVessel },
      { path: 'vessels/:id', component: VesselDetails }
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
