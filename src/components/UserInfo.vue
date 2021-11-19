<template>
  <van-row v-if="user">
    <van-col span="1"/>
    <van-col span="4">
      <router-link :to="'/chat/'+user.id">
        <van-image v-if="user.avatar" round :src="user.avatar" width="50px"/>
        <van-image v-else width="100%" height="100%" :src="require('../../src/assets/fzu.png')" />
      </router-link>
    </van-col>
    <van-col span="10">
      <p style="font-size: 10px;margin: 6px 0 0 0;font-weight: bolder">{{user.userName}}</p>
      <p style="font-size: 10px;margin: 2px 0 0 0" >{{showTime}}</p>
    </van-col>
    <van-col span="11"/>
  </van-row>
</template>

<script>
import {defineComponent, ref} from "vue";
var dayjs = require('dayjs');
export default defineComponent({
  name: "UserInfo",
  props: {
    user: Object,
    time: Object
  },
  setup(props){
    const showTime = ref(dayjs(props.time).format("MM-DD HH:mm"))
    return{
      showTime
    }
  }
})
</script>

<style scoped>
.van-row{
  width: 100%;
}
.a{
  width: 100%;
}
</style>
