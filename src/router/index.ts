import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import { ABLY_ACCESS_TOKEN } from '@/constants';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/reset',
    name: 'Reset',
    redirect: '/reset/auth/request',
    component: () => import('@/views/reset/Main.vue'),
    children: [
      {
        path: '/reset/auth/request',
        component: () => import('@/views/reset/components/AuthRequest.vue'),
      },
      {
        path: '/reset/auth/validate',
        component: () => import('@/views/reset/components/AuthValidate.vue'),
      },
      {
        path: '/reset/password',
        component: () => import('@/views/reset/components/PasswordReset.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem(ABLY_ACCESS_TOKEN);
  // const requiredAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (to.path === '/') {
    if (!isLoggedIn) next('/login');
    else next();
  } else {
    next();
  }
});

export default router;
