<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">

      <el-button @click="dialog = true">添加权限:</el-button>

      <treeTable
        :data="authorityList"
        :columns="columnConfig">
      </treeTable>
    </el-card>

    <el-dialog
      title="添加权限:"
      :visible.sync="dialog"
      width="30%">

      <el-form v-model="authorityForm">

        <el-input v-model="authorityForm.authority" placeholder="请输入内容"></el-input>

        <div class="block">
          <!-- 这里必须要数组，但是在例外一个地方需要把这个数组改成字符串，这样相互冲突报错，
          此时就需要用到loadsh的cloneDeep来深拷贝一个value,这里官方建议使用_来取别名，见script -->
          <el-cascader
            v-model="value"
            :options="authorityList"
            clearable
            :props="{ expandTrigger: 'hover', value: 'id', label: 'authority', children: 'children'}"
          ></el-cascader>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="addAuthority()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

  // import _ from 'lodash'

  export default {
    name: 'Authority',

    data() {
      return {
        authorityList: [],
        columnConfig: [
          {
            label: '权限名称',
            prop: 'authority'
          }
        ],

        dialog: false,
        value: [],

        authorityForm: {
          authority: '',
          pid: 0
        }
      }
    },

    mounted() {
      this.listAuthority()
    },

    methods: {
      async listAuthority() {
        const listAuthot = await this.$http.Get('authority/list', { pid: 0 })
        this.authorityList = listAuthot
        //console.log(this.authorityList)
      },

      async addAuthority() {
        if (this.value.length > 0) {
          this.authorityForm.pid = this.value[this.value.length - 1]
        }
        console.log(this.authorityForm)
        await this.$http.Post('authority/add', this.authorityForm)
        this.dialog = false
        this.value = []
        this.authorityForm.authority = ''
        this.authorityForm.pid = 0
        this.listAuthority()
      }
    }
  }
</script>

<style scoped>

</style>
