<template>
  <div class="bgc">
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="form" :rules="rules" status-icon ref="ruleForm">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" placeholder="验证码" style="width:65%; margin-right:10px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- <el-checkbox  :value="true">备选项</el-checkbox> -->
          <el-checkbox v-model="checkedValue">备选项</el-checkbox>
          <el-button
            @click="Matchesform"
            type="primary"
            style="width: 100%;"
            :disabled="!checkedValue"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入local 使用setlocal 存储
import local from '@/utils/local'
export default {
  data () {
    const nameAge = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('你输入的手机格式不正确'))
      }
    }
    return {
      form: {
        mobile: '13911111111',
        code: '246810'
      },
      checkedValue: '',
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: nameAge, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    Matchesform () {
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          //
          // this.$http
          //   .post('authorizations', this.form)
          //   .then(res => {
          //     // 将返回的数据中的token传给local
          //     local.setLocal(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     // 失败 提示
          //     this.$message.error('手机号或验证码错误')
          //   })
          try {
            const {
              data: { data }
            } = await this.$http.post('authorizations', this.form)
            local.setLocal(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
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
