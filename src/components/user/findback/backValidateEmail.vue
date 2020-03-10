<template style="height: 100%;width: 100%;overflow: hidden;">
  <div class="full">
    <div :style=bg_img
         class="full">
    <findbackCard class="cardclass"></findbackCard>
    </div>
  </div>
</template>

<script>
import findbackCard from '@/components/user/findback/findbackCard.vue'
export default {
  components: {
    findbackCard
  },
  name: 'backVlidateEmali',
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
