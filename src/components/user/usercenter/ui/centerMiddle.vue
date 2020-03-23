<template>
    <div class="full">

          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">

                  <MenuItem name="1-1">个人资料</MenuItem>
                  <MenuItem name="1-2">历史记录</MenuItem>
                  <MenuItem name="1-3">我的博客</MenuItem>
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
            </Layout>
    </div>
</template>

<script>
export default {
  name: 'centerMiddle'
}
</script>

<style scoped>
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
