<template style="height: 100%;width: 100%;overflow: hidden;">
  <div class="full">
    <div :style=bg_img
         class="full">
      <register-card class="cardclass"></register-card>
    </div>
  </div>
</template>

<script>
import registerCard from '@/components/user/register/registerCard.vue'
export default {
  components: {
    registerCard
  },
  name: 'regValidateEmali',
  data () {
    return {
      bg_img: {
        backgroundImage: 'url(' + require('../../../assets/user/mountain.jpg') + ') ',
        backgroundPosition: 'right right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflow: 'hidden'
      }
    }
  }

}
</script>

<style scoped>
  .full{
    height: 100%;
    width: 100%;
    overflow: hidden
  }
  .cardclass{
    padding-top: 5%;
    padding-bottom: auto;
    height:7%;
    width:40%;
    margin:auto;
  }
</style>
