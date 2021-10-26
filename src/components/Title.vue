<template>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">
      <p style="font-size: 20px;width: 100%">{{title}}</p>
    </van-col>
    <van-col span="1"/>
  </van-row>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Title",
  props:{
    title:String
  }
})
</script>

<style scoped>

</style>
