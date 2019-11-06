<template>
  <el-card>
    <div slot="header">
      <crumbs>内容管理</crumbs>
    </div>
    <el-form label-width="120px">
      <el-form-item label="标题:">
        <el-input style="width:400px;height: 40px;" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容:">
        <quill-editor :options="editorOption" v-model="form.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面:">
        <el-radio-group @change="form.cover.images=[]" v-model="form.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <div v-if="form.cover.type===1">
          <my-imges v-model="form.cover.images[0]"></my-imges>
        </div>
        <div v-if="form.cover.type===3">
          <my-imges :key="i" v-for="i in 3" v-model="form.cover.images[i-1]"></my-imges>
        </div>
      </el-form-item>
      <el-form-item label="频道:">
        <!-- <el-select v-model="form.cover.channel_id" placeholder="请选择" clearable>
            <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>-->
        <my-channel v-model="form.channel_id"></my-channel>
      </el-form-item>
      <el-form-item>
        <el-button @click="articleManager (false)">主要按钮</el-button>
        <el-button @click="articleManager(true)">默认按钮</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      form: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },

      editorOption: {
        // 清楚文本内容

        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        },
        placeholder: ''
      }
    }
  },
  methods: {
    // fn () {
    //   console.log(this.form.cover.channel_id)
    // },
    // 文章发表与草稿 **Query** 在url后面加？draft=true/false
    async articleManager (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.form)
      // 成功
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 请求指定文章
    async getAssign (id) {
      const {
        data: { data }
      } = await this.$http.get(`articles/${id}`)
      this.form = data
    }
  },
  watch: {
    '$route.query.id': function (Newvalue, value) {
      if (Newvalue) {
        this.getAssign(Newvalue)
      } else {
        this.form = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  created () {
    const id = this.$route.query.id
    if (id) {
      this.getAssign(id)
    }
  }
}
</script>

<style scoped lang="less">
</style>
