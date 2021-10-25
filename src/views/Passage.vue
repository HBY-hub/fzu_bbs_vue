<template>
  <Nav :title="passage.title"/>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">
      <p style="font-size: 20px;width: 100px">这是标题</p>
    </van-col>
    <van-col span="1"/>
  </van-row>
  <UserInfo/>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">
      正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文
    </van-col>
    <van-col span="1"/>
  </van-row>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">

    </van-col>
    <van-col span="1"/>
  </van-row>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">
      <van-image v-for="url in imageList" :key="url" :src="url"/>
    </van-col>
    <van-col span="1"/>
  </van-row>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">
      <p style="width: 100%;font-weight: bolder" >全部回复</p>
    </van-col>
    <van-col span="1"/>
  </van-row>
  <Comment v-for="comment in comments" :comment="comment" :key="comment.id"/>

</template>

<script>
import {defineComponent, ref, watch} from "vue";
import UserInfo from "@/components/UserInfo";
import {useRoute} from "vue-router";
import Nav from "@/components/Nav";
import axios from "axios";
import Comment from "@/components/Comment";
export default defineComponent({
  name: "Passage",
  components: {Comment, Nav, UserInfo},
  setup(){
    const $route = useRoute()
    const id= $route.params.id;
    console.log(id)
    const imageList = ref(['https://img.yzcdn.cn/vant/ipad.jpeg'])
    const comments = ref([{id:1},{id:2}])
    let passage = ref()
    let user = ref()
    axios.get("getPassageById",{params:{"id":id}}).then((res)=>{
      passage.value = res.data.data
    })
    axios.get("getCommentByPassageId",{params:{"id":id}}).then((res)=>{
      comments.value = res.data
    })

    watch(passage,(newpassage,oldpassage)=>{
      console.log("change")
      console.log(oldpassage)
      axios.get("getUserByName",{params:{"username":newpassage.user}}).then((res)=>{
        user.value = res.data
      })
    })
    return{
      imageList,
      comments,
      passage
    }

  },
})
</script>

<style scoped>

</style>
