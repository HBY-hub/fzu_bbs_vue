<template>
  <van-list>
    <passage-pre v-for="passage in passages" :key="passage.id"/>
  </van-list>

</template>

<script>
import {defineComponent, ref} from "vue";
import PassagePre from "@/components/PassagePre";

export default defineComponent({
  name: "PassageList",
  components: {PassagePre},
  setup(){
    const passages = ref([
      {"id":"1","username":"name1","title":"title1","content":"content1",""},
      {"id":"2"}
    ])

    return {
      passages
    }
  }
})
</script>

<style scoped>

</style>
