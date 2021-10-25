<template>
  <router-link v-if="user" :to="'/chat/'+user.id">
    <van-image round fit="fill" :src="user.avatar" />
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
