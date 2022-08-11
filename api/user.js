import {
  http
} from '@/common/service.js'

export function getSession(params) {
  return http.get('/wxAuth/getSession', {
    params
  })
}

export function login(params) {
  return http.post('/wxAuth/login', params)
}

export function getPhoneNumber(params) {
  return http.post('/wxAuth/getPhoneNumber', params)
}

export function logout(params) {
  return http.post('/wxAuth/logout', params)
}