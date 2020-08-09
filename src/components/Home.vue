<template>
  <el-container style="height: 100%">
    <el-header style="height: 100px">
      <div>
        <img src="../assets/logo.png"/>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="warning" @click="login_out">退出登录</el-button>
    </el-header>
    <el-container class="home_container">
      <el-aside :width="!isCollapsed ? '200px' : '64px'">
        <el-button type="primary" @click="collapsee" :icon="icons"></el-button>
        <el-menu
          background-color="#313033e3"
          text-color="#fff"
          :collapse="isCollapsed"
          :collapse-transition="false"
          router
          :default-active="activeIndex"
          unique-opened
          active-text-color="#409EFF">
          <el-submenu v-for="item in menu" :index="item.id + ''" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item v-for="children in item.children" :index="'/' + children.path" :key="children.id" @click="getActiveIndex('/'+children.path)">
              <template slot="title">
                <i :class="children.icon"></i>
                <span>{{children.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {

    data() {
      return {
        menu: [],
        isCollapsed: false,
        icons: 'el-icon-d-arrow-left',
        activeIndex: ''
      }
    },

    created() {
      this.list_menu()
      this.activeIndex = window.sessionStorage.getItem('activeIndex')
    },

    methods: {
      login_out() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },

      collapsee() {
        this.isCollapsed = !this.isCollapsed
        this.icons = this.isCollapsed ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
      },

      async list_menu() {
        const listMenu = await this.$http.Get('menu/listMenu')
        this.menu = listMenu
        //console.log(this.menu)
      },

      getActiveIndex(activeIndex) {
        window.sessionStorage.setItem('activeIndex', activeIndex)
        //console.log(activeIndex)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .el-header {
    background-color: #606366;
    color: white;
    font-size: 30px;
    display: flex;
    padding: 0;

    img {
      width: 100px;
      border-radius: 20%;
    }

    div {
      display: flex;
      align-items: center;
    }

    justify-content: space-between;
    align-items: center;
  }

  .el-aside {
    background-color: #313033e3;
    .el-menu {
      border-right: none;
    }
    .el-button {
      width: 100%;
    }
  }

  .el-main {
    background-color: whitesmoke;
  }
</style>
