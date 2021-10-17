<template>
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
  <div v-for="comment in comments" :key="comment.id">
    <UserInfo/>
    <van-row>
      <van-col span="1"/>
      <van-col span="22">
        <p>你你在说啥你在说啥你在说啥你在说啥你在说啥你在说啥你在说啥你在说啥你在说啥在说啥</p>
      </van-col>
      <van-col span="1"/>
    </van-row>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import UserInfo from "@/components/UserInfo";
export default defineComponent({
  name: "Passage",
  components: {UserInfo},
  setup(){
    const imageList = ref(['https://img.yzcdn.cn/vant/ipad.jpeg'])
    const comments = ref([{id:1},{id:2}])

    return{
      imageList,
      comments
    }

  },
})
</script>

<style scoped>

</style>
