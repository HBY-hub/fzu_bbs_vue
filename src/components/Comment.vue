<template>
  <UserInfo :user="user"/>
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
    axios.get("getUserByName",{params:{"username":props.comment.userName}}).then((res)=>
       user.value = res.data
    )
    return {
      user
    }

  }
})
</script>

<style scoped>

</style>
