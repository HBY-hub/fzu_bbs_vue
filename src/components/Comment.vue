<template>
  <UserInfo :user="user" :time="time"/>

  <van-row v-if="faMessage">
    <van-col span="1"/>
    <van-col span="22">
      <p>回复:{{faMessage}}</p>
    </van-col>
    <van-col span="1"/>
  </van-row>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">
      <p>{{comment.content}}</p>
    </van-col>
    <van-col span="1"/>
  </van-row>
</template>

<script>
import {defineComponent, ref} from "vue";
import UserInfo from "@/components/UserInfo";
import axios from "axios";
export default defineComponent({
  name: "Comment",
  components:{
    UserInfo
  },
  props:{
    comment:Object
  },
  setup(props){
    console.log("comment")
    console.log(props.comment.userName)
    let user = ref();
    let time = ref(props.comment.createTime);
    axios.get("getUserByName",{params:{"username":props.comment.userName}}).then((res)=>
       user.value = res.data
    )
    let faMessage = ref("")
    if(props.comment.father>0) {
      axios.get("getCommentById",{params:{"id":props.comment.father}}).then((res)=>{
        console.log(res.data.data)
        faMessage.value = res.data.data.content
        console.log(faMessage.value)
      })
    }
    return {
      time,
      faMessage,
      user
    }

  }
})
</script>

<style scoped>

</style>
