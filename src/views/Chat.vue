<template>
  <div v-if="toUser">
    <div id="chatHistory" style="overflow:auto;" :style="{height: scrollerHeight}">
      <van-row v-for="(item, index) in records" :key="index" type="flex" justify="center" style="margin-top: 6%; ">
        <van-col  class="van-col-width"  v-if="item.fromUserId==toUser.id">
          <van-image style="float: left" width="50" height="50" :src="toUser.avatar"/>
          <van-cell  class="content msgContent left" center :value="item.message" />
        </van-col>

        <van-col class="van-col-width" v-else>
          <van-image style="float: right" width="50" height="50" :src="me.avatar"/>
          <van-cell  class="content msgContent right" center :value="item.message"/>
        </van-col>

      </van-row>
    </div>

    <van-field v-model="message" style="position: fixed; bottom: 0;  background-color: #f7f8fa " center clearable id="talksub">
      <template #button>
        <van-button size="small" type="primary" @click="sendMsg">发送</van-button>
      </template>
    </van-field>

  </div>
</template>
<script>
import {defineComponent, ref, toRaw, unref} from "vue";
import axios from "axios";
import {useStore} from "vuex";

export default defineComponent({
  name: "Chat",
  setup(){
    const store = useStore();
    const to = window.location.pathname.split("/")[2]
    let toUser = ref()
    axios.get("/getUser",{params:{"id":to}}).then((res)=>{
      toUser.value = res.data
    })
    let me = store.state.user


    let records = ref([])
    axios.get("getMessageRecord",{params:{"fromUserId":to,"toUserId":toRaw(store.state.user).id}}).then((res)=>{
      records.value = res.data.data
      console.log("toraw")
    })
    console.log(records)

    console.log(to)
    const socket = new WebSocket("ws://localhost:8010/chat/"+toRaw(store.state.user).id)
    socket.onopen = ()=>{
      console.log("opennnnnnnnnnn")
    }
    socket.onclose = ()=>{
      console.log("closssssssssssssssse")
    }
    socket.onmessage = (content)=>{
      const message = JSON.parse(content.data).message
      console.log(message)

    }
    const sendMsg=()=>{
      console.log(...toRaw(unref(records)))
      console.log(toRaw(unref(records))[0])
      let test = [...toRaw(unref(records)),toRaw(unref(records))[0]]
      console.log(test)
      records.value = test
      // socket.send("{" +
      //     '"fromUserId":1,' +'"toUserId":1,'+'"message":"what I say"'+
      //     "}")
      console.log("11111111111111")
    }

    // const receiveMsgList=[
    //   {
    //     flag:true,
    //     message:"111"
    //   },
    //   {
    //     flag:false,
    //     message: "2222"
    //   },
    //   {
    //     flag:false,
    //     message: "2222"
    //   }
    // ]
    return {
      sendMsg,
      records,
      toUser,
      me
    }
  }

})
</script>

<style scoped>

.van-col-width {
  width: 90%;
}

.content {
  list-style: none;
  width: 410px;
  height: 280px;
  margin: 5px auto;
  border: 1px dotted #D1D3D6;
  overflow-y: scroll;
}

.msgContent {
  width: auto;
  max-width: 70%;
  height: auto;
  word-break: break-all;
  margin: 5px;
  padding: 3px;
  border-radius: 5px;
}

.left {
  float: left;
  text-align: left;
  background-color: lightgrey;
}

.right {
  float: right;
  text-align: right;
  background-color: #07c160;
}
</style>
