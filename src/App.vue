<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
<!--  <van-search-->
<!--      v-model="value"-->
<!--      placeholder="请输入搜索关键词"-->
<!--      input-align="center"-->
<!--  />-->
  <router-view/>

  <van-tabbar route v-if="needbuttom">
    <van-tabbar-item to="/index" icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item to="/messages" icon="chat-o">标签</van-tabbar-item>
    <van-tabbar-item to="/my" icon="user-circle-o">标签</van-tabbar-item>
  </van-tabbar>

</template>
<script>
// import  './main';
export default {
  setup(){
    const uri = window.location;
    let needbuttom = true;
    if(uri.pathname==="/chat")needbuttom=false;
    if(uri.pathname==="/passage")needbuttom=false;
    return{
      needbuttom
    }
  },
  components: {
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
