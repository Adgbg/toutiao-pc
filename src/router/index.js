import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Cannot from '@/views/404'
import Aticles from '@/views/articles'
// 素材管理
import Material from '@/views/material'
import local from '@/utils/local'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    }, {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          component: Welcome
        },
        {
          path: '/article',
          component: Aticles
        },
        {
          path: '/material',
          component: Material
        }
      ]
    },
    {
      path: '*',
      component: Cannot
    }
  ]

})
router.beforeEach((to, from, next) => {
  const user = local.getLocal()
  // 如果地址不是login 并且user没有token
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router
