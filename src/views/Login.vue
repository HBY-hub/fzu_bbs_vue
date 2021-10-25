<template>
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
</template>
<script >

import {defineComponent, ref, toRaw} from "vue";
import {useStore} from "vuex";
import axios from "axios";


export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore()
    console.log(toRaw(store.state.user))
    console.log(toRaw(store.state.token))
    const userName = ref('');
    const password = ref('');
    const onSubmit = (values) => {
      store.dispatch("login",values)
      console.log(store.state.token)
      if(store.state.token){
        store.dispatch("user",store.state.token)
      }
      console.log(store.state.user)
    };
    const after_read = (file) => {
      let formData = new FormData();
      formData.append("file",file.file);
      console.log(file)
      axios.post("/faceLogin",formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
        console.log(res)
      })
    };
    return {
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
