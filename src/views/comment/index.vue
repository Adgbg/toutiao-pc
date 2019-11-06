<template>
  <div>
    <el-card>
      <div slot="header">评论管理</div>
      <el-table :data="tableData">
        <el-table-column label="标题" prop="title" width="180"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count" width="180"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态" prop="address">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              size="small"
              type="danger"
              v-if="scope.row.comment_status"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" size="small" type="success" v-else>打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total"
        @current-change="pager"
        background
        layout="prev, pager, next"
        style="margin-top:20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: null
    }
  },
  methods: {
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('/articles', { params: this.reqParams })
      console.log(data)
      this.total = data.total_count
      this.tableData = data.results
    },
    pager (newPage) {
      // 修改当前的页码为新的页码
      this.reqParams.page = newPage
      // 重新获取数据
      this.getComments()
    },
    // 切换 评论状态  正常  关闭
    toggleStatus (row) {
      const text = row.comment_status
        ? '你确定关闭文章的评论功能吗?'
        : '你确定打开文章的评论功能吗?'
      this.$confirm(text, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { data }
          } = await this.$http.put(`comments/status?article_id=${row.id}`, {
            allow_comment: !row.comment_status
          })
          this.$message.success(row.comment_status ? '关闭成功' : '打开成功')
          row.comment_status = data.allow_comment
        })
        .catch(() => {})
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
