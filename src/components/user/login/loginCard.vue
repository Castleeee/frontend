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
               v-model="username"
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
        <Button v-click-ctrl
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
        <Button v-click-ctrl
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
      username: '', // 用户名
      passwd: '', // 密码
      repasswd: '', // 确认密码
      email: '', // 邮箱
      signup: false, // 是否为注册
      equal: true,
      findback: false

    }
  },
  methods: {
    switchsign () { // 切换注册还是登录
      this.signup = !this.signup
    },
    doLogin () { // 登陆逻辑
      if (this.$validate_login(this.username, this.passwd, '', '', true)) { // 验证表单合法
        this.$axios.post(this.$backip + '/user/login/',
          {// post请求
            username: this.username,
            password: this.passwd
          }).then((res) => { // post成功
          this.$Message.success('Success!')// 告诉用户登录成功
          this.$storeToken(this.username, res.data.access, res.data.refresh)
          this.$router.push('/usercenter')// 返回到首页
        })
      }
    },
    doRegeist () {
      if (this.$validate_login(this.username, this.passwd, this.repasswd, this.email, false)) { //  注册逻辑
        this.$axios.post(this.$backip + '/user/register/', {// post请求
          username: this.username,
          password: this.passwd,
          email: this.email
        }).then((res) => { // post成功
          this.$Message.success('Success!请到你的邮箱激活账号')// 告诉用户注册成功
          this.switchsign()
        })
      }
    } // 注册逻辑

  }
}

</script>

<style scoped>

</style>
