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
    }
  ]
})

export default router
