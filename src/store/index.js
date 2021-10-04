import { createStore } from 'vuex'
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
const asyncAndCommit = async(url, mutationName,
                             commit, config= { method: 'get',headers:{'content-type': 'application/json'} }, extraData) => {
  const { data } = await axios(url,config)


  console.log(data)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}

export default createStore({
  state: {
    user:{isLogin:false},
    token: localStorage.getItem('token') || '',
    passages: [],
    passage:{},
    chatList:{},
    chat:{}
  },
  mutations: {
    login(state,rawData){
      const token = rawData;
      state.token = token;
      localStorage.setItem("token",token);
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
      return asyncAndCommit('/login', 'login', commit, { method: 'post', num:payload.data.num,page:payload.data.page })
    },
    getHotPassage({commit},payload){
      return asyncAndCommit('/getHotPassage','getHotPassage',commit,{method: 'get',params:payload})
    }
  },
  getters:{

  },
  modules: {
  }
})
