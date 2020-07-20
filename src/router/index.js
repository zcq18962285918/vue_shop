import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import Users from '../components/user/Users'
import Goods from '../components/goods/Goods'
import AddUser from '../components/user/AddUser'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome', component: Welcome
      },
      {
        path: '/users', component: Users
      },
      {
        path: '/goods', component: Goods
      },
      {
        path: '/addUser', component: AddUser
      }
    ]
  }
]

/**
 * 路径没有#
 * @type {VueRouter}
 */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * router多次跳同同一路径报错
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/**
 * router权限控制登录 beforeEach导航守卫
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const item = window.sessionStorage.getItem('username')
  if (!item) {
    return next('/login')
  }
  next()
})

export default router
