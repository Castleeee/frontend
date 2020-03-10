<template>
  <div>
    <Card>
      <div
        v-if="signup"
        style="height: 10%;font-size: 20px">
        注册

      </div>
      <div
        v-else
        style="height: 10%;font-size: 20px">
        登录
      </div>
      <!-- 上面是标签 -->
      <Divider>·</Divider>
      <br/> <br/> <br/>

      <label>账户:

        <Input size="large"
               style="width: 72%;"
               v-model="usernumber"
               placeholder="账号"/>
      </label>
      <br/>
      <br/>
      <br/>
      <label>密码:
        <Input size="large"
               style="width: 72%;"
               v-model="passwd"
               placeholder="密码"
               type="password"/>
      </label>
      <br v-if="signup"/>
      <br v-if="signup"/>
      <br v-if="signup"/>
      <label v-if="signup">确认:
        <Input
          size="large"
          style="width: 72%;"
          v-model="repasswd"
          type="password"
          placeholder="再次输入密码"/>
      </label>
      <br v-if="signup"/>
      <br v-if="signup"/>
      <br v-if="signup"/>
      <label v-if="signup">邮箱:
        <Input size="large"
               style="width: 72%;"
               v-model="email"
               placeholder="你的邮箱"/>
      </label>
      <br/>
      <br/>
      <br/>
      <br/>
      <!-- 上面是表单，根据signup的值变化判断是登陆还是注册 -->
      <div style="margin-bottom: 7%;"
           v-if="signup">
        <Button :disabled="isdisabled"
                style="width: 60%"
                type="success"
                @click="doRegeist">注册
        </Button>
        <br><br>
        <Button @click="switchsign"
                style="width: 60%"
                type="warning">返回
        </Button>
      </div>
      <div style="margin-bottom: 7%;"
           v-else>
        <Button :disabled="isdisabled"
                style="width: 60%"
                type="primary"
                @click="doLogin">登录
        </Button>
        <br><br>
        <Button @click="switchsign"
                style="width: 60%"
                type="success">注册
        </Button>
      </div>
      <!-- 上面是按钮，切换登陆状态执行逻辑 -->

    </Card>

  </div>

</template>

<script>
export default {

  name: 'loginCard',
  data () {
    return {
      usernumber: '', // 用户名
      passwd: '', // 密码
      repasswd: '', // 确认密码
      email: '', // 邮箱
      signup: false, // 是否为注册
      equal: true,
      findback: false,
      totalTime: 1, // 登录等待时间
      isdisabled: false// 避免按钮重复请求多次

    }
  },
  methods: {
    switchsign () { // 切换注册还是登录
      this.signup = !this.signup
      this.isdisabled = false
    },

    validate (username, password, repassword, email, islogin) {
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
    },
    handleAxiosErr (err) { // 错误提示函数
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
          this.$Message.error('登录失败，错误：' + err.response.config.url)
      }
      this.$LoadingBar.error()// 加载错误进度条动画
    },
    doLogin () { // 登陆逻辑
      if (this.validate(this.usernumber, this.passwd, '', '', true)) { // 验证表单合法
        // console.log('startLogin')
        this.$LoadingBar.start()// 加载条动画
        this.axios({// post接口
          method: 'post',
          headers: {
            'Content-type': 'application/json;charset=UTF-8', // 注意header
            'Access-Control-Allow-Origin': '*'
          },
          url: '/accounts/login/', // todo 不要忘了修改接口ip！！
          data: {// 表单数据
            username: this.usernumber,
            password: this.passwd
          }
        }).then(function (res) { // post成功
          this.$Message.success('Success!')// 告诉用户登录成功
          this.isdisabled = true
          this.$store.commit('ADD_COUNT', res.data.token, this.usernumber, 'a')// todo 设置用户token和用户id
          console.log(res.data, this.usernumber)
          let clock = window.setInterval(() => { // 1秒延迟
            this.totalTime--
            if (this.totalTime < 0) {
              window.clearInterval(clock)
              this.$LoadingBar.finish()// 结束加载动画
              this.isdisabled = false// 按钮改回来
              this.$router.push('/')// 返回到首页
            }
          }, 1000)
        }.bind(this)).catch(function (err) { // post没成功
          console.log(err)
          // this.isdisabled = true
          this.handleAxiosErr(err)
          let clock = window.setInterval(() => { // 1秒延迟
            this.totalTime--
            if (this.totalTime < 0) {
              window.clearInterval(clock)
              this.isdisabled = false// 按钮改回来
            }
          }, 1000)
        }.bind(this))
      }
    },
    doRegeist () {
      if (this.validate(this.usernumber, this.passwd, this.repasswd, this.email, false)) { // todo 注册逻辑
        console.log('do some post')
        // todo post一下第一个接口
        // todo 把基本信息放到vuex里面
        // todo 跳转到email验证界面
        this.$router.push({ path: '/regValidateEmail' })// 注册后验证邮箱
      }
    } // 注册逻辑

  }
}

</script>

<style scoped>

</style>
