// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/globel.css'
// import axios from 'axios'
// import ZkTable from 'vue-table-with-tree-grid'
// import VueQuillEditor from 'vue-quill-editor'

// import nprogress from 'nprogress'
// 1. 导入echatrs
// import echatrs from 'echarts'

Vue.filter('dateFormat', function() {
  const date = new Date()

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = (date.getHours() + '').padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
})

axios.defaults.baseURL = 'http://localhost:8080/'
/**
 * 通过axios请求拦截器添加token,来保证有获取数据的权限 Authorization
 */
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('username')
  // 这里使用了nprogress(头上那个绿色的进度条)，请求时打开
  NProgress.start()
  return config
})
axios.interceptors.response.use(value => {
  // 这里使用了nprogress，响应时关闭
  NProgress.done()
  return value
})

Vue.prototype.$http = axios

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

