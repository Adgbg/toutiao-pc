<template>
  <div class="box-max">
    <div @click="open" class="box_but">
      <img :src="value||src" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px
    ">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="素材库" name="first">
          <el-radio-group @change="toggle" v-model="from.collect">
            <el-radio-button label="false" size="small">全部</el-radio-button>
            <el-radio-button label="true" size="small">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <div
              :class="{selected:selectedImageUrl===item.url}"
              :key="item.id"
              @click="selectedImage(item.url)"
              class="cover"
              v-for="item in listImg"
            >
              <img :src="item.url" />
              <div class="selected"></div>
            </div>
          </div>
          <div class="paging">
            <el-pagination
              :current-page="from.page"
              :page-size="from.per_page"
              :total="total_count"
              @current-change="paging"
              background
              layout="prev, pager, next"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <el-upload
            :headers="headers"
            :on-success="handleSuccess"
            :show-file-list="false"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            class="avatar-uploader"
            name="image"
          >
            <img :src="imageUrl" class="avatar" v-if="imageUrl" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="confirmImage" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local.js'
import src from '../assets/default.png'
export default {
  name: 'my-imges',
  // 父传子传过来的src
  props: ['value'],
  data () {
    return {
      from: {
        collect: false,
        page: 1,
        // 每次请求的图片数量
        per_page: 8
      },
      dialogVisible: false,
      activeName: 'first',
      listImg: [],
      total_count: 0,
      // 上传的图片
      imageUrl: '',
      src,
      // 列表的渲染路径
      selectedImageUrl: '',
      // 设置请求头
      headers: { Authorization: `Bearer ${local.getLocal().token}` }
    }
  },
  methods: {
    // 注册点击事件点击   弹出对话框
    open () {
      this.dialogVisible = true
    },
    async imagesList () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.from })
      this.listImg = data.results
      this.total_count = data.total_count
    },
    paging (page) {
      this.from.page = page
      this.imagesList()
    },
    toggle (toggle) {
      // 赋值给
      this.from.collect = toggle
      // console.log(toggle)
      this.imagesList()
    },
    // 上传
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
    },
    // 选中
    selectedImage (src) {
      this.selectedImageUrl = src
    },
    // 上传成功后点确定在开始显示
    confirmImage () {
      console.log(this.activeName)
      if (this.activeName === 'first') {
        if (this.selectedImageUrl === '') {
          return this.$message.warning('请选择一张图')
        }
        // this.src = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
        this.dialogVisible = false
      } else {
        if (this.imageUrl === '') {
          return this.$message.warning('请上传一张图')
        }
        // this.src = this.imageUrl
        this.$emit('input', this.imageUrl)
        this.dialogVisible = false
      }
    }
  },
  created () {
    this.imagesList()
  }
}
</script>

<style scoped  lang="less">
.box-max {
  display: inline-block;
  margin-right: 20px;
}
.box_but {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  img {
    width: 100%;
    height: 100%;
  }
}
.img-list {
  margin-top: 20px;
  .cover {
    width: 150px;
    height: 150px;
    position: relative;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected::after {
      content: '';
      width: 100%;
      display: block;
      height: 150px;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center/50px;
    }
  }
}
</style>
