import Vue from 'vue'

// 登录注册验证器
Vue.prototype.$validate_login = function (username, password, repassword, email, islogin) {
  if (!RegExp('^[\u4E00-\u9FA5a-zA-Z0-9]*$').test(username) || username.length < 2 || username.length > 8) { // 判断用户名是否合法
    this.$Message.error('用户名必须由2-8字母和汉字组成')
    return false
  } else {
    if (password.length < 8) { // 密码长度不能短于8个字符
      this.$Message.error('密码太短')
      // console.log('asdafsdfdas')
      return false
    } else {
      if (islogin === true) { // 注册验证还是登陆验证
        return true
      } else {
        if (password !== repassword) { // 判断确认密码和密码是否一样
          this.$Message.error('两次密码不一致')
          return false
        } else {
          if (email.indexOf('@') === -1 || email.length < 7) { // 简单检测邮箱合法性
            this.$Message.error('邮箱不正确！')
            return false
          } else {
            return true
          }
        }
      }
    }
  }
}
// 找回密码验证器
Vue.prototype.$validate_findback = function (code, email, password, issend) { // 验证最后的参数用来判别是发送验证码还是提交
  if (issend) {
    if (email.indexOf('@') === -1 || email.length < 7) { // 验证邮箱
      this.$Message.error('邮箱不正确！')
      return false
    }
    return true
  } else {
    if (email.indexOf('@') === -1 || email.length < 7) { // 验证邮箱
      this.$Message.error('邮箱不正确！')
      return false
    } else {
      if (password.length < 8) { // 验证密码
        this.$Message.error('密码太短')
        return false
      } else {
        if (code.length === 10 && RegExp('^[a-zA-Z0-9]*$').test(code)) { // 验证验证码
          return true
        } else {
          this.$Message.error('验证码错误')
          return false
        }
      }
    }
  }
}
// 更换邮箱验证器
Vue.prototype.$validate_changeemail = function (code, email, issend) { // 验证最后的参数用来判别是发送验证码还是提交
  if (issend) {
    if (email.indexOf('@') === -1 || email.length < 7) { // 验证邮箱
      this.$Message.error('邮箱不正确！')
      return false
    }
    return true
  } else {
    if (email.indexOf('@') === -1 || email.length < 7) { // 验证邮箱
      this.$Message.error('邮箱不正确！')
      return false
    } else {
      if (code.length === 10 && RegExp('^[a-zA-Z0-9]*$').test(code)) { // 验证验证码
        return true
      } else {
        this.$Message.error('验证码错误')
        return false
      }
    }
  }
}

// 修改密码验证器
Vue.prototype.$validate_changepwd = function (pwd, npwd, npwd1) { // 修改密码验证函数
  if (pwd.length >= 8 && npwd.length >= 8 && npwd1.length >= 8 && npwd === npwd1) {
    return pwd !== npwd
  } else {
    this.$Message.error('密码有错误')
    this.$LoadingBar.error()// 加载错误进度条动画
    return false
  }
}
// 登录注销存储token
Vue.prototype.$storeToken = function (username, access, refresh, id) { // 登录
  console.log('username:', username, 'access:', access, 'refresh:', refresh)
  localStorage.setItem('username', username)
  localStorage.setItem('id', id)
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
  localStorage.setItem('isLogin', true)// todo token存在session中
}
Vue.prototype.$removeToken = function () { // 注销
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('id')
  localStorage.setItem('isLogin', false)// todo 清除token
  localStorage.removeItem('username')
}
// 限制按钮频率指令
Vue.directive('click-ctrl', {// 控制按钮的频率
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})
// 错误处理函数
Vue.prototype.$handleAxiosErr = function (err) { // 错误提示函数
  switch (err.response.status) {
    case 400:
      this.$Message.error('用户名或密码错误 : ' + err.response.status)
      break
    case 401:
      this.$Message.error('未授权，请登录 : ' + err.response.status)
      break
    case 403:
      this.$Message.error('拒绝访问 : ' + err.response.status)
      break
    case 404:
      this.$Message.error(`请求地址不存在 : ` + err.response.status)
      break
    case 408:
      this.$Message.error('请求超时 : ' + err.response.status)
      break
    case 500:
      this.$Message.error('服务器内部错误 : ' + err.response.status)
      break
    case 501:
      this.$Message.error('服务未实现 : ' + err.response.status)
      break
    case 502:
      this.$Message.error('网关错误 : ' + err.response.status)
      break
    case 503:
      this.$Message.error('服务不可用 : ' + err.response.status)
      break
    case 504:
      this.$Message.error('网关超时 : ' + err.response.status)
      break
    case 505:
      this.$Message.error('HTTP版本不受支持 : ' + err.response.status)
      break
    default:
      this.$Message.error('错误' + err.response.status + ':' + err.response.data.detail)
  }
  this.$LoadingBar.error()// 加载错误进度条动画
}
// 获取用户信息存储到vuex
Vue.prototype.$getProfile = function () {
  this.$axios.get(this.$backip + '/user/profile/').then((res) => {
    var data = res.data
    for (var k in data) {
      if (data[k] === null || data[k] === '') {
        data[k] = '未设置'
      } else if (data[k] === false) {
        data[k] = '否'
      } else if (data[k] === true) {
        data[k] = '是'
      }
    }
    this.$store.commit('storeProfile', data)
    localStorage.setItem('id', data.id)
    this.$getBlog(data.id)
  })
}
// 获取用户博客介绍存储到vuex
Vue.prototype.$getBlog = function (id) {
  console.log('id:' + localStorage.getItem('id'))
  this.$axios.get(this.$backip + '/user/blog/' + id + '/').then((res) => {
    var data = res.data
    for (var k in data) {
      if (data[k] === null || data[k] === '') {
        data[k] = '未设置'
      } else if (data[k] === false) {
        data[k] = '否'
      } else if (data[k] === true) {
        data[k] = '是'
      }
    }
    this.$store.commit('storeBlog', data)
  })
}
Vue.filter('NumFormat', function (value) { // 带逗号的过滤器
  if (!value) return '0.00'

  /* 原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1，感谢Nils指正 */
  /* 后来改成了 Number(value)|0,但是输入超过十一位就为负数了，具体见评论 */
  var intPart = Number(value) - Number(value) % 1 // 获取整数部分（这里是windy93的方法）
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断

  var floatPart = '.00' // 预定义小数部分
  var value2Array = value.toString().split('.')

  //= 2表示数据有小数位
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString() // 拿到小数部分

    if (floatPart.length === 1) { // 补0,实际上用不着
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart
    }
  } else {
    return intPartFormat
  }
})
Vue.filter('TypeFormat', function (value) { // 格式化文章类型
  if (value === 'q') {
    return '问题'
  }
  if (value === 'a') {
    return '文章'
  }
})
// Vue.filter('TagFormat', function (value) { // 格式化标签列表
//   return value.join(',')
// })
