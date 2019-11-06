import Crumbs from '@/components/crumbs'
import myChannel from '@/components/my-channel'
import myImges from '@/components/my-imges'
export default {
  install (Vue) {
    Vue.component(Crumbs.name, Crumbs)
    Vue.component(myChannel.name, myChannel)
    Vue.component(myImges.name, myImges)
  }
}
