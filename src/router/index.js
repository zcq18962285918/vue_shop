import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载，在babel.config.js里配置后改造import
const Login = () => import(/* webpackChunkName: "group-main" */ '../components/Login')
const Home = () => import(/* webpackChunkName: "group-main" */ '../components/Home')
const Welcome = () => import(/* webpackChunkName: "group-main" */ '../components/Welcome')
const Users = () => import(/* webpackChunkName: "group-user" */ '../components/user/Users')
const AddUser = () => import(/* webpackChunkName: "group-user" */ '../components/user/AddUser')
const Goods = () => import(/* webpackChunkName: "group-goods" */ '../components/goods/Goods')
const AddGoods = () => import(/* webpackChunkName: "group-goods" */ '../components/goods/AddGoods')
const Authority = () => import(/* webpackChunkName: "group-authority" */ '../components/authority/Authority')
const Roles = () => import(/* webpackChunkName: "group-authority" */ '../components/authority/Roles')

// import Login from '../components/Login'
// import Home from '../components/Home'
// import Welcome from '../components/Welcome'
// import Users from '../components/user/Users'
// import Goods from '../components/goods/Goods'
// import AddUser from '../components/user/AddUser'
// import Authority from '../components/authority/Authority'
// import Roles from '../components/authority/Roles'
// import AddGoods from '../components/goods/AddGoods'


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
      },
      {
        path: '/Authority', component: Authority
      },
      {
        path: '/roles', component: Roles
      },
      {
        path: '/addGoods', name: 'addGoods', component: AddGoods
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
 * router多次跳同同一路径报错解决办法
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
