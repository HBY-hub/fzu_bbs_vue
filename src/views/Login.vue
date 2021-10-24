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
  </van-form>
</template>
<script >

import {defineComponent, ref, toRaw} from "vue";
import {useStore} from "vuex";


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
    return {
      userName,
      password,
      onSubmit,
    };
  },
})
</script>
