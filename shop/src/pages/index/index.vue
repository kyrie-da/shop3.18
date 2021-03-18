<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <!-- router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu
          default-active="/"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 遍历菜单 -->
          <template v-for="item in user.menus">
            <!-- 遍历目录  判断是否有children  -->
            <el-submenu :index="item.title" :key="item.id" v-if="item.children">
              <template slot="title">
                <i class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="i in item.children" :key="i.id" :index="'/'+i.url">{{i.title}}</el-menu-item>
            </el-submenu>
            <!-- 没有children  遍历菜单  -->
            <el-menu-item v-else :key="item.id" :index="'/'+item.url">{{item.title}}</el-menu-item>
          </template>

          <!-- <el-submenu index="2">
            <template slot="title">
              <nav></nav>
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manager">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-shopping-bag-2"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/classify">商品分类</el-menu-item>
              <el-menu-item index="/spec">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/vip">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="admin">
            <span>{{user.username}}</span>
            <el-button type="primary" @click="logout">退出</el-button>
            <i class="el-icon-setting"></i>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    ...mapActions({
      reqUser: "userActions",
    }),

    logout() {
      // 清空用户信息
      this.reqUser(null), this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.el-aside {
  background-color: #545c64;
  height: 100vh;
}
.el-header {
  background: #b3c0d1;
  height: 100px;
  position: relative;
}
.admin {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>