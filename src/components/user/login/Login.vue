<template style="height: 100%;width: 100%;">
    <div class="full">
      <div :style=bg_img
      class="full">
      <login-card class="cardclass"></login-card>

        <Button style="bottom: 20px;right: 20px; position: fixed;" type="info" ghost shape="circle" to="/backValidateEmail">找回密码</Button>
      </div>
    </div>
</template>

<script>
import loginCard from '@/components/user/login/loginCard.vue'
export default {
  beforeCreate: function () {
    document.getElementsByTagName('body')[0].className = 'removescroll'
  },
  mounted: function () {
    setTimeout(function () {
      document.body.removeAttribute('class', 'removescroll')
    }, 300)
  },
  components: {
    loginCard
  },
  name: 'Login',
  data () {
    return {
      bg_img: {
        backgroundImage: 'url(' + require('../../../assets/user/mountain.jpg') + ') ',
        backgroundPosition: 'right right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'

      }
    }
  }

}
</script>

<style scoped>
.full{
  height: 100%;
  width: 100%;

}
.cardclass{
  padding-top: 5%;
  padding-bottom: auto;
  height:7%;
  width:40%;
  margin:auto;
}
</style>
