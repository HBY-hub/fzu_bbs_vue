<template>
  <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />
  <van-grid :column-num="3" :clickable="true">
    <van-grid-item
        @click="changeTheme('')"
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="全部"
    />
    <van-grid-item
        @click="changeTheme('失物招领')"
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="失物招领"
    />
    <van-grid-item
        @click="changeTheme('快递代取')"
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="快递代取"
    />
    <van-grid-item
        @click="changeTheme('活动通知')"
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="活动通知"
    />
    <van-grid-item
        @click="changeTheme('校园兼职')"
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="校园兼职"
    />
    <van-grid-item
        @click="changeTheme('闲置转让')"
        icon="https://img.yzcdn.cn/vant/ipad.jpeg"
        text="闲置转让"
    />
    <passage-pre v-for="passage in passages" :passage="passage" :key="passage.id" />

  </van-grid>
</template>
<script>
import {defineComponent, ref} from "vue";
import PassagePre from "@/components/PassagePre";
import {useStore} from 'vuex'
import axios from "axios";
export default defineComponent({
  name:"Index",
  components: {PassagePre},
  setup(){
    const store = useStore()

    store.dispatch('getHotPassage',{num:"1",page:"1",theme:""})
    console.log(store.state.passages)
    const typeList = ["失物招领","聊天交友","失物招领","聊天交友","失物招领","聊天交友"];
    for (let i = 0; i < 6; i++) {
      console.log(typeList[i]);
    }
    let passages = ref([])
    axios.get("/getHotPassage",{params:{num:"3",page:"1",theme:""}}).then((res)=>{
      passages.value = res.data.data;
      console.log(passages)
    })

    const changeTheme = (theme)=>{
      console.log(theme)
      axios.get("/getHotPassage",{params:{num:"3",page:"1",theme:theme}}).then((res)=>{
        passages.value = res.data.data;
      })
    }
    console.log("passsssssss")
    return{
      changeTheme,
      typeList,
      passages
    }
  }
})
</script>
