import { createStore } from 'vuex'
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
const asyncAndCommit = async (url, mutationName,
                             commit, config= { method: 'get',headers:{'content-type': 'application/json'} }, extraData) => {
  const {data} = await axios(url,config)

  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}

export default createStore({
  state: {
    user:JSON.parse(localStorage.getItem('user'))||null,
    token: localStorage.getItem('token') || '',
    passages: [],
    passage:{},
    chatList:JSON.parse(localStorage.getItem("chatList"))||[
      {
        "userId":2,
        "username":"a",
        "message":"message",
        "img":"https://img.yzcdn.cn/vant/ipad.jpeg"
      }
    ],
    // [{"userId":1,"username":"","message":"","img":""},....]
    chat:{}
  },
  mutations: {
    login(state,rawData){
      const token = rawData.data.tokenValue;
      state.token = token;
      localStorage.setItem("token",token);
    },
    user(state,data){
      state.user = data.data;
      localStorage.setItem("user",JSON.stringify(data.data));
    },
    addMessage(state,data) {
      var flag = 1;
      state.chatList = state.chatList.find((v)=>{
        if(v.username==data.username)flag = 0;
      })
      if(flag){
        state.chatList.push(data)
      }
    },
    logout(state){
      state.token = ''
      state.user = null
      localStorage.remove('token')
      localStorage.remove("user")
    },
    getHotPassage(state,rawData){
      console.log(rawData)
    }
  },
  actions: {
    login({ commit }, payload) {
      return asyncAndCommit('/login', 'login', commit, { method: 'post', data:payload })
    },
    getHotPassage({commit},payload){
      return asyncAndCommit('/getHotPassage','getHotPassage',commit,{method: 'get',params:payload})
    },
    user({commit},payload){
      return asyncAndCommit('/login','user',commit,{method:'get',params:{"token":payload}})
    }
  },
  getters:{

  },
  modules: {
  }
})
