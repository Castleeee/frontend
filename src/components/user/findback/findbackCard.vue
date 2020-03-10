<template style="height: 100%;width: 100%;overflow: hidden;">
  <div>

    <Card>
      <p style="font-size: 20px" slot="title">找回密码 : |</p>
      别再忘记密码了
      <p>
        <br/>
        邮&nbsp;&nbsp;&nbsp;&nbsp;箱 📮 : <Input class='inputclass' v-model="email" size="large"
                                               placeholder="如果还记得邮箱的话,就填在这里..."/>
        <br/>
        <br/>
      </p>
      <p>
        验证码 ✉️ : <Input class='inputclass' v-model="code" size="large" placeholder="ノ( ' - 'ノ)收到的验证码放这里"/>
        <br>
        <br/>
        新密码 🔑 : <Input class='inputclass' v-model="password" size="large" placeholder="新密码"/>
        <br>
        <br/>
        <br/>
      </p>
      <Row>
        <Col span="12">
          <Button :disabled="sendDisabled"
                  @click="sendCode"
                  class=btnclass
                  type="info"><B v-if="sendDisabledTime!==60">发送验证码( {{ sendDisabledTime }} )</B>
            <B v-else>发送验证码</B>
          </Button>
        </Col>
        <Col span="12">
          <Button :disabled="submitDisabled"
                  @click="submitCode"
                  class=btnclass
                  type="success">
            <B>重置密码</B>
          </Button>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  components: {},
  name: 'findbackCard',
  data () {
    return {
      email: '', // 邮箱
      code: '', // 用户填入的验证码
      password: '', // 用户填入的新密啊吗
      sendDisabled: false, // 禁用发送按钮，避免密集请求
      submitDisabled: false, // 禁用提交按钮，避免密集请求
      sendDisabledTime: 60, // 验证码发送间隔60秒，可以考虑改成120秒
      submitDisabledTime: 1// 提交按钮禁用间隔1秒

    }
  },
  methods: {
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
    validate (code, email, password, issend) { // 验证，最后的参数用来判别是发送验证码还是提交
      if (issend) {
        if (email.indexOf('@') === -1 || email.length < 7) { // 验证邮箱
          this.$Message.error('邮箱不正确！')
          return false
        } else {
          if (password.length < 8) { // 验证密码
            this.$Message.error('密码太短')
            return false
          } else {
            if (code.length === 6 && RegExp('^[a-zA-Z0-9]*$').test(code)) { // 验证验证码
              return true
            } else {
              this.$Message.error('验证码错误')
              return false
            }
          }
        }
      } else {
        if (code.length === 6 && RegExp('^[a-zA-Z0-9]*$').test(code)) {
          return true
        } else {
          this.$Message.error('验证码错误')
          return false
        }
      }
    },
    sendCode () { // 发送验证码
      this.sendDisabled = true

      if (this.validate(this.code, this.email, this.password, true)) {
        this.$LoadingBar.start()// 开始加载条// 验证表单合法性
        // this.axios.post()// todo 结束进度条，成功或者失败，捕捉错误
      }

      let clock = window.setInterval(() => { // 1秒延迟
        this.sendDisabledTime--
        if (this.sendDisabledTime < 0) {
          this.sendDisabled = false// 发送按钮改回来
          this.sendDisabledTime = 60
          window.clearInterval(clock)
        }
      }, 1000)
    },
    submitCode () {
      this.submitDisabled = true// 禁用提交按钮

      if (this.validate(this.code, '', '', false)) { // 验证表单合法
        this.$LoadingBar.start()// 开始加载条动画
        // this.axios.post()// todo 结束进度条，成功或者失败，捕捉错误,重置成功跳回登陆页
      }
      let clock = window.setInterval(() => { // 1秒延迟
        this.submitDisabledTime--
        if (this.submitDisabledTime < 0) {
          this.submitDisabledTime = 1
          this.submitDisabled = false// 按钮改回来
          window.clearInterval(clock)
        }
      }, 1000)
    }
  }

}
</script>

<style scoped>
  .inputclass {
    width: 72%;
  }

  .btnclass {
    width: 40%;
  }
</style>
