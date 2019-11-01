import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'
import Jsonbigint from 'json-bigint'
axios.defaults.transformResponse = [(data) => {
  try {
    return Jsonbigint.parse(data)
  } catch (e) {
    return data
  }
}]
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// if (local.getLocal()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getLocal().token}`
// }
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取token值
  const user = local.getLocal() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
axios.interceptors.response.use(res => res, err => {
  // 请求失败
  if (err.response.status === 401) {
    // 跳转登录页面  http://localhost:8080/#/login
    // window.location.href = 'http://localhost:8080/#/login'
    // window.location.hash = '#/login'
    // 建议使用 vue-router 来跳转 , push是router实例的函数
    return router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
