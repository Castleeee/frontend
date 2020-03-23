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
          <Button v-click-ctrl
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
      sendDisabledTime: 60 // 验证码发送间隔60秒，可以考虑改成120秒

    }
  },
  methods: {

    sendCode () { // 发送验证码
      this.sendDisabled = true
      if (this.$validate_findback(this.code, this.email, this.password, true)) {
        this.$LoadingBar.start()// 开始加载条// 验证表单合法性
        this.$axios.post(this.$backip + '/user/resetpasswd/', { email: this.email })
          .then(function (res) { // post成功
            this.$Message.success('Success!请到你的邮箱查看验证码')// 告诉用户发送邮件成功
          }.bind(this)).catch(function (err) { // post没成功
            this.$handleAxiosErr(err)
          })
        this.$LoadingBar.finish()
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
      if (this.$validate_findback(this.code, this.email, this.password, false)) { // 验证表单合法
        this.$LoadingBar.start()// 开始加载条动画
        this.$axios.patch(this.$backip + '/user/resetpasswd/', { email: this.email, password: this.password, code: this.code })
          .then(function (res) { // post成功
            this.$Message.success(res.data.msg)// 告诉用户发送邮件成功
            this.$router.push('/Login')// 返回到首页
          }.bind(this)).catch(function (err) { // post没成功
            this.$handleAxiosErr(err)
          })
        this.$LoadingBar.finish()
      }
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
