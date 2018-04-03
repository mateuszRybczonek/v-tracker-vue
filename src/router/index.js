import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import HomePage from '../pages/HomePage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import SignupPage from '../pages/auth/SignupPage.vue'
import SigninPage from '../pages/auth/SigninPage.vue'
import VesselsPage from '../pages/VesselsPage.vue'
import NewVesselPage from '../pages/NewVesselPage.vue'
import EditVesselPage from '../pages/EditVesselPage.vue'
import VesselPage from '../pages/VesselPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  {
    path: '/dashboard',
    component: DashboardPage,
    children: [
      { path: '', component: VesselsPage },
      { path: 'vessels', component: VesselsPage },
      { path: 'vessels/new', component: NewVesselPage },
      { path: 'vessels/:id/edit', component: EditVesselPage },
      { path: 'vessels/:id', component: VesselPage }
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
