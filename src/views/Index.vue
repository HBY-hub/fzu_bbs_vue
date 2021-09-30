<template>
  <van-grid :column-num="3">
    <van-grid-item
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="失物招领"
    />
    <van-grid-item
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="聊天交友"
    />
    <van-grid-item
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="失物招领"
    />
    <van-grid-item
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="失物招领"
    />
    <van-grid-item
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="失物招领"
    />
    <van-grid-item
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="失物招领"
    />
    <passage-pre/>

  </van-grid>
</template>
<script>
import {defineComponent} from "vue";
import PassagePre from "@/components/PassagePre";
export default defineComponent({
  name:"Index",
  components: {PassagePre},
  setup(){
    const typeList = ["失物招领","聊天交友","失物招领","聊天交友","失物招领","聊天交友"];
    for (let i = 0; i < 6; i++) {
      console.log(typeList[i]);
    }
    return{
      typeList
    }
  }
})
</script>
