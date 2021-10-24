<template>
  <van-row class="row">
    <van-col span="6">
      <van-image height="80px" :src="message.img"/>
    </van-col>
    <van-col span="18">
      <van-cell :title="message.username" size="large" value="三分钟前" :label="message.message" />
    </van-col>

  </van-row>

</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Message",
  props:{
    message:{
      type: Object
    }
  },
  setup(){
    console.log("1111111111")

  }
})
</script>

<style scoped>
.row{
  height: 80px;
}

</style>
