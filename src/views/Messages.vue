<template>
  <van-nav-bar title="消息  " />
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
  >
    <div v-for="item in list" :key="item">
      <router-link :to="'/chat/'+item.userId">
        <message :message=item />
      </router-link>
    </div>

  </van-list>
  <Bottom/>
</template>
<script>
import {defineComponent} from "vue";
import Message from "@/components/Message";
import { ref } from 'vue';
import {useStore} from "vuex";
import Bottom from "@/components/Bottom";
import axios from "axios";

export default defineComponent({
  name: "Messages",
  components:{
    Bottom,
    Message
  },
  setup(){
    const store = useStore()
    // const list = store.state.chatList;
    const loading = ref(false);
    const finished = ref(true);
    let list = ref();
    axios.get("getAllMessageRecord",{params:{id:store.state.user.id}}).then((res)=>{
      console.log(res.data.data)
      let messages = res.data.data
      let showList = []
      messages.forEach((message)=>{
        let iid = undefined
        if(message.toUserId===store.state.user.id){
          iid = message.fromUserId
        }else{
          iid = message.toUserId
        }
        let mes = showList.find((item)=>item.userId===iid)
        if(mes===undefined) {
          //append
          showList = [{userId: iid, message: message.message,time:message.createTime}, ...showList]
        }else{
          showList = showList.filter((item)=>item.userId!==iid)
          showList = [{userId: iid, message: message.message,time:message.createTime}, ...showList]
        }
      })


      list.value = showList
    })

    const onLoad = () => {

    };

    return {
      list,
      onLoad,
      loading,
      finished,
    };
  },
})
</script>
