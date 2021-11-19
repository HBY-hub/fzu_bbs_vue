<template>
  <van-nav-bar
      title="福妈"
      right-text="发布"
      @click-right="onClickRight"
  />
  <van-search v-model="searchValue" placeholder="请输入搜索关键词" />
  <van-grid :column-num="3" :clickable="true">
    <van-grid-item
        @click="changeTheme('')"
        :icon="require('../assets/fzu.png')"
        text="全部"
    />
    <van-grid-item
        @click="changeTheme('失物招领')"
        icon="paid"
        text="失物招领"
    />
    <van-grid-item
        @click="changeTheme('快递代取')"
        icon="logistics"
        text="快递代取"
    />
    <van-grid-item
        @click="changeTheme('活动通知')"
        icon="flag-o"
        text="活动通知"
    />
    <van-grid-item
        @click="changeTheme('校园兼职')"
        icon="balance-o"
        text="校园兼职"
    />
    <van-grid-item
        @click="changeTheme('闲置转让')"
        icon="after-sale"
        text="闲置转让"
    />
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <passage-pre v-for="passage in passages" :passage="passage" :key="passage.id" />
    </van-list>
<!--    <br/>-->
<!--    <br/>-->
<!--    <br/>-->
<!--    <br/>-->

    <Bottom/>
  </van-grid>
</template>
<script>
import {defineComponent, ref, toRaw, unref, watch} from "vue";
import PassagePre from "@/components/PassagePre";
import {useStore} from 'vuex'
import axios from "axios";
import Bottom from "@/components/Bottom";
import {useRouter} from "vue-router";
export default defineComponent({
  name:"Index",
  components: {Bottom, PassagePre},
  setup(){
    console.log(process.env)
    const router = useRouter()
    const store = useStore()
    const loading = ref(false);
    const finished = ref(false);

    console.log(store.state.passages)
    const typeList = ["失物招领","聊天交友","失物招领","聊天交友","失物招领","聊天交友"];
    for (let i = 0; i < 6; i++) {
      console.log(typeList[i]);
    }
    let cnt = 1
    let passages = ref([])
    // axios.get("/getHotPassage",{params:{num:3,page:1,theme:""}}).then((res)=>{
    //   passages.value = res.data.data;
    //   console.log(res.data.data)
    // })
    let nowtheme = ""
    const onLoad = ()=>{
      axios.get("/getHotPassage",{params:{num:3*cnt,page:1,theme:nowtheme}}).then((res)=>{
        cnt = cnt+1
        loading.value = false
        if(res.data.data.length===toRaw(unref(passages)).length){
          finished.value = true
          console.log("finish")
        }
        else{
          passages.value = res.data.data;
        }
      })
    }

    const changeTheme = (theme)=>{
      console.log(theme)
      nowtheme = theme
      axios.get("/getHotPassage",{params:{num:3,page:1,theme:theme}}).then((res)=>{
        cnt = 1
        passages.value = res.data.data;
      })
    }
    console.log("passsssssss")
    const searchValue = ref("")
    watch(searchValue,(n,o)=>{
      console.log(o,n)
    })
    const onClickRight = ()=>{
      router.push("/addPassage")
    }
    return{
      loading,
      finished,
      onLoad,
      onClickRight,
      searchValue,
      changeTheme,
      typeList,
      passages
    }
  }
})
</script>
