import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: 'button',
      children: [
        {
          path: '/button',
          name: 'button',

          component: () => import('../pages/ButtonDemo.vue')
        },
        {
          path: '/row',
          name: 'row',
          meta: {
            _default: true
          },
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
        },
        {
          path: '/tab',
          name: 'tab',
          component: () => import('../pages/TabDemo.vue')
        },
        {
          path: '/panel',
          name: 'panel',
          component: () => import('../pages/PanelDemo.vue')
        }
      ]
    }
  ]
})

export default router
