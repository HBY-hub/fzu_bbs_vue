<template>
  <van-row class="row">
    <van-col span="6">
      <van-image height="80px" src="https://img.yzcdn.cn/vant/ipad.jpeg"/>
    </van-col>
    <van-col span="18">
      <van-cell title="我是LZY" size="large" value="三分钟前" label="下面是我说的话" />
    </van-col>

  </van-row>

</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Message"
})
</script>

<style scoped>
.row{
  height: 80px;
}

</style>
