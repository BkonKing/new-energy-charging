import {
  http
} from '@/common/service.js'

export function findMemberById(params) {
  return http.get('/member/findMemberById', {
    params
  })
}

export function findOrderByMemberId(params) {
  return http.get('/member/findOrderByMemberId', {
    params
  })
}

export function findSiteByFavorite(params) {
  return http.get('/member/findSiteByFavorite', {
    params
  })
}

export function findMemberByWallet(params) {
  return http.get('/member/findMemberByWallet', {
    params
  })
}

export function findMemberBalance(params) {
  return http.get('/member/findMemberBalance', {
    params
  })
}

export function findMemberExtractCash(params) {
  return http.get('/member/findMemberExtractCash', {
    params
  })
}

export function findMemberBanks(params) {
  return http.get('/member/findMemberBanks', {
    params
  })
}

export function addMemberBank(params) {
  return http.post('/member/addMemberBank', params)
}

export function removeMemberBank(params) {
  return http.delete('/member/removeMemberBank', params)
}

// 实名认证（会员）
export function updateMemberByAuth(params) {
  return http.put('/member/updateMemberByAuth', params)
}

// 充值（会员）
export function rechargeMember(params) {
  return http.post('/member/rechargeMember', params)
}

// 提现（会员）
export function withdrawalMember(params) {
  return http.post('/member/withdrawalMember', params)
}

// 充电（会员）
export function startCharge(params) {
  return http.post('/member/startCharge', params)
}

// 断电（会员）
export function stopCharge(params) {
  return http.put('/member/stopCharge', params)
}

// 添加收藏（会员）
export function addMemberFavorite(params) {
  return http.post('/member/addMemberFavorite', params)
}

// 取消收藏（会员）
export function removeMemberFavorite(params) {
  return http.delete('/member/removeMemberFavorite', params)
}