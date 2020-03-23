<template>
    <div>
      <Card>
<!--        <profileData></profileData>-->
        <div>
          <p style="font-size: 26px">我的资料</p>
          <Divider />
          <div style="font-size: 20px; text-align: left;padding-left: 5%" >
            <div style="display:flex; ">
              <div v-on:click="changeAva" style="height:400px;width:12%; margin-right:20px">
                <img src="../../../../assets/user/mountain-2.jpg" class="round_icon"  alt="">
              </div>
              <div style="height:40%; width:8%; margin-left:30px;margin-right:20px">
                <p> 账号</p><br/>
                <p> 昵称</p><br/>
                <p> 邮箱</p><br/>
                <p> QQ号码</p><br/>
                <p> 注册日期</p><br/>
                <p> 用户编号</p><br/>
                <p> 管理员</p><br/>
              </div>
              <div v-if="!edit" style=" height:40%; width:80%; margin-right:20px">
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.username }}</p><br/>
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.nickname }}</p><br/>
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.email }}</p><br/>
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.qq }}</p><br/>
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.date_joined }}</p><br/>
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.id }}</p><br/>
                <div style="display: flex"> <div>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.is_staff }}</div>
                  <div style="  display: flex ;margin-left:70%">
                    <Button class="bottomButon" type="info" @click="edit=!edit">编辑</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button class="bottomButon" to="/changePwd" type="success">修改密码</Button>
                  </div><br/>
                </div>

              </div>
              <div v-if="edit" style=" height:40%; width:80%; margin-right:20px">
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.username }}</p><br/>
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input v-model="nickname" placeholder="您的昵称" style="width: 300px" />
                </p><br/>
                <p><a href ='#/changeEmail/'> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.email }}</a></p><br/><!-- todo 换邮箱 -->
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input v-model="qq" placeholder="您的QQ号码" style="width: 300px" />
                </p><br/>
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.date_joined }}</p><br/>
                <p> :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.id }}</p><br/>
                <div style="display: flex"> <div>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ profile.is_staff }}</div>
                  <div style="  display: flex ;margin-left:70%">
                    <Button class="bottomButon" type="success" @click="edit=!edit">取消</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button class="bottomButon" @click="updateProfile" type="error">保存</Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Card>
    </div>
</template>

<script>
export default {
  name: 'myprofile',
  created () {
    this.$getProfile()
  },
  data: function () {
    return {
      edit: false,
      qq: null,
      nickname: ''
    }
  },
  methods: {
    changeAva: function () {
      this.$Message.success('asas')// todo 更换头像
    },
    updateProfile: function () {
      var mynickname = this.nickname
      var myqq = this.qq
      if (myqq === null && mynickname === '') {
        this.$Message.error('没有更改任何资料!')
      } else {
        if (this.qq === null) {
          myqq = this.$store.state.profile.qq
        } else if (this.nickname === '') {
          mynickname = this.$store.state.profile.nickname
        }
        this.$axios.post(this.$backip + '/user/profile/', { nickname: mynickname, qq: myqq })
          .then((res) => { location.reload() })
      }
    }
  },
  computed: {
    profile: {
      get: function () {
        return this.$store.state.profile // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    }
  }
}
</script>

<style scoped>
  .round_icon{
    border-style:solid;
    border-color: #2bb3ff;
    border-width:5px;
    margin-top: 30%;
    width: 100%;
    height: 38%;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .bottomButon{

    height: 30px;
    width: 100px;

  }
</style>
