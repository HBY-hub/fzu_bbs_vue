<template>
  <Nav/>
  <br/>
  <br/>

  <van-row>
    <van-col span="7"/>
    <van-col span="10">
  <van-image width="100%" height="100%" src="https://hby-test.oss-cn-guangzhou.aliyuncs.com/WPS%E5%9B%BE%E7%89%87%E7%BC%96%E8%BE%91.png" />

    </van-col>
    <van-col span="7"/>
  </van-row>
  <br/>
  <br/>
  <br/>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userName"
          name="userName"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
    <div style="text-align: center">
    <van-uploader :after-read="after_read" capture="camera" show-upload="false">
      <div style="margin: 16px;">
        <van-button round block type="primary" @click.prevent>
          人脸识别
        </van-button>
      </div>
    </van-uploader>

    </div>
  </van-form>
  <van-loading v-if="isLoading" style="text-align: center" type="spinner" color="#1989fa" />
</template>
<script >

import {defineComponent, ref, toRaw} from "vue";
import {useStore} from "vuex";
import {useRouter} from 'vue-router'
import axios from "axios";
import Nav from "@/components/Nav";



export default defineComponent({
  name: "Login",
  components:{
    Nav

  },
  setup() {
    const router = useRouter()
    const store = useStore()
    console.log(toRaw(store.state.user))
    console.log(toRaw(store.state.token))
    const userName = ref('');
    const password = ref('');

    const onSubmit = (values) => {
      isLoading.value =true
      store.dispatch("login",values)
      if(store.state.token){
        store.dispatch("user",store.state.token)
      }
      if(store.state.token){
        router.push('/index')
      }
    };
    const after_read = (file) => {
      isLoading.value = true
      let formData = new FormData();
      formData.append("file",file.file);
      console.log(file)
      axios.post("/faceLogin",formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
        if(res.status=="200"){
          store.commit("login",res.data)
          if(store.state.token){
            store.dispatch("user",store.state.token)
          }
        }
      })
      if(store.state.token){
        router.push('/index')
      }
    };
    let isLoading = ref(false);
    return {
      isLoading,
      userName,
      after_read,
      password,
      onSubmit,
    };
  },
})
</script>


<style scoped>
</style>
