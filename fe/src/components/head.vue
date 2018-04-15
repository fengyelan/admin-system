<template>
 
    <div class='header' id='head'>
      <div class="title center_y">后台管理系统</div>
      <div class="person-info center_y">
        {{username}},欢迎您！
      </div>
      <div class="quit center_y" @click="quit">退出</div>
    </div>

</template>
<style lang='scss' scope>
@import '../assets/style/common.scss';
.header {
  position: relative;
  background-color: #3a4c66;
  width:100%;
  padding: 30px 0;
  .title {
    font-size: 20px;
    color: #fff;
    left: 20px;
  }
  .person-info {
    right: 50px;
    font-size: 15px;
    color: #fff;
  }
  .quit {
    right: 20px;
    font-size: 15px;
    color: #fff;
  }
}

</style>
<script>
import {removeStore,getStore} from '../common/util.js'
export default {
  data() {
    return {
    	username:''
    }
  },
  mounted() {
  	this.username = getStore('adminUsername');
  },
  methods: {
  	quit(){
      removeStore('adminUsername');
      removeStore('adminPassword');
  		this.$router.push({ path: '/login' });
  	}
  },
  components: {
    
  },
  directives: {

  },
  filters: {

  },
  computed: {

  },
  watch: {

  }
}

</script>

