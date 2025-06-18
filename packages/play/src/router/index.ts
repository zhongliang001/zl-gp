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
      path: '/icon',
      name: 'icon',
      component: () => import('../pages/IconDemo.vue')
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
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('../pages/CardDemo.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../pages/MenuDemo.vue')
    },
    {
      path: '/fileInput',
      name: 'fileInput',
      component: () => import('../pages/FileInputDemo.vue')
    },
    {
      path: '/datePicker',
      name: 'datePicker',
      component: () => import('../pages/DatePickerDemo.vue')
    },
    {
      path: '/switch',
      name: 'switch',
      component: () => import('../pages/SwitchDemo.vue')
    },
    {
      path: '/radio',
      name: 'radio',
      component: () => import('../pages/RadioDemo.vue')
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('../pages/TransferDemo.vue')
    }
  ]
})

export default router
