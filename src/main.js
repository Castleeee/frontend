import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入iview
import './plugins/iview.js'
import './utils/utils.js'
// import axios from 'axios'
import axios from './utils/axiosutils.js'
// 添加动效
import 'vue2-animate/dist/vue2-animate.min.css'
// 添加echarts
import echarts from 'echarts'

// 生产环境请注释mock语句
// import './mock/index.js'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$backip = 'http://127.0.0.1:8000' // 指明后端ip地址
Vue.prototype.$authormail = '2411708618@qq.com' // 作者邮箱
Vue.prototype.$APIdocs = 'http://127.0.0.1:8000/swagger/'// 后端文档
Vue.prototype.$helpdocs = 'http://127.0.0.1:8000/swagger/'// 帮助地址
Vue.prototype.$privacy = 'http://127.0.0.1:8081/#隐私条款'
Vue.prototype.$store = store

new Vue({
  router,
  store,
  render: h => h(App)
  // 预渲染
  // mounted () {
  //   document.dispatchEvent(new Event('render-event'))
  // }
}).$mount('#app')
