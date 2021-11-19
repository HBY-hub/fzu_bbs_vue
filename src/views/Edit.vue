<template>
  <van-nav-bar
      title="编辑"
      right-text="完成"
      @click-right="onClickLeft"
  />
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <van-cell-group inset>
    <van-field required v-model="userName" label="用户名" placeholder="请输入用户名" />
  </van-cell-group>
  <van-cell-group inset>
    <van-field required v-model="phone" label="学号" placeholder="请输入学号" />
  </van-cell-group>
  <van-cell-group inset>
    <van-field required v-model="academy" label="学院" placeholder="请输入学院" />
  </van-cell-group>

</template>

<script>
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import axios from "axios";

export default defineComponent({
  name: "Edit",
  setup(){
    const store = useStore()
    const phone = ref()
    const academy = ref()
    const userName =ref()
    const router = useRouter()

    const onClickLeft = ()=>{
      axios.post("/edit",{id:store.state.user.id,phone:phone.value,academy:academy.value,userName:userName.value}).then((res)=>{
        console.log(res)
      })
      router.push('/login')
    }

    return{
      onClickLeft,
      phone,
      academy,
      userName
    }


  }
})
</script>

<style scoped>

</style>
