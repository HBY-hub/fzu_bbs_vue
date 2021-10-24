<template>

<!--  <van-search-->
<!--      v-model="value"-->
<!--      placeholder="请输入搜索关键词"-->
<!--      input-align="center"-->
<!--  />-->
  <router-view/>

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
