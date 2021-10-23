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
    chatList:{},
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
    logout(state){
      state.token = ''
      state.user = { isLogin: false }
      localStorage.remove('token')
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
