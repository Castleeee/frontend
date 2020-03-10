import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const ADD_COUNT = 'ADD_COUNT' // 用常量代替事件类型，使得代码更清晰
const REMOVE_COUNT = 'REMOVE_COUNT'

export default new Vuex.Store({
  state: {
    islogin: sessionStorage.getItem('isLogin'),
    userid: window.sessionStorage.getItem('')
  },

  mutations: {
    // 写法与getters相类似
    // 组件想要对于vuex 中的数据进行的处理
    // 组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
    // 内部操作必须在此刻完成(同步)
    [ADD_COUNT] (state, token, id, a) { // 第一个参数为 state 用于变更状态 登录
      sessionStorage.setItem('token', token)
      console.log(id, a)
      sessionStorage.setItem('userid', id)
      sessionStorage.setItem('isLogin', true)// todo token存在session中
    },
    [REMOVE_COUNT] () { // 退出登录
      sessionStorage.removeItem('token')
      sessionStorage.setItem('isLogin', false)// todo 清除token
      sessionStorage.removeItem('id')
    }

  },
  actions: {

  }
})
