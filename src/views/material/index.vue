<template>
  <!-- <div slot="header">
    <
  </div>-->
  <el-card class="box-card">
    <div slot="header">
      <crumbs>素材管理</crumbs>
    </div>
    <div>
      <el-radio-group v-model="radio1">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio1: '上海',
      radio2: '上海'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
