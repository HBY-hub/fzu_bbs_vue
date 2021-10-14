import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () =>import('../views/Index')
  },
  {
    path: '/messages',
    name: 'Messages',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Messages.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/My')
  },
  {
    path: '/addPassage',
    name: 'addPassage',
    component:()=>import('../views/AddPassage')
  },
  {
    path: '/chat',
    name: 'chat',
    component:()=>import('../views/Chat')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
