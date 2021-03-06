import loginApi from '@/api/login'
import scheduleEvents from "./schedule";
import {setToken, getToken, removeToken} from "../../utils/auth";

const user = {
  state: {
    name
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    }
  },

  actions: {
    LoginByUsername({commit}, userInfo) {
      const {username, password} = userInfo
      return new Promise((resolve, reject) => {
        loginApi.loginByUsername(username, password).then(response => {
          const data = response.data
          const token = response.data.sessionid
          setToken(token)
          commit('SET_NAME', username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout({commit, state}) {
      return new Promise((resolve, reject) => {
          removeToken()
          resolve()
      })
    },
    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        loginApi.getUserInfo().then(response => {
          if (!response.data) {
            reject('error')
          }
          const data = response.data
          commit('SET_NAME', data.username)
          resolve(response)
        }).catch(error=>{
          reject(error)
        })

      })
    }
  }


}
export default user
