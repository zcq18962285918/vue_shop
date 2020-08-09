import axios from 'axios/index'
import nprogress from 'nprogress'

axios.defaults.baseURL = 'http://localhost:8080/'
/**
 * 通过axios请求拦截器添加token,来保证有获取数据的权限 Authorization
 */
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('username')
  // 这里使用了nprogress(头上那个绿色的进度条)，请求时打开
  nprogress.start()
  return config
})
axios.interceptors.response.use(value => {
  // 这里使用了nprogress，响应时关闭
  nprogress.done()
  return value
})

async function Get(url, data = {}) {
  const response = await axios.get(url, data)

  if (response.status !== 200) {
    throw new Error('这个是异常')
  }
  return (response).data
}

async function Post(url, data = {}) {
  return (await axios.post(url, data)).data
}

async function Put(url, data = {}) {
  return (await axios.post(url, data)).data
}

async function Delete(url, data = {}) {
  return (await axios.post(url, data)).data
}

export default {
  Get,
  Post,
  Put,
  Delete
}

