import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/globel.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/'
/**
 * 通过axios请求拦截器添加token,来保证有获取数据的权限 Authorization
 */
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('username')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

