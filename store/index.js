import Vue from 'vue'
import Vuex from 'vuex'
import {
  findMemberById
} from "@/api/member.js"
// import MinCache from '@/common/util/MinCache.js'
// import {
//   ACCESS_TOKEN,
//   USER_NAME,
//   USER_INFO
// } from "@/common/util/constants"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userid: '',
    username: '',
    realname: '',
    avatar: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, {
      username,
      realname,
    }) => {
      state.username = username
      state.realname = realname
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    getUserInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        findMemberById({
          memberId: ''
        }).then(({
          result
        }) => {
          commit('SET_AVATAR', userInfo.avatar)
          commit('SET_NAME', {
            username: userInfo.username,
            realname: userInfo.realname
          })
          resolve(response)
        }).catch(() => {
          reject()
        })
      })
    },
    // 登录
    // mLogin({
    //   commit
    // }, userInfo) {
    //   console.log("mLogin", userInfo)
    //   return new Promise((resolve, reject) => {
    //     api.login(userInfo).then(response => {
    //       if (response.data.code == 200) {
    //         const result = response.data.result
    //         const userInfo = result.userInfo
    //         uni.setStorageSync(ACCESS_TOKEN, result.token);
    //         uni.setStorageSync(USER_INFO, userInfo);
    //         commit('SET_TOKEN', result.token)
    //         commit('SET_AVATAR', userInfo.avatar)
    //         commit('SET_NAME', {
    //           username: userInfo.username,
    //           realname: userInfo.realname
    //         })
    //         resolve(response)
    //       } else {
    //         resolve(response)
    //       }
    //     }).catch(error => {
    //       console.log("catch===>response", response)
    //       reject(error)
    //     })
    //   })
    // },
    // 登出
    // Logout({
    //   commit,
    //   state
    // }) {
    //   return new Promise((resolve) => {
    //     let logoutToken = state.token;
    //     commit('SET_TOKEN', '')
    //     uni.removeStorageSync(ACCESS_TOKEN)
    //     api.logout(logoutToken).then(() => {
    //       resolve()
    //     }).catch(() => {
    //       resolve()
    //     })
    //   })
    // },

  },
  getters: {
    token: state => state.token,
    username: state => {
      state.userid = uni.getStorageSync(USER_INFO).username;
      return state.username
    },
    nickname: state => {
      state.userid = uni.getStorageSync(USER_INFO).realname;
      return state.user.realname
    },
    avatar: state => {
      state.userid = uni.getStorageSync(USER_INFO).avatar;
      return state.user.avatar
    },
    userid: state => {
      state.userid = uni.getStorageSync(USER_INFO).id;
      return state.userid
    },
  }
})
