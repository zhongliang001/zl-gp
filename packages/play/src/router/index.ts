import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/button',
      name: 'button',
      component: () => import('../pages/ButtonDemo.vue')
    },
    {
      path: '/row',
      name: 'row',
      component: () => import('../pages/RowDemo.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../pages/FormDemo.vue')
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('../pages/SelectDemo.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../pages/TableDemo.vue')
    }
  ]
})

export default router
