<template>
    <div class="cardclass">
      <Row type="flex" align="middle" style="height: 18%" >
        <Col span="1">&nbsp;</Col>
        <Col span="1"><img class="logo" src="../../../../assets/all/paper-plane.svg" alt=" ：）" /></Col>
        <Col span="1">&nbsp;</Col>
        <Col span="4"><B  style="color:#2b85e4;font-size: 29px" class="hrefTexe"><a href="/">Just Do It</a></B></Col>
        <Col span="5">&nbsp;</Col>

        <!--首页渲染-->
        <Col span="2"  >
        </Col>
        <Col span="2" >
        </Col>
        <Col span="2" >
          <B style="cursor: pointer;font-size: 20px"

          ><a href="/">Home</a></B>
        </Col>
        <Col span="2" >
          <Dropdown>
            <a style="font-size: 20px" href="javascript:void(0)">
              更多
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem><a href="/#/todo">打卡去</a></DropdownItem>
              <DropdownItem><a href="/#/word">背单词去</a></DropdownItem>
              <DropdownItem><a href="/#/info">摸鱼去</a></DropdownItem>
              <DropdownItem><a href="http://www.ooowl.fun">关于</a></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
        <!--首页渲染 -->

        <Col  span="3">
          <LogoutButton class="button"></LogoutButton>
        </Col>
      </Row>

    </div>
</template>

<script>
import LogoutButton from '@/components/user/login/LogoutButton.vue'
export default {
  name: 'centerHeader',
  components: {
    LogoutButton
  }
}
</script>

<style scoped>
.cardclass{
  padding-top: 0.5%;
  width: 100%;
  background-color: #ffffff;
  box-shadow: #a4a4a4 0 0 6px; /*边框阴影*/
}
.button{

  position: relative;
  height: 100%;
  width: 70%;
}
.logo{
  width: 100%;
  height: 100%;
  border-radius: 5px;
  float: right;
  position: relative;
  top:  -50%;
  left: 10%;
  cursor:pointer
}
</style>
