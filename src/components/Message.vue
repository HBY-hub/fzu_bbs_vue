<template>
  <van-row class="row">
    <van-col span="6">
      <van-image v-if="img" height="80px" :src="img"/>
      <van-image v-else  height="80px" :src="require('../../src/assets/fzu.png')" />

    </van-col>
    <van-col span="18">
      <van-cell :title="username" size="large" :value=time :label="message.message" />
    </van-col>

  </van-row>

</template>

<script>
import {defineComponent, ref} from "vue";
import axios from "axios";
import dayjs from "dayjs";

export default defineComponent({
  name: "Message",
  props:{
    message:{
      type: Object
    }
  },
  setup(props){
    console.log("1111111111")
    let img=ref()
    let username  = ref()
    axios.get("/getUser",{params:{id:props.message.userId}}).then((res)=>{
      console.log("getUser")
      console.log(res)
      img.value = res.data.avatar
      username.value = res.data.userName
    })
    let time
    if(dayjs(dayjs()).diff(dayjs(props.message.time), 'seconds')<60){
      time=dayjs(dayjs()).diff(dayjs(props.message.time), 'seconds')+"秒前"
    }else if(dayjs(dayjs()).diff(dayjs(props.message.time), 'minutes')<60){
      time=dayjs(dayjs()).diff(dayjs(props.message.time), 'minutes')+"分钟前"
    }else if(dayjs(dayjs()).diff(dayjs(props.message.time), 'hours')<24){
      time=dayjs(dayjs()).diff(dayjs(props.message.time), 'hours')+"小时前"
    }else{
      time=dayjs(dayjs()).diff(dayjs(props.message.time), 'days')+"天前"
    }


    return {
      time,
      username,
      img
    }

  }
})
</script>

<style scoped>
.row{
  height: 80px;
}

</style>
