<template>
  <div>
    <Card>
      <p style="font-size: 20px" slot="title">为你的账户修改密码！</p>
      <p style="font-size: 20px">
        请验证你的旧密码并填入你的新密码
        <br/>
        <br/>
      </p>
      <p>
        <Input class='inputclass' v-model="oldpassword" size="large" placeholder="旧密码"/>
        <br>
        <br/>
      </p>
      <p>
        <Input class='inputclass' v-model="newpassword" size="large" placeholder="新密码"/>
        <br>
        <br/>
      </p>
      <p>
        <Input class='inputclass' v-model="newpassword1" size="large" placeholder="重复新密码"/>
        <br>
        <br/>
      </p>
      <Row>
        <Col span="24">
          <Button v-click-ctrl
                  @click="submitCode"
                  class=btnclass
                  type="info"><B>提交并修改密码</B>
          </Button>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'changePwdCard',
  data () {
    return {
      oldpassword: '',
      newpassword: '',
      newpassword1: ''
    }
  },
  methods: {
    submitCode () {
      this.$LoadingBar.start()// 开始加载条
      if (this.$validate_changepwd(this.oldpassword, this.newpassword, this.newpassword1)) { // 验证表单合法
        this.$axios.post(this.$backip + '/user/changepasswd/', { oldpasswd: this.oldpassword, newpasswd: this.newpassword })
          .then(function (res) { // post成功
            this.$Message.success('Success!')// 告诉用户登录成功
            this.$removeToken()
            this.$router.push('/Login')// 返回到首页
          })
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
    width: 25%;
  }
</style>
