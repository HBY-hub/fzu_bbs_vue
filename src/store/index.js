import { createStore } from 'vuex'
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
const asyncAndCommit = async(url, mutationName,
                             commit, config= { method: 'get' }, extraData) => {
  const { data } = await axios(url, config)
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
  },
  actions: {
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    login({ commit }, payload) {
      return asyncAndCommit('/login', 'login', commit, { method: 'post', data: payload })
    }
  },
  getters:{

  },
  modules: {
  }
})
