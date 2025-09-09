import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: () => import('../components/Home.vue'),
    meta: { title: 'RideAware – Home' } 
  },
  { 
    path: '/login', 
    name: 'Login',
    component: () => import('../components/UserLogin.vue'),
    meta: { title: 'RideAware – Sign In' } 
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../components/UserSignup.vue'),
    meta: { title: 'RideAware – Sign Up' }
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isLoggedIn = !!(localStorage.getItem('user') || sessionStorage.getItem('user'))
    if (!isLoggedIn) {
      next({ name: 'Login' })
      return
    }
  }
  next()
})

router.afterEach((to) => {
  const defaultTitle = 'RideAware'
  document.title = to.meta.title || defaultTitle
})

export default router