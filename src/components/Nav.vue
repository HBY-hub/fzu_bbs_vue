<template>
  <van-nav-bar
      fixed="true"
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Nav",
  props:
      {
        title:String
      },
  setup(){
    const onClickLeft = () =>{history.back()}
    return {
      onClickLeft
    }
  }
})
</script>

<style scoped>

</style>
