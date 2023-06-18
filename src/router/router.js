import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Islem from '../views/IslemView.vue'
import Hukuk from '../views/HukukView.vue'
import Finans from '../views/FinansView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/first-approval',
    name: 'islem',
    component: Islem
  },
  
  {
    path: '/finance-approval',
    name: 'finance',
    component: Finans
  },
  
  {
    path: '/legal-approval',
    name: 'legal',
    component: Hukuk,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router