<template>
  <div>
    <Button type="primary" shape="circle" @click="modal1 = true"><B style="font-size: 16px">LogOut</B></Button>
  <Modal
    v-model="modal1"
    title="确认注销: )"
    @on-ok="ok"
    @on-cancel="cancel">
    刷新页面生效，这将会清除您的cookie！

  </Modal>
  </div>
</template>
<script>
export default {
  name: 'LogoutButton',
  data () {
    return {
      modal1: false
    }
  },
  methods: {
    ok () {
      this.$store.commit('REMOVE_COUNT')
      this.$Message.success('注销成功')
      this.$router.push({ path: '/' })
    },
    cancel () {
      this.$Message.info('取消～')
    }
  }
}
</script>

<style scoped>

</style>
