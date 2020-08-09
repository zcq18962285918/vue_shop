<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入用户名" style="width: 30%" v-model="pageInfo.username" class="input-with-select"
                  clearable @clear="getUsers(1)">
          <el-button slot="append" icon="el-icon-search" @click="getUsers(1)"></el-button>
        </el-input>
        <el-button type="primary" @click="addDialogForm">添加用户</el-button>
      </div>
      <el-table
        :data="users"
        border>
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="department.departmentName"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
          <template slot-scope="scope">
            {{1 === scope.row.sex ? '男' : '女'}}
          </template>
        </el-table-column>

        <el-table-column
          prop="valid"
          label="有效">
          <template slot-scope="scope">
            <!-- 这里使用了dateFormat全局时间格式化过滤函数 -->
            {{154646546465 | dateFormat}}
            <el-switch
              v-model="scope.row.valid"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="changeVaild(scope.row)">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column
          width="200px"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="updateUser(scope.row)" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del()"></el-button>
            <el-tooltip class="item" effect="dark" content="权限分配" placement="top">
              <el-button type="warning" icon="el-icon-s-tools" size="mini" :enterable="true"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="changeSize"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pageInfo.pagesize"
        :pager-count="5"
        :current-page.sync="pageInfo.page"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="getUsers"
        :total="pageInfo.total">
      </el-pagination>

    </el-card>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <AddUser @closeDialog="closeDialog" :id="id"></AddUser>
    </el-dialog>
  </div>
</template>

<script>

  import AddUser from './AddUser'

  export default {
    name: 'Users',
    components: { AddUser },
    data() {
      return {
        users: [],
        dialogFormVisible: false,
        pageInfo: {
          username: '',
          page: 1,
          pagesize: 1,
          total: 0
        },
        id: '',
        title: '添加用户'
      }
    },

    created() {
      this.getUsers()
    },

    // 子组件挂载
    comments: {
      AddUser
    },

    // render函数
    // render: function (createElement) {
    //   return createElement('h1', '142424')
    // },

    methods: {
      async getUsers(page) {
        //
        if (typeof page !== 'undefined') {
          this.pageInfo.page = page
        }
        try {
          const userList = await this.$http.Get('user/list', { params: this.pageInfo })
          this.users = userList.list
          this.pageInfo.total = userList.total
        } catch (e) {
          this.$message('用户查询失败')
        }


      },

      changeSize(size) {
        //console.log(size)
        this.pageInfo.pagesize = size
        this.getUsers()
      },

      closeDialog() {
        this.dialogFormVisible = false
        this.getUsers()
      },

      addDialogForm() {
        this.id = ''
        this.dialogFormVisible = true
        this.title = '添加用户'
      },

      updateUser(user) {
        //this.$http.get()
        this.title = '修改用户'
        // 打开dialog
        this.dialogFormVisible = true
        this.id = user.id
      },

      changeVaild(userinfo) {
        //console.log(userinfo)
        this.$http.post('/user/modify', userinfo)
      },

      del() {
        this.$confirm('是否确认删除？', '确认删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已删除'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-card {
    margin-top: 30px;
    box-shadow: 10px 10px 5px #888888;
  }

  .el-button {
    margin-left: 20px;
  }
</style>
