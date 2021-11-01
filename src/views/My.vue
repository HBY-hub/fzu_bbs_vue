<template>


  <div class="user-profile">
    <div class="info">
      <div class="img">
        <van-uploader :after-read="afterRead" >
          <van-image  round   :src="user.avatar" />
        </van-uploader>

<!--        <van-button round  size="mini" type="info">更换头像</van-button>-->
      </div>
      <van-form>
        <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="number"
            name="学号"
            label="学号"
            placeholder="学号"
            :rules="[{ required: true, message: '请填写学号' }]"
        />
        <van-field
            v-model="introduction"
            name="学院及专业"
            label="学院及专业"
            placeholder="学院及专业"
            :rules="[{ required: true, message: '请填写学院及专业' }]"
        />
        <van-field
            v-model="introduction"
            name="个性签名"
            label="个性签名"
            placeholder="个性签名"
        />
      </van-form>
    </div>
    <van-row>
      <van-col span="8">
        <p style="text-align:center">0</p>
        <p style="text-align:center">动态</p>
      </van-col>
      <van-col span="8">
        <p style="text-align:center">0</p>
        <p style="text-align:center">关注</p>
      </van-col>
      <van-col span="8">
        <p style="text-align:center">0</p>
        <p style="text-align:center">粉丝</p>
      </van-col>
    </van-row>
  </div>
  <van-row class="user-links">
    <van-col span="8" style="text-align:center">
      <van-icon name="newspaper-o" color="#7af"/>我的动态
    </van-col>
    <van-col span="8" style="text-align:center">
      <van-icon name="star-o" color="#f00"/>我的收藏
    </van-col>
    <van-col span="8" style="text-align:center">
      <van-icon name="tosend" color="#fa0"/>阅读历史
    </van-col>
  </van-row>
  <div class="demo1">
    <van-cell-group class="user-group">
      <van-cell icon="edit" title="编辑资料" is-link />
      <van-cell icon="setting-o" title="系统设置" is-link />
      <van-uploader capture="camera" :after-read="uploadFace">
        <van-cell icon="edit" title="脸部上传"/>
      </van-uploader>
      <van-cell icon="warning-o" title="退出登录" @click="logout" is-link />
    </van-cell-group>
  </div>
  <Bottom/>
</template>

<script>
import Bottom from "@/components/Bottom";
import {useStore} from "vuex";
import axios from "axios";
import {useRouter} from "vue-router";

export default {
  name: 'my',
  components: {Bottom},
  setup(){
    const store  = useStore()
    const router = useRouter()
    const user = store.state.user
    const afterRead=(file)=>{

      let formData = new FormData();
      formData.append("file",file.file);
      formData.append("id",store.state.user.id)
      console.log(file)
      axios.post("/avatarUpload",formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(
          (res)=>{
            console.log(res)
            store.dispatch('user',store.state.token)
          })
    }
    const uploadFace = (file)=>{
      let formData = new FormData();
      formData.append("file",file.file);
      formData.append("id",store.state.user.id)
      axios.post("/faceUpload",formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
        console.log(res)
      })
    }
    const logout = ()=>{
      store.commit("logout")
      router.push('/login')
    }
    return{
      uploadFace,
      logout,
      user,
      afterRead
    }
  }
}

</script>


<style >
.img {
  width: 200px;
  margin-top: 0px;
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
}
.demo1  {
  height: 200px;
}
</style>

