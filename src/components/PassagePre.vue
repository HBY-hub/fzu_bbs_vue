<template>
  -------------------------------------------------------------
  <router-link :to="'/passage/'+passage.id">
    <van-row>
      <van-col span="1"/>
      <van-col span="4">
        <UserImage v-if="user" :user="user"/>
      </van-col>
      <van-col span="1"/>
      <van-col span="13">
        <div style="color:orange">
          {{passage.title}}
        </div>
      </van-col>
      <van-col span="4">
        <van-tag plain type="primary">关注</van-tag>
        <van-tag type="primary">取消关注</van-tag>
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

      <van-col v-for="image in imageList" :key=image span="8">
        <van-image :src="image.url" />
      </van-col>
    </van-row>

  </router-link>
</template>

<script>
import {defineComponent, ref} from "vue";
import UserImage from "@/components/UserImage";
import axios from "axios";

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
    return{
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
