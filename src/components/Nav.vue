<template>
  <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Nav"
})
</script>

<style scoped>

</style>
