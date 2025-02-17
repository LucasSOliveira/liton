import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Books',
    component: () => import('@/modules/books/pages/Books.vue'),
    meta: {
      title: 'Books',
      auth: false
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/modules/cart/pages/Cart.vue'),
    meta: {
      title: 'Cart',
      auth: true
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/modules/orders/pages/Orders.vue'),
    meta: {
      title: 'Orders',
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/modules/auth/pages/Login.vue'),
    meta: {
      title: 'Login',
      auth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/modules/auth/pages/404.vue'),
    meta: {
      title: 'Not Found',
      auth: false
    }
  }
];