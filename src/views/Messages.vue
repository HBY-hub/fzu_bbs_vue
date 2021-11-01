<template>
  <van-nav-bar title="消息  " />
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <div v-for="item in list" :key="item">
      <router-link :to="'/chat/'+item.userId">
        <message :message=item />
      </router-link>
    </div>

  </van-list>
  <Bottom/>
</template>
<script>
import {defineComponent} from "vue";
import Message from "@/components/Message";
import { ref } from 'vue';
import {useStore} from "vuex";
import Bottom from "@/components/Bottom";

export default defineComponent({
  name: "Messages",
  components:{
    Bottom,
    Message
  },
  setup(){
    const store = useStore()
    const list = store.state.chatList;
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     list.value.push(list.value.length + 1);
      //   }
      //
      //   // 加载状态结束
      //   loading.value = false;
      //
      //   // 数据全部加载完成
      //   if (list.value.length >= 40) {
      //     finished.value = true;
      //   }
      // }, 1000);
    };

    return {
      list,
      onLoad,
      loading,
      finished,
    };
  },
})
</script>
