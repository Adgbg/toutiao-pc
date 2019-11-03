import Crumbs from '@/components/crumbs'
import myChannel from '@/components/my-channel'
export default {
  install (Vue) {
    Vue.component(Crumbs.name, Crumbs)
    Vue.component(myChannel.name, myChannel)
  }
}
