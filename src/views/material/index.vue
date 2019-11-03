<template>
  <!-- <div slot="header">
    <
  </div>-->
  <div>
    <el-card class="box-card">
      <div slot="header">
        <crumbs>素材管理</crumbs>
      </div>
      <div>
        <el-radio-group v-model="from.collect" @change="toggle">
          <el-radio-button label="false" size="small">全部</el-radio-button>
          <el-radio-button label="true" size="small">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" plain style="float:right;" @click="append">添加素材</el-button>
      </div>
      <!-- cover -->
      <!-- 封面图片 -->
      <div class="img-list">
        <div class="cover" v-for="item in listImg" :key="item.id">
          <img :src="item.url" />
          <div class="footer">
            <span
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
              @click="toggle_collect(item)"
            ></span>
            <span class="el-icon-delete" @click="delImg(item.id)"></span>
          </div>
        </div>
      </div>
      <div class="paging">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total_count"
          @current-change="paging"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog title="上传图片" :visible.sync="dialogVisible" width="300px" :before-close="handleClose">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="headers"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local.js'
export default {
  data () {
    return {
      from: {
        collect: false,
        // 请求的页数
        page: 1,
        // 每次请求的图片数量
        per_page: 10
      },
      listImg: [],
      // 总页数
      total_count: 0,
      dialogVisible: false,
      imageUrl: null,
      // 设置请求头
      headers: { Authorization: `Bearer ${local.getLocal().token}` }
    }
  },
  methods: {
    // 请求获取用户图片素材
    async imagesList () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.from })
      this.listImg = data.results
      this.total_count = data.total_count
    },
    // 注册点击事件用来改变 收藏还是 全部
    toggle (toggle) {
      // 赋值给
      this.from.collect = toggle
      // console.log(toggle)
      this.imagesList()
    },
    /**
     * 参数是否收藏   还有id
     */
    // 遇到的问题 点击收藏以后请求发送成功但是颜色不会变
    // 原因  在item传过来的数据中  是否收藏的名称为is_collected   但是在data数据中的是 collected  名称不对导致的问题
    async toggle_collect (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    // 分页
    paging (page) {
      this.from.page = page
      this.imagesList()
    },
    // 删除素材的实现
    delImg (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`, {
          params: { target: id }
        })
        this.$message.success('删除成功')
        this.imagesList()
      })
    },
    // 添加素材
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 上传
    handleSuccess (res) {
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
      }, 2000)
      this.imagesList()
    },
    // 点击添加素材
    append () {
      this.dialogVisible = true
      this.imageUrl = null
    }
  },
  created () {
    this.imagesList()
  }
}
</script>

<style lang="less" scoped>
.img-list {
  margin-top: 20px;

  .cover {
    width: 200px;
    height: 220px;
    position: relative;
    display: inline-block;
    margin-right: 60px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      width: 100%;
      height: 30px;
      background: rgba(0, 0, 0, 0.3);
      line-height: 30px;
      text-align: center;
      color: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      span {
        margin: 0 30px;
        &.red {
          color: red;
        }
      }
    }
  }
  .paging {
    padding: 50px;
    text-align: center;
    margin: 0 auto;
  }
  .butt {
    height: 60px;
    margin: 10px;
    line-height: 20px;
  }
}
</style>
