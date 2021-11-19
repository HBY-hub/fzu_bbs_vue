<template>
  <router-link style="width: 100%" :to="'/passage/'+passage.id">
    <van-row>
      <van-col span="1"/>
      <van-col span="4">
        <UserImage v-if="user" :user="user"/>
      </van-col>
      <van-col span="1"/>
      <van-col span="12">
        <div style="color:orange">
          {{passage.title}}
        </div>
      </van-col>
      <van-col span="5">
        {{time}}
      </van-col>
      <van-col span="1"/>
    </van-row>
    <van-row >
      <van-col span="1"/>
      <van-col span="22">
        <p>{{passage.description}}</p>
      </van-col>
      <van-col span="1"/>
    </van-row>
    <van-row>
      <van-col span="1"/>
      <van-col v-for="image in imageList" :key=image span="7">
        <van-image :src="image.url" />
      </van-col>
      <van-col span="2"/>
    </van-row>

    <van-divider />
  </router-link>
</template>

<script>
import {defineComponent, ref} from "vue";
import UserImage from "@/components/UserImage";
import axios from "axios";
import dayjs from "dayjs";

export default defineComponent({
  name: "PassagePre",
  components: {UserImage},
  props:{
    passage: {
      type:Object
    }
  },
  setup(props){
    const imageList = ref([
      "https://img.yzcdn.cn/vant/ipad.jpeg",
      "https://img.yzcdn.cn/vant/ipad.jpeg",
      "https://img.yzcdn.cn/vant/ipad.jpeg"
    ])
    let user = ref();
    axios.get("/getUserByName",{params:{"username": props.passage.userName}}).then((res)=>{
      user.value = res.data;
      console.log(user.value)
    })
    axios.get("/images",{params:{"id":props.passage.id}}).then((res)=>{
      console.log("image")
      console.log(res.data.data)
      imageList.value = res.data.data;
    })
    let time
    if(dayjs(dayjs()).diff(dayjs(props.passage.createTime), 'seconds')<60){
      time=dayjs(dayjs()).diff(dayjs(props.passage.createTime), 'seconds')+"秒前"
    }else if(dayjs(dayjs()).diff(dayjs(props.passage.createTime), 'minutes')<60){
      time=dayjs(dayjs()).diff(dayjs(props.passage.createTime), 'minutes')+"分钟前"
    }else if(dayjs(dayjs()).diff(dayjs(props.passage.createTime), 'hours')<24){
      time=dayjs(dayjs()).diff(dayjs(props.passage.createTime), 'hours')+"小时前"
    }else{
      time=dayjs(dayjs()).diff(dayjs(props.passage.createTime), 'days')+"天前"
    }
    return{
      time,
      imageList,
      user
    }
  }

})
</script>

<style scoped>
.van-row{
  width: 100%;
}

</style>
