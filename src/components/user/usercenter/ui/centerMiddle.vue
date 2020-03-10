<template>
    <div class="full">

          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">

                  <MenuItem name="1-1">Option 1</MenuItem>
                  <MenuItem name="1-2">Option 2</MenuItem>
                  <MenuItem name="1-3">Option 3</MenuItem>
                  <MenuItem name="2-1">Option 1</MenuItem>
                  <MenuItem name="2-2">Option 2</MenuItem>
                <MenuGroup title="">
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
