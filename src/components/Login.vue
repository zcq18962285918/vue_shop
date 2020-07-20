<template>
  <div class="login_container">
    <div class="login_box">

      <!-- logo -->
      <div class="login_logo">
        <img src="../assets/logo.png"/>
      </div>

      <!-- 登录form -->
      <el-form :model="dynamicValidateForm" ref="dynamicValidateFormRef" :rules="loginPwdRules">
        <el-form-item prop="username" :rules="[
      { required: true, message: '请输入用户名'}]">
          <el-input prefix-icon="el-icon-user-solid" v-model="dynamicValidateForm.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-suitcase" type="password" v-model="dynamicValidateForm.password"></el-input>
        </el-form-item>

        <el-form-item class="login_btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dynamicValidateForm: {
          username: 'admin',
          password: '123456'
        },
        loginPwdRules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm() {
        // 登录时前端验证 async
        this.$refs.dynamicValidateFormRef.validate(async v => {
          if (!v) {
            return;
          }
          // 发送请求 await
          const post = await this.$http.post('user/checkUser', this.dynamicValidateForm);
          //console.log(post);
          if (post.status !== 200) {
            this.$message.error('登录失败');
          } else {
            if (post.data !== "") {
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              window.sessionStorage.setItem("username", post.data.username);
              this.$router.push('/home')
            } else {
              this.$message.error(
                '用户名或密码错误，请重新登录！'
              )
            }
          }
        })
      },
      resetForm() {
        console.log(this.$refs);
        this.$refs.dynamicValidateFormRef.resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login_container {
    background-color: #2B4B6B;
    height: 100%;
  }

  .login_box {
    width: 480px;
    height: 380px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1%;
  }

  .login_logo {
    width: 130px;
    height: 130px;
    border: 1px solid #faad;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0 0 10px #888888;
    img {
      width: 100%;
      height: 100%;
      border: 1px solid #bddd;
      border-radius: 50%;
      background-color: #aaaf;
    }
  }

  form {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;

    /*
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);
    padding: 10px;
    */

    .login_btn {
      display: flex;
      justify-content: flex-end;
      /*float: right;*/

    }

  }
</style>
