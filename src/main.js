import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/style/index.less'
import plugin from '@/components'
import axios from '@/api'
Vue.use(plugin)

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
