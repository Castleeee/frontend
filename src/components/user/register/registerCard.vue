<template>
  <div>
    <Card>
      <p style="font-size: 20px" slot="title">只差最后一步即可开通你的账户！</p>
      <p style="font-size: 20px">
        我们会往你的邮箱{{ }}发送一个验证码，请注意查收
        <br/>
        <br/>
      </p>
      <p>
        <Input class='inputclass' v-model="code" size="large" placeholder="ノ( ' - 'ノ)收到的验证码放这里"/>
        <br>
        <br/>
      </p>
      <Row>
        <Col span="24">
          <Button :disabled="submitDisabled"
                  @click="submitCode"
                  class=btnclass
                  type="info"><B>提交验证码</B>
          </Button>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'registerCard',
  data () {
    return {
      code: '',
      disabletime: 1,
      submitDisabled: false

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
    validate (code) { // 验证函数
      if (code.length === 6 && RegExp('^[a-zA-Z0-9]*$').test(code)) {
        return true
      } else {
        this.$Message.error('验证码错误')
        this.$LoadingBar.error()// 加载错误进度条动画
        return false
      }
    },
    submitCode () {
      this.submitDisabled = true// 禁用提交按钮
      this.$LoadingBar.start()// 开始加载条
      if (this.validate(this.code)) { // 验证表单合法
        // this.axios.post()// todo 结束进度条，成功或者失败，捕捉错误,成功跳回用户中心
      }
      let clock = window.setInterval(() => { // 1秒延迟
        this.disabletime--
        if (this.disabletime < 0) {
          window.clearInterval(clock)
          this.submitDisabled = false// 按钮改回来
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
    width: 25%;
  }
</style>
