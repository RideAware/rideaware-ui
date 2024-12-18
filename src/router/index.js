import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/UserLogin.vue';
import LoggedinPage from '@/components/LoggedinPage.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/logged-in', component: LoggedinPage}
  //{ path: '/dashboard', component: () => import('../components/Dashboard.vue') }, // Placeholder for a dashboard page
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
