import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入iview
import './plugins/iview.js'
// 添加axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// 添加动效
import 'vue2-animate/dist/vue2-animate.min.css'

// 添加echarts
import echarts from 'echarts'

// 生产环境请注释mock语句
import './mock/index.js'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.prototype.$backip = 'http://127.0.0.1:8000' // 指明后端ip地址

router.beforeEach((to, from, next) => { // todo 鉴定如果没有登陆就跳转登录界面一直不成功
  Vue.prototype.$LoadingBar.start()
  var loginState = sessionStorage.getItem('isLogin')// 获取本地存储的登录状态
  console.log(loginState)
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (loginState) { // 根据登录状态选择是否加载
      console.log(loginState + '11')
      next()
    } else {
      next({// 需要登陆就登陆去
        path: '/Login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

router.afterEach(route => {
  Vue.prototype.$LoadingBar.finish()
})

new Vue({
  router,
  store,
  render: h => h(App)
  // 预渲染
  // mounted () {
  //   document.dispatchEvent(new Event('render-event'))
  // }
}).$mount('#app')
