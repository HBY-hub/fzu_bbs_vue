<template>
  <van-row>
    <van-col span="1"/>
    <van-col span="4">
      <van-image round src="https://img.yzcdn.cn/vant/ipad.jpeg" width="50px"/>
    </van-col>
    <van-col span="10">
      <p style="font-size: 10px;margin: 6px 0 0 0;font-weight: bolder">我的名字</p>
      <p style="font-size: 10px;margin: 2px 0 0 0" >发帖日期</p>
    </van-col>
    <van-col span="11"/>
  </van-row>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "UserInfo"
})
</script>

<style scoped>

</style>
