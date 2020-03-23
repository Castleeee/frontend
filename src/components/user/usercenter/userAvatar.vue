<template>
    <div>
      <Button style="width:0;height: 0;" @click="sider">
        <Avatar style="top: 40px;right: 50px; position: fixed;"
                src="https://i.loli.net/2017/08/21/599a521472424.jpg"
                size=large
        />
      </Button>
      <div>
        <transition name="fadeRight">
          <homeSider class="sider" v-if="show"></homeSider>
        </transition>
      </div>
    </div>
</template>

<script>
import router from '../../../router'
import homeSider from '../../../views/side/homeSider.vue'
export default {
  name: 'userAvatar',
  components: {
    homeSider

  },
  data: function () {
    return {
      show: false
    }
  },
  methods: {
    sider () {
      if (localStorage.getItem('isLogin') === 'true') { this.show = !this.show } else {
        router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
  .sider{
    right:0px;
    position: fixed;
    top:100px;
    height: 100%;width: 20%;
  }
</style>
