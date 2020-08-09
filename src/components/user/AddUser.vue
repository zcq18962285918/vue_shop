<template>
  <el-form :model="user" :rules="rules" ref="userFrom" label-position="right">
    <el-form-item prop="username" label="用户名：">
      <el-input
        placeholder="请输入用户名"
        v-model="user.username">
      </el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码：">

      <el-input
        placeholder="请输入密码"
        v-model="user.password">
      </el-input>
    </el-form-item>
    <el-form-item prop="sex" label="性别：">

      <el-radio v-model="user.sex" :label="1">男</el-radio>
      <el-radio v-model="user.sex" :label="0">女</el-radio>
    </el-form-item>

    <el-form-item prop="department" label="部门：">
      <el-select v-model="user.departmentId" placeholder="请选择部门" :value="user.departmentId">
        <el-option
          v-for="item in depar"
          :key="item.id"
          :label="item.departmentName"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="valid" label="有效性：">

      <el-select v-model="user.valid" placeholder="请选择" :value="user.valid">
        <el-option
          v-for="item in valids"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="login_btn" align="center">
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  export default {
    name: 'AddUser',
    data() {

      var checkEmail = (rule, value, cb) => {
        var regEmail = /^(\w+((-\w+)|(\.\w+))*)\+\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$ /
        if (regEmail.test(value)) {
          return cb()
        }
        cb(new Error('请输入正确的邮箱格式'))
      }

      var checkPassword = (rule, value, cb) => {
        if (!value) {
          return cb(new Error('密码不能为空'))
        }
        cb()
      }

      return {

        rules: {
          password: [
            {
              validator: checkPassword, trigger: 'blur'
            },
            {
              min: 3, max: 10, message: '密码长度在3位到10位之间', trigger: 'blur'
            }
          ]
        },

        user: {
          username: '',
          password: '',
          sex: 1,
          departmentId: '',
          valid: 1
        },
        valids: [{
          value: 1,
          label: '有效'
        },
          {
            value: 0,
            label: '禁用'
          }],
        depar: []
      }
    },

    /**
     * 接受父元素传过来的值
     */
    props: ['id'],

    mounted() {
      //console.log(this.id)
      if (this.id !== '') {
        this.getUser()
      }
      this.getDepartment()
    },


    methods: {
       submit() {
       this.$refs.userFrom.validate(async (valid) => {
          if (valid) {
            if (this.id !== '') {
              await this.$http.Post('user/modify', this.user)
              this.$message.success('修改成功')
            } else {
              await this.$http.Post('user/add', this.user)
              this.$message.success('添加成功')
            }
            // 调用父元素的方法（方法名，data[]）
            this.$emit('closeDialog')
          }else {
            this.$message.error('error submit')
            return false
          }
        })
      },

      async getUser() {
        const user = await this.$http.Get(`/user/get/${this.id}`)
        //console.log(user)
        this.user = user
      },

      async getDepartment() {
        const depar = await this.$http.Get('department/list')
        //console.log(depar)
        this.depar = depar
      }
    }
  }
</script>

<style lang="scss" scoped>

  .el-input {
    width: 80%;
  }

</style>
