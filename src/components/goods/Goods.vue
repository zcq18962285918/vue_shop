<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table
        :data="product"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="subTitle"
          label="商品标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="originalPrice"
          label="商品原价"
          width="180">
        </el-table-column>
        <el-table-column
          prop="promotePrice"
          label="商品特价"
          width="180">
        </el-table-column>
        <el-table-column
          prop="stock"
          label="商品库存"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="180">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Goods',

    data() {
      return {
        product: []
      }
    },

    mounted() {
      this.listProducts()
    },

    methods: {
      async listProducts() {
        const product = await this.$http.get('product/list')
        this.product = product.data
      }
    }
  }
</script>

<style scoped>

</style>
