<template>
  <Nav/>
  <br/>
  <br/>

  <van-row>
    <van-col span="7"/>
    <van-col span="10">
  <van-image width="100%" height="100%" :src="require('../../src/assets/fzu.png')" />

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
        注册
      </van-button>
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

    const onSubmit = () => {
      axios.post("/register",{name:userName,password:password}).then((res)=>{
        console.log(res)
      })
      router.push('/login')
    };
    return {
      userName,
      password,
      onSubmit,
    };
  },
})
</script>


<style scoped>
</style>
