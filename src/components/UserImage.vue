<template>
  <router-link v-if="user" :to="'/chat/'+user.id">
    <van-image v-if="user.avatar" round fit="fill" :src="user.avatar" />
    <van-image v-else width="100%" height="100%" :src="require('../../src/assets/fzu.png')" />
  </router-link>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "UserImage",
  props:{
    user:{
      type:Object
    }
  },
  setup(props){
    console.log("Uuuuuuuuuuu")
    console.log(props.user)


  }
})
</script>

<style scoped>

</style>
