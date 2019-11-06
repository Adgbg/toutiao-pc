<template>
  <div>
    <el-card>
      <div slot="header">
        <crumbs>内容管理</crumbs>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- //使用频道组件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              @change="changeData"
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              v-model="dateArr"
              value-format="yyyy-MM-dd"
            >></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="filter" type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div class="clearfix" slot="header">
        <span>根据筛选条件共查询到{{amount}}条结果:</span>
      </div>
      <el-table :data="options" stripe style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width: 100px; height: 100px">
              <div class="image-slot" slot="error">
                <img alt height="100" src="../../assets/error.gif" width="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop>
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>

        <el-table-column label="操作" prop width="160">
          <template scope="scope">
            <el-button @click="redact(scope.row.id)" circle icon="el-icon-edit" type="primary"></el-button>
            <el-button @click="delTarget(scope.row.id)" circle icon="el-icon-delete" type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="amount"
        @current-change="pages"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: 2,
        begin_pubdate: null,
        end_pubdate: null,
        // 页数
        page: 1,
        // 每页请求的个数
        per_page: 20
      },
      channel: [],
      dateArr: [],
      // 总数
      amount: 0,
      options: []
    }
  },
  methods: {
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.options = data.results
      this.amount = data.total_count
    },
    pages (page) {
      // 将当前页数赋值给page
      this.reqParams.page = page
      this.getArticles()
    },
    // 获取频道id
    // async getChannel_id () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channel = data.channels
    // },
    // 筛选
    filter () {
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.reqParams.page = 1
      this.getArticles()
    },
    // 获取时间
    changeData (Data) {
      // 获取到的时间为一个数组格式
      if (Data) {
        this.reqParams.begin_pubdate = Data[0]
        this.reqParams.end_pubdate = Data[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 编辑
    redact (id) {
      this.$router.push({ path: '/publish', query: { id } })
      console.log(id)
    },
    // 删除
    delTarget (id) {
      /**
       * 问题在发送请求的时候  在发送请求成功之后  返回的找不到改文章
       * 原因:就是存在最大的安全数值的问题 过大的数值在计算或者转化json格式的时候会产生误差
       * 通过axios获取的数据，默认使用JSON.parse(后台给的json字符串)
       * 解决的方法 :json-bigint
       */
      this.$http.delete(`articles/${id}`)
      this.$message.error('删除成功')
      this.getArticles()
    }
  },
  created () {
    this.getArticles()
    // this.getChannel_id()
  }
}
</script>
<style>
</style>
