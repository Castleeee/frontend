<template >
  <div :style=bg_img style="background-attachment:fixed;">
    <u-header class=headerclass ></u-header>
    <div style="height: 36%"></div>
    <u-middle class="middleclass"></u-middle>
    <u-footer class="footerclass"></u-footer>
  </div>
</template>

<script>
import UHeader from '@/components/user/usercenter/ui/centerHeader.vue'
import UMiddle from '@/components/user/usercenter/ui/centerMiddle.vue'
import UFooter from '@/components/user/usercenter/ui/centerFooter.vue'
export default {
  components: {
    UHeader,
    UMiddle,
    UFooter
  },
  name: 'usercenter',
  data () {
    return {
      bg_img: {
        backgroundImage: 'url(' + require('../../../assets/user/mountain-3.png') + ') ',
        backgroundPosition: 'right right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%',
        width: '100%'

      }
    }
  }

}
</script>

<style scoped>
.headerclass{
  height: 9%;
  width: 100%;
  position: fixed;
  z-index:9999;
}
.middleclass{
  min-height: 60%;
  background-color: #ffffff;
 }
.footerclass{
  height: 43%;

}
</style>
