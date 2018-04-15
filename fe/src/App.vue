<template>
  <div id="app" class='full-page'>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import 'assets/style/common.scss'
.main-content {
  width: 80%;
  padding-left: 20px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 /* text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
