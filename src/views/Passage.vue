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
    <van-col span="2" />
    <van-col span="20">
      <div v-if= "type==3" style="margin: 10px">
        <van-tag v-for="people in peopleList" style="margin:10px;" type="primary" :key="people">
          {{people}}
        </van-tag>
      </div>
    </van-col>
    <van-col span="2" />
  </van-row>
  <van-row >
    <van-col span="1"/>
    <van-col span="22">
      <van-button v-if="type==3" style="width: 100%" @click="addpeople" type="primary">
        参加
      </van-button>
    </van-col>
    <van-col span="1"/>
  </van-row>
  <van-row >
    <van-col span="1"/>
    <van-col span="22">
      <van-button v-if="ifDelete" style="width: 100%" type="primary" @click="deletePassage">
        删除文章
      </van-button>
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

  <div v-for="comment in comments" @click="setFather(comment.id,comment.content)" :key="comment.id">
  <Comment   :comment="comment" />

  </div>
  <van-cell-group inset>
    <van-field
        v-model="message"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="50"
        :placeholder="holder"
        show-word-limit
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" @click="submitComment" native-type="submit">
      提交
    </van-button>
  </div>

</template>

<script>
import {defineComponent, ref, toRaw, unref, watch} from "vue";
import UserInfo from "@/components/UserInfo";
import {useRoute, useRouter} from "vue-router";
import Nav from "@/components/Nav";
import axios from "axios";
import Comment from "@/components/Comment";
import Title from "@/components/Title";
import {useStore} from "vuex";

export default defineComponent({
  name: "Passage",
  components: {Title, Comment, Nav, UserInfo},
  setup() {
    const store = useStore()
    const $route = useRoute()
    const router = useRouter()
    const id = $route.params.id;
    console.log(id)
    const imageList = ref([])
    const comments = ref([])
    let passage = ref()
    let user = ref()
    let type =  ref(0)
    let detail = ref(null)
    axios.get("getPassageById", {params: {"id": id}}).then((res) => {
      passage.value = res.data.data
      if(passage.value.theme ==='失物招领')type.value = 1
      if(passage.value.theme ==='快递代取')type.value = 2;
      if(passage.value.theme ==='活动通知')type.value = 3;
      if(passage.value.theme ==='校园兼职')type.value = 4;
      if(passage.value.theme ==='闲置转让')type.value = 5;
    })

    let ifDelete = ref()
    watch(passage, (newpassage, oldpassage) => {
      console.log("bug")
      if(store.state.user){
        ifDelete.value = store.state.user.userName===toRaw(unref(newpassage)).userName
      }else{
        ifDelete.value = false
      }
      console.log(ifDelete)
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
      axios.post("/getDetail",{id:passage.value.id},{}).then((res)=>{
        console.log(res)
        detail.value = res.data.message;
        console.log("getdetail")
        console.log(detail.value)
        if(detail.value!=null){
          if(passage.value.theme == "活动通知"){
            console.log("活动")
            peopleList.value = JSON.parse(detail.value).list
            console.log(peopleList.value)
          }
        }
      })
    })
    const updateDetail =(newDetail)=>{
      axios.post("/updateDetail",{id:passage.value.id,detail:newDetail}).then((res)=>{
        console.log(res)
      })
    }
    const addpeople = ()=>{
      console.log(store.state.user)
      if(peopleList.value.find((i)=>i===store.state.user.userName)){
        return
      }
      peopleList.value =[...toRaw(unref(peopleList)),store.state.user.userName]
      updateDetail(JSON.stringify({"list":peopleList.value}))
    }

    let message = ref("")
    let fatherId = ref(0)
    const submitComment = ()=>{
      console.log("submit")
      axios.get("addComment",{params:{"father":fatherId.value,"content":message.value,"username":store.state.user.userName,"passageId":id}}).then((res)=>{
        console.log(res)
        message.value = ""
      })
      router.go(0)
    }
    let peopleList = ref([]);
    const setFather = (cid,content)=>{
      fatherId.value = cid
      holder.value = "回复:"+content
    }
    let holder = ref("请输入回复")

    const deletePassage=()=>{
      axios.get("/deletePassageById",{params:{id:id}}).then((res)=>{
        console.log(res)
      })
    }

    return {
      ifDelete,
      deletePassage,
      addpeople,
      holder,
      peopleList,
      fatherId,
      setFather,
      message,
      submitComment,
      type,
      imageList,
      comments,
      passage,
      updateDetail,
      user
    }

  },
})
</script>

<style scoped>

</style>
