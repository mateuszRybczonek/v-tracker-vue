import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

function loadPage(page) {
  return () => import(/* webpackChunkName: "[request]" */ `../pages/${page}.vue`)
}

const routes = [
  { path: '/', component: loadPage('HomePage') },
  { path: '/signup', component: loadPage('auth/SignupPage') },
  { path: '/signin', component: loadPage('auth/SigninPage') },
  {
    path: '/dashboard',
    component: loadPage('MainMenuPage'),
    children: [
      { path: '', component: loadPage('VesselsPage') },
      { path: 'vessels', component: loadPage('VesselsPage') },
      { path: 'vessels/new', component: loadPage('NewVesselPage') },
      { path: 'vessels/:id/edit', component: loadPage('EditVesselPage') },
      { path: 'vessels/:id', component: loadPage('VesselPage') }
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
