<template>
  <div class="login-container">
    <div class="left">
      <div class="logo">
        <img width="100%" src="../../assets/logo.png" alt="">
        <div class="name">陀螺加速器</div> 
        <div class="sys">后台管理系统</div>
      </div>
    </div>
    <div class="right">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
        class="card-box login-form">

        <el-form-item prop="username">
          <label for="">用户名</label>
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入您的手机号" />
        </el-form-item>
        <el-form-item prop="password">
          <label for="">密码</label>
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
            placeholder="请输入您的密码"></el-input>
            <span class="show-pwd" @click="showPwd"><i class="el-icon-view"></i></span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login_btn" :loading="loading" @click.native.prevent="handleLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div> 
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'


export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // this.$router.push({ path: '/' });
          this.$store.dispatch('Login', this.loginForm).then(
            (resData) => {
              //console.log(resData);
              if(resData && resData.status == 'ok'){
                this.$router.push({ path: '/' });
              }else{
                this.$message.error(resData.message);
              }
              this.loading = false;
            }
          ).catch(() => {
            this.loading = false;
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    .left{
      background: #fff;
      width: 35%;
      height: 100%;
      float: left;
      text-align: center;
      .logo{
        width: 160px;
        margin: 140px auto 0 auto;
        img{
          margin: 0 0 60px 0;
        }
        .name{
          text-align: left;
          font-size: 22px;
        }
        .sys{
          font-size: 26px;
          text-align: left;
          font-weight: 700;
        }
      }
    }
    .right{
      float: left;
      width: 65%;
      height: 100%;
      position: relative;
      background: url('../../assets/logbg.jpg') no-repeat;
    }
    input:-webkit-autofill {
      // -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
      animation: setbackgroundcolor;
      animation-fill-mode: forwards;
    }

    @keyframes setbackgroundcolor {
      to {
          background: transparent;
      }
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 0;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 100%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      &:not(:last-child){
        border-bottom: 1px solid #fff;
        // background: rgba(0, 0, 0, 0.1);
        color: #454545;
        text-align: left;
        label{
          color:#fff;
        }
      }
      .login_btn{
        font-size: 16px;
        width: 100%;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 45px;
      font-size: 16px;
      color: #eee;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
