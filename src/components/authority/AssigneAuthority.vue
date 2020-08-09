<template>
  <div>
    <el-button @click="getCheckedNodes">确认</el-button>
    <el-tree
      :data="authorityList"
      :props="{label: 'authority', children: 'children'}"
      node-key="id"
      default-expand-all
      ref="tree"
      :default-checked-keys="checkedAuthorityIds"
      show-checkbox>
    </el-tree>
  </div>
</template>

<script>
  export default {
    name: 'AssigneAuthority',

    data() {
      return {
        authorityList: [],
        checkedKeys: [],
        checkedAuthorityIds: []
      }
    },

    props: ['roleId'],

    mounted() {
      this.getAllAuthority()
      //console.log(this.roleId)
      this.getCheckedAuthorityIds()
    },

    methods: {
      async getAllAuthority() {
        const authorityList = await this.$http.Get('authority/list', { pid: 0 })
        this.authorityList = authorityList
        //console.log(this.authorityList)
      },

      async getCheckedAuthorityIds() {
        const checkedAuthorityIds = await this.$http.Get('authority/getByRoleId', { id: this.roleId })
        this.checkedAuthorityIds = checkedAuthorityIds
        console.log(this.checkedAuthorityIds)
      },

      getCheckedNodes() {
        this.checkedKeys = []
        var checkedNodes = []
        checkedNodes = this.$refs.tree.getCheckedNodes(false, true)
        checkedNodes.forEach(value => {
          this.checkedKeys.push(value.id)
        })
      }
    }

  }
</script>

<style scoped>

</style>
