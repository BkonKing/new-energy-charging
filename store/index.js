import Vue from 'vue'
import Vuex from 'vuex'
import {
  findMemberById
} from "@/api/member.js"
import {
  login,
  logout
} from '@/api/user.js';
import {
  ACCESS_TOKEN,
  USER_INFO
} from "@/common/constants"
import {
  getLocationInfo
} from '@/common/util.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: uni.getStorageSync(ACCESS_TOKEN) || '',
    userInfo: uni.getStorageSync(USER_INFO) || {},
    locationInfo: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      token ? uni.setStorageSync(ACCESS_TOKEN, token) : uni.removeStorageSync(ACCESS_TOKEN)
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      userInfo ? uni.setStorageSync(USER_INFO, userInfo) : uni.removeStorageSync(USER_INFO)
      state.userInfo = userInfo
    },
    SET_LOCATIONINFO: (state, locationInfo) => {
      state.locationInfo = locationInfo
    }
  },
  actions: {
    getUserInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        findMemberById().then(({
          result
        }) => {
          commit('SET_USERINFO', result)
          resolve(result)
        }).catch(() => {
          reject()
        })
      })
    },
    // 登录
    login({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        login(params).then(({
          result
        }) => {
          console.log('result', result);
          const userInfo = result.memberInfo
          commit('SET_TOKEN', result.token)
          commit('SET_USERINFO', userInfo)
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    logout({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        const logoutToken = state.token;
        logout({
          token: logoutToken
        }).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USERINFO', '')
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    // 获取当前定位
    getLocationInfo({
      commit,
      state
    }, params) {
      return new Promise((resolve, reject) => {
        getLocationInfo({
            title: '请求授权当前位置',
            message: '我们需要获取地理位置信息，为您推荐附近的站点'
          })
          .then((res) => {
            commit('SET_LOCATIONINFO', res)
            resolve(res)
          }).catch((error) => {
            reject(error)
          })
      })
    },
  },
  getters: {
    token: state => state.token,
    userInfo: state => {
      return state.userInfo || {}
    },
    username: state => {
      return state.userInfo?.username || ''
    },
    nickname: state => {
      return state.userInfo?.nickname || ''
    },
    avatar: state => {
      return state.userInfo?.avatar || ''
    },
    userid: state => {
      return state.userInfo?.userid || ''
    },
    hasCertification: state => {
      return state.userInfo?.hasCertification || ''
    },
    locationInfo: state => {
      return state.locationInfo || {}
    },
  }
})
