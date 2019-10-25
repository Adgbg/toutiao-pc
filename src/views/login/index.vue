<template>
  <div class="bgc">
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form ref="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.verification"
            placeholder="验证码"
            style="width:65%; margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true" aria-checked>备选项</el-checkbox>
          <el-button type="primary" style="width: 100%;">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        verification: ''
      }
    }
  }
}
</script>

<style lang="less">
.bgc {
  width: 100%;
  height: 100%;
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  position: absolute;
  top: 0;
  left: 0;
  .el-card {
    width: 400px;
    height: 350px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    img {
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
