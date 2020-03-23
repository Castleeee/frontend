<template>
    <div>
      <Card class="cardclass" :bordered="true">
        <p slot="title"><a href="#/usercenter/">用户中心</a></p>
        <div style="display:flex; text-align: left;font-size: 15px">
        <div style="">
          <p> 账号</p><br/>
          <p> 昵称</p><br/>
          <p> 邮箱</p><br/>
          <p> QQ号码</p><br/>
          <p> 注册日期</p><br/>
          <p> 用户编号</p><br/>
          <p> 管理员</p><br/>
        </div>
        <div style="margin-left:5px ">
          <p> :&nbsp;&nbsp;{{ profile.username }}</p><br/>
          <p> :&nbsp;&nbsp;{{ profile.nickname }}</p><br/>
          <p> :&nbsp;&nbsp;{{ profile.email }}</p><br/>
          <p> :&nbsp;&nbsp;{{ profile.qq }}</p><br/>
          <p> :&nbsp;&nbsp;{{ profile.date_joined }}</p><br/>
          <p> :&nbsp;&nbsp;{{ profile.id }}</p><br/>
          <p> :&nbsp;&nbsp;{{ profile.is_staff }}</p><br/>
        </div>
        </div>
      </Card>
    </div>
</template>

<script>
// import profileData from '../../components/user/usercenter/content/profileData'
export default {
  components: {
    // profileData
  },
  created () {
    this.$getProfile()
  },
  name: 'homeSider',
  beforeCreate: function () {
    document.getElementsByTagName('body')[0].className = 'removescroll'
  },
  mounted: function () {
    setTimeout(function () {
      document.body.removeAttribute('class', 'removescroll')
    }, 300)
  },
  data: function () {
    return {
    }
  },
  methods: {

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
.sider{
  height: 100%;
}
.cardclass{
  height: 500px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
}
</style>
