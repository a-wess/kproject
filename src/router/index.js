import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/tax-select',
      name: 'tax-select',
      component: () => import('@/views/tax/SecondStepView.vue')
    },
    {
      path: '/tax-success',
      name: 'tax-success',
      component: () => import('@/views/tax/ThirdStepView.vue')
    }
  ]
})

export default router
