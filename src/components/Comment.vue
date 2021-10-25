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
import axios from "axios";
export default defineComponent({
  name: "Comment",
  props:{
    comment:Object
  },
  setup(props){
    console.log(props)
    let user = ref();
    axios.get("/getUserByName",{params:{"username":props.comment.user_name}}).then((res)=>
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
