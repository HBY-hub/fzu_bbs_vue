<template>
  <div>
    <Nav v-if="passage" :title="passage.title"/>
    <Title v-if="passage" :title="passage.title"/>
    <UserInfo :user="user"/>
    <van-row v-if="passage">
      <van-col span="1"/>
      <van-col span="22">
          {{ passage.content }}
      </van-col>
      <van-col span="1"/>
    </van-row>
  </div>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">

    </van-col>
    <van-col span="1"/>
  </van-row>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">
      <van-image width="100%" v-for="image in imageList" :key="image.id" :src="image.url"/>
    </van-col>
    <van-col span="1"/>
  </van-row>
  <van-row>
    <van-col span="1"/>
    <van-col span="22">
      <p style="width: 100%;font-weight: bolder">全部回复</p>
    </van-col>
    <van-col span="1"/>
  </van-row>
  <Comment v-for="comment in comments" :comment="comment" :key="comment.id"/>

</template>

<script>
import {defineComponent, ref, watch} from "vue";
import UserInfo from "@/components/UserInfo";
import {useRoute} from "vue-router";
import Nav from "@/components/Nav";
import axios from "axios";
import Comment from "@/components/Comment";
import Title from "@/components/Title";

export default defineComponent({
  name: "Passage",
  components: {Title, Comment, Nav, UserInfo},
  setup() {
    const $route = useRoute()
    const id = $route.params.id;
    console.log(id)
    const imageList = ref([])
    const comments = ref([])
    let passage = ref()
    let user = ref()
    axios.get("getPassageById", {params: {"id": id}}).then((res) => {
      passage.value = res.data.data
    })

    watch(passage, (newpassage, oldpassage) => {
      axios.get("getCommentByPassageId", {params: {"id": id}}).then((res) => {
        console.log("getcommont")
        console.log(res.data.data)
        comments.value = res.data.data
      })
      console.log(oldpassage)

      axios.get("getUserByName", {params: {"username": newpassage.userName}}).then((res) => {
        user.value = res.data
      })
      axios.get("images", {params: {"id": newpassage.id}}).then((res) => {
        imageList.value = res.data.data
      })
    })
    return {
      imageList,
      comments,
      passage,
      user
    }

  },
})
</script>

<style scoped>

</style>
