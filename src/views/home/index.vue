<template>
  <el-container class="home-container">
    <el-aside :width="isFold?'200px':'64px'">
      <div class="homeLogo" :class="{toggleLogo:!isFold}"></div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border: none;"
        :collapse="!isFold"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/material">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish-article">
          <i class="el-icon-position"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-line-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/user">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold fold" @click="toggleMenu"></span>
        <span class="headline" v-pre>江苏传智播客科技教育有限公司</span>
        <el-dropdown :hide-on-click="false" class="pulldown" @command="handleCommand">
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            <span class="useName">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="personal">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Local from '@/utils/local'

export default {
  data () {
    return {
      isFold: true,
      name: '',
      photo: ''
    }
  },
  methods: {
    toggleMenu () {
      this.isFold = !this.isFold
    },
    handleCommand (command) {
      this[command]()
    },
    // 退出
    loginOut () {
      Local.delLocal()
      this.$router.push('/login')
    },
    // 个人设置
    personal () {
      // this.$router.push('/user')
      console.log(this.$route.hash)
    }
  },
  created () {
    const user = Local.getLocal() || {}
    this.name = user.name
    this.photo = user.photo
  }
}
</script>

<style sc lang="less">
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
  }
  .homeLogo {
    width: 100%;
    height: 60px;
    background: #002044 url(../../assets/logo_admin.png) no-repeat center/ 100px
      auto;
  }
  .toggleLogo {
    background-image: url(../../assets/logo_admin_01.png);
    background-size: 36px auto;
  }
  .el-header {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
  }
  .fold {
    margin-right: 10px;
    font-size: 30px;
    vertical-align: middle;
  }
  .headline {
    vertical-align: middle;
    font-size: 18px;
    font-weight: 400;
  }
  .pulldown {
    float: right;
    img {
      width: 30px;
      height: 30px;
      margin-right: 5px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .useName {
      font-size: 15px;
      vertical-align: middle;
    }
  }
}
</style>
