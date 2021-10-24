<template>
  <van-tabbar route v-if="needbuttom">
    <van-tabbar-item to="/index" icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item to="/messages" icon="chat-o">标签</van-tabbar-item>
    <van-tabbar-item to="/my" icon="user-circle-o">标签</van-tabbar-item>
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
