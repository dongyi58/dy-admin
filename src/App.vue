<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './util/mock'
export default {
  name: 'App',
  components: {
  },
  mounted(){
    this.$http('/mockdata').then(res=>{
      console.log(res)
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
