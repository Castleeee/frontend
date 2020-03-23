import axios from 'axios' // 引入axios
import router from '../router'
import { Message, LoadingBar } from 'iview' // 用来处理刷新token后重新请求的自定义变量
// import qs from 'querystring' // 避免两次请求
axios.defaults.timeout = 5000
axios.defaults.isRetryRequest = false

var backip = 'http://127.0.0.1:8000'
let instance = axios.create({// 创建axios实例
  headers: {
    'content-type': 'application/json;charset=UTF-8'
  }
})

function RefreshToken () {
  console.log('请求新的:' + localStorage.getItem('refresh'))
  return instance.post(backip + '/user/token/refresh/', { refresh: localStorage.getItem('refresh') })
}

instance.interceptors.request.use(
  config => {
    console.log('请求钩子')

    var access = localStorage.getItem('access')
    if (access !== null) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      console.log('开始钩子')// todo 处理
      config.headers.Authorization = `Bearer ` + access// 请求头加上token
      console.log(localStorage.getItem('access'))
    }
    // if (config.method === 'post') { // 避免两次请求
    //   config.data = qs.stringify(config.data)
    // }
    return config
  },
  err => {
    console.log('请求错误钩子')
    Message.error({ message: '请求错误' })
    LoadingBar.error()
    return Promise.reject(err)
  })

instance.interceptors.response.use(
  response => { // 拦截响应，做统一处理
    console.log('结束钩子')// todo 处理
    return response
  },
  err => { // 接口错误状态处理，也就是说无响应时的处理
    if (err.response) {
      console.log('结束错误钩子')
      switch (err.response.status) {
        case 401:
          console.log('刷新钩子')
          let config = err.config
          localStorage.removeItem('access') // 删除已经存储的access
          if (!config.isRetryRequest) { // 判断是否已经刷新过access
            return RefreshToken()
              .then((res) => { // 刷新了token之后
                console.log('请求到了新的')
                localStorage.setItem('access', res.data.access)
                config.isRetryRequest = true // 修改flag
                config.headers.Authorization = `Bearer ` + localStorage.getItem('access') // 修改原请求的token
                console.log('重新请求接口')
                return axios(config) // 重新请求
              })
              .catch((err) => { // 刷新token失败只能跳转到登录页重新登录
                console.log('没请求到新的')
                localStorage.removeItem('access') // 清除token
                localStorage.removeItem('refresh')
                localStorage.setItem('isLogin', false)
                localStorage.removeItem('username')
                Message.error('错误' + err.response.status + ':token过期请重新登录')
                router.push('/Login')
                throw err
              })
          }
          break
        default:
          LoadingBar.error()
          Message.error('错误' + err.response.status + ':' + err.response.data.detail)
          // todo 处理错误的函数,一定要用err.response.data
      }
    } else { // 其他类型错误统一处理
      console.log('未响应')
      LoadingBar.error()
      Message.error('服务不可用 : ' + err.response.status)
    }

    return Promise.reject(err)
  }
)
export default instance
