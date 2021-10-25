<template>
  <van-tabbar fixed="true" route>
    <van-tabbar-item to="/index" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item to="/messages" icon="chat-o">消息</van-tabbar-item>
    <van-tabbar-item to="/my" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Bottom"
})
</script>

<style scoped>

</style>
