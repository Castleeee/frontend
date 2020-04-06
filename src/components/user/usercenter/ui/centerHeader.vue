<template>
    <div class="cardclass">
      <Row type="flex" align="middle" style="height: 17%" >
        <Col span="1">&nbsp;</Col>
        <Col span="1"><a href="/"><img class="logo" src="../../../../assets/all/paper-plane.svg" alt=" ：）" /></a></Col>
        <Col span="1">&nbsp;</Col>
        <Col span="4"><B  style="color:#2b85e4;font-size: 25px" class="hrefTexe">用户资料</B></Col>
        <Col span="5">&nbsp;</Col>

        <!--首页渲染-->
        <Col span="2"  >
        </Col>
        <Col span="2" >
        </Col>
        <Col span="2" >
          <B style="cursor: pointer;font-size: 18px"

          ><a href="/">返回搜索</a></B>
        </Col>
        <Col span="2" >
          <Dropdown>
            <a style="font-size: 20px" href="javascript:void(0)">
              更多
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem><a href="/#/blogs/">博客收录</a></DropdownItem>
              <DropdownItem><a href="/#/about">关于</a></DropdownItem>
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
  width: 80%;
  height: 80%;
  border-radius: 5px;
  float: right;
  position: relative;
  top:  -50%;
  left: 10%;
  cursor:pointer
}
</style>
