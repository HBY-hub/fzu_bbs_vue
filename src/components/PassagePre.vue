<template>
  <van-row>
    <van-col span="1"/>
    <van-col span="4">
      <van-image round fit="fill" src="https://img.yzcdn.cn/vant/ipad.jpeg" />
    </van-col>
    <van-col span="14">
      <div style="color:orange">
        name
      </div>
    </van-col>
    <van-col span="4">
      <van-tag plain type="primary">关注</van-tag>
      <van-tag type="primary">取消关注</van-tag>
    </van-col>
    <van-col span="1"/>
  </van-row>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">
      这里是我说的话
      这里是我说的话
      这里是我说的话
      这里是我说的话
      这里是我说的话
    </van-col>
    <van-col span="1"/>
    <van-col v-for="image in imageList" :key=image span="8">
      <van-image :src="image" />
    </van-col>
  </van-row>

</template>

<script>
import {defineComponent,ref} from "vue";

export default defineComponent({
  name: "PassagePre",
  setup(){
    const imageList = ref([
      "https://img.yzcdn.cn/vant/ipad.jpeg",
      "https://img.yzcdn.cn/vant/ipad.jpeg",
      "https://img.yzcdn.cn/vant/ipad.jpeg"
    ])
    return{
      imageList
    }
  }

})
</script>

<style scoped>

</style>
