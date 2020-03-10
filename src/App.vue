<template >
  <div id="app">
    <transition name="slide-fade">
  <router-view/>
    </transition>
  </div>
</template>

<script>

export default {
  beforeMount () {
    sessionStorage.setItem('isLogin', false)
  },
  mounted () {
    document.body.removeChild(document.getElementById('Loading'))
  },

  name: 'app',
  components: {

  }
}
</script>

<style>
html,body,#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  width: 100%;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
