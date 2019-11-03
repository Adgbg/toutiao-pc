<template>
  <!-- 不可改变 -->
  <el-select :value="value" placeholder="请选择" clearable @change="fn">
    <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  // 父传子
  props: ['value'],
  data () {
    return {
      //   value: null,
      channel: []
    }
  },
  //   在初始化之后要拿到数据
  methods: {
    async getChannel_id () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channel = data.channels
      console.log(data)
    },
    // 频道改变函数  传参子传父
    fn (id) {
      if (id === '') id = null
      this.$emit('input', id)
    }
  },
  //   methods: {
  //     // 获取频道选项数据
  //     async getChannelOptions () {
  //       // 获取数据
  //       const {
  //         data: { data }
  //       } = await this.$http.get('channels')
  //       // 赋值 channelOptions
  //       this.channel = data.channels
  //     }
  //   },
  created () {
    this.getChannel_id()
  }
}
</script>

<style>
</style>
