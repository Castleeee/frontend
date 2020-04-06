<template>
  <div class="footerclass">
    <Row style="padding-top: 10px">
      <Col v-if="!issearch" span="2">&nbsp;</Col>
      <Col span="5" style="text-align: left;padding-left: 3%">
        <a :href=this.help>帮助</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a :href=this.mail>反馈</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a :href=this.privacy>隐私条款</a>
      </Col>
      <Col v-if="!issearch" span="14">&nbsp;</Col>
      <Col v-if="issearch" span="16">&nbsp;</Col>
      <Col span="2" style="text-align: right">
        <a href="#/about" >关于</a>
      </Col>
      <Col span="1">&nbsp;</Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'searchFooter',
  props: { issearch: [Boolean] },
  data () {
    return {
      help: this.$helpdocs,
      mail: 'mailto:' + this.$authormail,
      privacy: this.$privacy
    }
  }

}
</script>

<style scoped>
  .footerclass{
    bottom: 0;
    position: static;
    width: 100%;
    height: 5%;
    background: #f2f2f2;
    border-top: 1px solid #e4e4e4;
  }
  a:hover {
    color: #333;
  }
  a{
    color: #5f6368;
     }

</style>
