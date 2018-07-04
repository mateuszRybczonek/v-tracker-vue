import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

const HomePage = () => import('../pages/HomePage.vue')
const MainMenuPage = () => import('../pages/MainMenuPage.vue')
const SignupPage = () => import('../pages/auth/SignupPage.vue')
const SigninPage = () => import('../pages/auth/SigninPage.vue')
const VesselsPage =() => import('../pages/VesselsPage.vue')
const NewVesselPage =() => import('../pages/NewVesselPage.vue')
const EditVesselPage =() => import('../pages/EditVesselPage.vue')
const VesselPage =() => import('../pages/VesselPage.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  {
    path: '/dashboard',
    component: MainMenuPage,
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
