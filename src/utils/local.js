const KEY = 'hm-qd-toutiao-pc'

const local = {
  setLocal (user) {
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getLocal () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  delLocal () {
    window.sessionStorage.removeItem(KEY)
  }
}
export default local
