<template style="height: 100%;width: 100%; ">
  <div class="homeBack">
    <Row style="height: 15%">
      <Col span="12"></Col>
      <Col span="12"></Col>
    </Row>
    <br>
    <Row style="height: 13%">
      <Col span="8">&nbsp;</Col>
      <Col span="8"><h1 style="font-size: 500%">给👴搜</h1></Col><!--   todo:别忘了改回来   -->
      <Col span="8">&nbsp;</Col>
    </Row >
    <br>
    <Row style="height: 10%;width:100%;position: fixed">
      <Col span="8">&nbsp;</Col>
      <Col span="8"><search-frame k="撒大哥"></search-frame></Col>
      <Col span="8">&nbsp;</Col>
    </Row>
    <user-avatar></user-avatar>
    <searchFooter :issearch=true style="position: fixed"></searchFooter>
  </div>
</template>
<script>
import searchFrame from '@/components/search/searchFrame.vue'
import searchFooter from '@/components/search/result/searchFooter.vue'
import userAvatar from '../components/user/usercenter/userAvatar'
export default {
  components: {
    searchFrame,
    searchFooter,
    userAvatar
  }
}
</script>
<style scoped>
  /*背景图*/

  .homeBack{
    height: 95%;
    width: 100%;
    background:url("../assets/all/homeBack.svg") no-repeat left center;

  }

</style>
