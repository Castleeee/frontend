<template>
    <div class="full">

          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu active-name="1" theme="light" width="auto" :open-names="['1']">
                <MenuGroup title=" ">
                  <MenuItem @click.native="cstatus=1" name="1">个人资料</MenuItem>
                  <MenuItem @click.native="cstatus=2" name="2">历史记录</MenuItem>
                  <MenuItem @click.native="cstatus=3" name="3">我的博客</MenuItem>

                </MenuGroup>

<!-- 占位用的 -->
                <MenuGroup title=" ">
                </MenuGroup>
                <MenuGroup title=" ">
                </MenuGroup>
                <MenuGroup title=" ">
                </MenuGroup>
                <MenuGroup title=" ">
                </MenuGroup>
                <MenuGroup title=" ">
                </MenuGroup>
                <MenuGroup title=" ">
                </MenuGroup>
                <MenuGroup title=" ">
                </MenuGroup>
<!-- 占位结束 -->
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
              <myprofile v-show="cstatus===1"></myprofile>
              <myhistory v-show="cstatus===2"></myhistory>
              <myblog v-show="cstatus===3"></myblog>
            </Content>
            </Layout>
    </div>
</template>

<script>
import myprofile from '../content/myprofile'
import myhistory from '../content/myhistory'
import myblog from '../content/myblog'
export default {
  name: 'centerMiddle',
  components: { myblog, myhistory, myprofile },
  data: function () {
    return {
      cstatus: 1// 控制展示哪个
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
