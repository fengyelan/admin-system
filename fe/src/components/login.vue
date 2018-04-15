<template>
  <div class="login-page">
    <transition name="form-fade">
      <div class="login-wrap">
        <div class="title">后台管理系统</div>
        <el-form :model="loginForm" label-width="100px" :rules="rules">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm()">重置</el-button>
            <el-button type="primary" @click="submitForm()">提交</el-button>
          </el-form-item>
        </el-form>
        <div class='tip'>温馨提示：</div>
        <div class='tip'>未登录过的新用户，自动注册</div>
        <div class='tip'>注册过的用户可凭账号密码登录</div>
      </div>
    </transition>
  </div>
</template>
<style scope lang='scss'>
.login-page {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #3a4c66;
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all .3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

.login-wrap {
  width: 350px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -175px;
  margin-top: -250px;
  .title {
    padding-bottom: 20px;
    text-align: center;
    color: #ffffff;
  }
  .tip {
    font-size: 12px;
    color: red;
    text-align: center;
  }
}

</style>
<script>
import {fetch,setStore} from '../common/util.js'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {

  },
  methods: {
    resetForm() {
      this.loginForm = {
        username: '',
        password: ''
      }
    },
    submitForm() {
      let that = this,
        username = that.loginForm.username,
        password = that.loginForm.password;
        fetch('saveUserInfo',{
          username: username,
          password: password
        },res => {
          that.$router.push({ path: '/' });
          setStore('adminUsername', username);
          setStore('adminPassword', password);
        });
    }
  }
}

</script>
