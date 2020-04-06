<template>
  <div>
    <div class="headerClass">
      <searchFrame style="width: 600px" v-bind:kw="kwords" v-bind:isrespage="isrespage"></searchFrame>
      <userAvatar></userAvatar>
    </div>
  </div>
</template>

<script>
import searchFrame from '../searchFrame'
import userAvatar from '../../user/usercenter/userAvatar'
export default {
  props: ['kw'],
  name: 'resultHeader',
  components: {
    userAvatar,
    searchFrame
  },
  data () {
    return {
      kwords: this.kw,
      isrespage: 1
    }
  }
}
</script>

<style scoped>

  .headerClass{
    display: flex;
  }
</style>
