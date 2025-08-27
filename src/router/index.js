import { createRouter, createWebHistory } from 'vue-router';

// Lazy load components for better performance
const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: () => import('../components/Home.vue') 
  },
  { 
    path: '/login', 
    name: 'Login',
    component: () => import('../components/UserLogin.vue') 
  },
  { 
    path: '/logged-in', 
    name: 'LoggedIn',
    component: () => import('../components/LoggedinPage.vue'),
    // Optional: Add route guard to check if user is actually logged in
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Optional: Navigation guard example
router.beforeEach((to, from, next) => {
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    // Check if user is logged in (implement your auth logic)
    const isLoggedIn = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!isLoggedIn) {
      next('/login');
      return;
    }
  }
  next();
});

export default router;