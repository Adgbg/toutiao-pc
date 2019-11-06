<template>
  <div>
    <el-card>
      <div slot="header">
        <crumbs>个人设置</crumbs>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form label-width="120px" style="position: relative;">
              <el-form-item label="编号:">
                <span>{{id}}</span>
              </el-form-item>
              <el-form-item label="手机:">
                <span>{{mobile}}</span>
              </el-form-item>
              <el-form-item label="媒体名称:">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍:">
                <el-input :rows="3" type="textarea" v-model="form.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="preserve" type="primary">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div>
              <el-upload
                :show-file-list="false"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                class="avatar-uploader"
              >
                <img :src="photo" class="avatar" />
              </el-upload>
              <p style="  text-align: center">修改头像</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local.js'
export default {
  data () {
    return {
      form: {
        name: '',
        email: '',
        intro: ''
      },
      mobile: '',
      id: '',

      photo: '',

      headers: { Authorization: `Bearer ${local.getLocal().token}` }
    }
  },
  methods: {
    // 获取用户信息
    async getUser () {
      const {
        data: {
          data: { id, mobile, name, email, intro, photo }
        }
      } = await this.$http.get('/user/profile')
      //   console.log(data)
      this.id = id
      this.mobile = mobile
      this.form.name = name
      this.form.email = email
      this.form.intro = intro
      this.photo = photo
      console.log(photo)
    },
    handleSuccess (res) {
      this.photo = res.data.url
      this.$http.patch('user/photo', { photo: this.photo })
      this.$message.success('上传成功')
    },
    // 点击提交
    preserve () {
      this.$http.patch('user/profile', this.form)
      this.img()
    },
    // 上传头像 返回值只有id 存在异常
    async img () {
      await this.$http.patch('user/photo', { photo: this.photo })
      console.log(this.photo)
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style scoped lang="less">
.userimg {
  position: absolute;
  right: 20%;

  top: 10px;
}
</style>
