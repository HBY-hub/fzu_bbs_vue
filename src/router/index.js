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
    path: '/chat/:toId',
    name: 'chat',
    component:()=>import('../views/Chat'),
    meta:{needLogin:true}
  },
  {
    path: '/passage/:id',
    name: 'passage',
    component:()=>import('../views/Passage')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
import store from '../store'

router.beforeEach((to, from, next) => { //全局钩子函数
  to.matched.some((route) => {
    // to.matched.forEach((route) => {
    if (route.meta.needLogin) { //通过此操作可以判断哪些页面需要登录
      if (store.state.token) {
        next()
      } else {
        next({path:'/login'})
      }
    } else {
      next();
    }
  });

});
export default router
