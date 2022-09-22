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

export function removeMemberBank(data) {
  return http.request({
    method: 'DELETE',
    url: '/member/removeMemberBank',
    params: data
  })
  // return http.delete('/member/removeMemberBank', params)
}

// 实名认证（会员）
export function updateMemberByAuth(data) {
  return http.request({
    method: 'PUT',
    url: '/member/updateMemberByAuth',
    data
  })
  // return http.put('/member/updateMemberByAuth', data)
}

// 充值（会员）
export function rechargeMember(params) {
  return http.post('/member/wechat/rechargeMember', params)
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
export function stopCharge(data) {
  return http.request({
    method: 'PUT',
    url: '/member/stopCharge',
    data
  })
  // return http.put('/member/stopCharge', params)
}

// 添加收藏（会员）
export function addMemberFavorite(params) {
  return http.post('/member/addMemberFavorite', params)
}

// 取消收藏（会员）
export function removeMemberFavorite(data) {
  return http.request({
    method: 'DELETE',
    url: '/member/removeMemberFavorite',
    params: data
  })
  // return http.delete('/member/removeMemberFavorite', params)
}

// 充电订单详情（会员）
export function findChargeOrder(params) {
  return http.get('/member/findChargeOrder', {
    params
  })
}

// 手动结算（会员）
export function closeMemberOrder(params) {
  return http.put('/member/closeMemberOrder', params)
}

// 故障保修（会员）
export function submitMemberRepair(params) {
  return http.post('/member/submitMemberRepair', params)
}

// 修改手机号短信发送（会员）
export function sendSms(params) {
  return http.post('/member/sms/code/send', params)
}

// 修改手机号（会员）
export function updatePhone(params) {
  return http.post('/member/updatePhone', params)
}

// 可开发票订单列表（会员）
export function findMemberOrderByInvoice(params) {
  return http.get('/member/findMemberOrderByInvoice', {
    params
  })
}

// 可开发票订单列表（会员）
export function findMemberOrderByNextInvoice(params) {
  return http.get('/member/findMemberOrderByNextInvoice', {
    params
  })
}

// 已开票查询列表（会员）
export function findMemberHisInvoice(params) {
  return http.get('/member/findMemberHisInvoice', {
    params
  })
}

// 发票详情（会员）
export function findMemberInvoiceDetail(params) {
  return http.get('/member/findMemberInvoiceDetail', {
    params
  })
}

// 发票关联订单列表（会员）
export function findMemberInvoiceForOrdersRel(params) {
  return http.get('/member/findMemberInvoiceForOrdersRel', {
    params
  })
}

// 发票保存（会员）
export function saveMemberInvoice(params) {
  return http.post('/member/saveMemberInvoice', params)
}