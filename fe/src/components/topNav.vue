<template>
  <div class="top-nav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style>
.top-nav{
	padding: 20px;
}

</style>
<script>

export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

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
