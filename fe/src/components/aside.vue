<template>
  <el-col :span="4"  style="min-height: 100%; background-color: #3a4c66;">
    <el-menu class='left-menu' default-active="1" background-color="#3a4c66" text-color="#fff" router>
      <el-menu-item index="home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="2">
      	<template slot="title">
          <i class="el-icon-document"></i>
          <span>数据列表</span>
        </template>
        <el-menu-item index="userList">用户列表</el-menu-item>
        <el-menu-item index="goodList">商品列表</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>添加数据</span>
        </template>
        <el-menu-item index="addGoods">添加商品</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>图表</span>
        </template>
        <el-menu-item index="shopTable">商品分布</el-menu-item>
      </el-submenu>
    
     <!--  <el-menu-item index="3">
        <i class="el-icon-plus"></i>
        <span slot="title">添加数据</span>
      </el-menu-item> -->

    
      <el-menu-item index="textEdit">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">文本编辑</span>
      </el-menu-item>
      <el-menu-item index="setting">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>
<style lang='scss' scope>


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
