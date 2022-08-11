import {
  http
} from '@/common/service.js'

export function findSiteByCoordinate(params) {
  return http.get('/site/findSiteByCoordinate', {
    params
  })
}

// 站点详情信息
export function findSiteById(params) {
  return http.get('/site/findSiteById', {
    params
  })
}

// 关键字搜索站点列表
export function findSiteByKey(params) {
  return http.get('/site/findSiteByKey', {
    params
  })
}

// 充电枪列表查询
export function findConnectorBySiteId(params) {
  return http.get('/site/findConnectorBySiteId', {
    params
  })
}

// 站点电价列表查询
export function findPostageBySiteId(params) {
  return http.get('/site/findPostageBySiteId', {
    params
  })
}

// 充电枪查询
export function findConnectorByNum(params) {
  return http.get('/site/findConnectorByNum', {
    params
  })
}
