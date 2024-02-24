import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores'
import Login from '@/views/pages/Login.vue'
import Home from '@/views/pages/Home.vue'

import Brands from '@/views/pages/brands/Brands.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Home,
      meta: { title: 'Home', requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: 'login', guest: true}
    },
    {
      path: '/brands',
      name: 'brand-list',
      component: Brands,
      meta: { title: 'Brand', requiresAuth: true}
    },
  ]
})

const DEFAULT_TITLE = "404";
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  const auth = useAuth();
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(!auth.getAuthStatus){
      next({name:"login"});
    }else{
      next();
    }
  }else if(to.matched.some((record) => record.meta.guest)){
    if(auth.getAuthStatus){
      next({name:"dashboard"});
    }else{
      next();
    }
  }else{
    next();
  }
})

export default router;
