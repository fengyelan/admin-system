<template>
  <div class="index-page full-page">
    <vHeadbar></vHeadbar>
    <div class="main-page">
      <el-row style="height: 100%;">
        <vSidebar></vSidebar>
        <el-col :span="20" style="height: 100%;overflow: auto;">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang='scss' scope>
  .main-page{
    height: calc(100% - 60px);
  }

</style>
<script>
import vSidebar from './aside.vue';
import vHeadbar from './head.vue';
import {getStore} from '../common/util.js'

export default {
  data() {
    return {

    }
  },
  mounted() {

    if (window.localStorage) {
      let username = getStore('adminUsername'),
        password = getStore('adminPassword');

      if (!username) {
        this.$router.push({ path: '/login' })
      }

    }
  },
  methods: {

  },
  components: {
    vHeadbar,
    vSidebar
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
