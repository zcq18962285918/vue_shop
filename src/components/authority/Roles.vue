<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-table :data="roles">

        <el-table-column type="expand">
          <template slot-scope="scope">
            <pre>
              {{scope.row.children}}
            </pre>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色id" prop="id"></el-table-column>
        <el-table-column label="角色名称" prop="role"></el-table-column>

        <el-table-column label="操作" width="400px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="updateRole(scope.row.id)">修改</el-button>
            <el-button type="danger" size="mini">删除</el-button>
            <el-button type="warning" size="mini" @click="assigneAuthority(scope.row.id)">编辑权限</el-button>
          </template>

        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="修改权限"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="30%">
      <AssigneAuthority :role-id="roleId"></AssigneAuthority>

    </el-dialog>

  </div>
</template>

<script>

  import AssigneAuthority from './AssigneAuthority'

  export default {
    name: 'Roles',
    components: { AssigneAuthority },
    data() {
      return {
        roles: [],
        dialogVisible: false,
        roleId: ''
      }
    },

    mounted() {
      this.getRoles()
    },

    methods: {
      async getRoles() {
        const res = await this.$http.Get('roles/roles')
        this.roles = res
        //console.log(this.roles)
      },

      updateRole(id) {
        console.log(id)
      },

      assigneAuthority(roleId) {
        this.roleId = roleId
        this.dialogVisible = true
      }
    }
  }
</script>

<style scoped>

</style>
