import { createRouter, createWebHistory } from 'vue-router'
import store from '../../store/store'
import Home from '../views/HomeView.vue'
import Islem from '../views/IslemView.vue'
import Hukuk from '../views/HukukView.vue'
import Finans from '../views/FinansView.vue'
import Login from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true // Sadece oturum açmış kullanıcılara izin verir
    }
  },

  {
    path: '/first-approval',
    name: 'islem',
    component: Islem,
    meta: {
      requiresAuth: true // Sadece oturum açmış kullanıcılara izin verir
    }
  },
  
  {
    path: '/finance-approval',
    name: 'finance',
    component: Finans,
    meta: {
      requiresAuth: true // Sadece oturum açmış kullanıcılara izin verir
    }
  },
  
  {
    path: '/legal-approval',
    name: 'legal',
    component: Hukuk,
    meta: {
      requiresAuth: true // Sadece oturum açmış kullanıcılara izin verir
    }
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // Eğer sayfa oturum gerektiriyorsa
    if (store.state.loggedIn) {
      // Oturum açıldıysa geçişe izin ver
      next();
    } else {
      // Oturum açılmadıysa giriş sayfasına yönlendir
      next('/login');
    }
  } else {
    // Sayfa oturum gerektirmiyorsa geçişe izin ver
    next();
  }
});

export default router