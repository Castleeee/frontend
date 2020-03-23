import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // islogin: sessionStorage.getItem('isLogin'),
    // username: sessionStorage.getItem('username')
  },

  mutations: {
    // 写法与getters相类似
    // 组件想要对于vuex 中的数据进行的处理
    // 组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
    // 内部操作必须在此刻完成(同步)
    // ADD_COUNT: (state, obj) => { // 第一个参数为 state 用于变更状态 登录
    //   console.log('username:', obj.username, 'access:', obj.access, 'refresh:', obj.refresh)
    //   localStorage.setItem('username', obj.username)
    //   localStorage.setItem('access', obj.access)
    //   localStorage.setItem('refresh', obj.refresh)
    //   localStorage.setItem('isLogin', true)//
    // },
    // REMOVE_COUNT: (state) => { // 退出登录
    //   localStorage.removeItem('access')
    //   localStorage.removeItem('refresh')
    //   localStorage.setItem('isLogin', false)//
    //   localStorage.removeItem('username')
    // }// todo 我吐了

  },
  actions: {

  }
})
