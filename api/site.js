import {
  http
} from '@/common/service.js'

const mock = {
  findSiteByCoordinateData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": [{
      "id": 1,
      "siteName": "xxxxx",
      "longitude": 119.216462,
      "latitude": 26.04253,
      "fee": "1.2",
      "freeNum": "3",
      "freeFastNum": "2",
      "freeSlowNum": "3"
    }]
  },
  findSiteByIdData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": {
      "id": "xxxxx",
      "storeState": 0,
      "siteName": "xxxxx",
      "pictures": "",
      "parkDesc": "xxxxx",
      "longitude": "xxxxx",
      "latitude": "xxxxx",
      "fee": "xxxxx",
      "businessTime": "xxxxx",
      "businessType": "xxxxx",
      "operateType": "xxxxx",
      "freeFastNum": "xxxxx",
      "fastNum": "xxxxx",
      "freeSlowNum": "xxxxx",
      "slowNum": "xxxxx",
      "targetDistance": "xxxxx"
    }
  },
  findSiteByKeyData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": [{
        "id": "xxxxx",
        "storeState": 0,
        "siteName": "xxxxx",
        "pictures": "",
        "parkDesc": "xxxxx",
        "longitude": "xxxxx",
        "latitude": "xxxxx",
        "fee": "xxxxx",
        "businessTime": "xxxxx",
        "businessType": "xxxxx",
        "operateType": "xxxxx",
        "freeFastNum": "xxxxx",
        "fastNum": "xxxxx",
        "freeSlowNum": "xxxxx",
        "slowNum": "xxxxx",
        "targetDistance": "xxxxx"
      },
      {
        "id": 2,
        "storeState": 0,
        "siteName": "xxxxx",
        "pictures": "",
        "parkDesc": "xxxxx",
        "longitude": "xxxxx",
        "latitude": "xxxxx",
        "fee": "xxxxx",
        "businessTime": "xxxxx",
        "businessType": "xxxxx",
        "operateType": "xxxxx",
        "freeFastNum": "xxxxx",
        "fastNum": "xxxxx",
        "freeSlowNum": "xxxxx",
        "slowNum": "xxxxx",
        "targetDistance": "xxxxx"
      },
      {
        "id": 3,
        "storeState": 0,
        "siteName": "xxxxx",
        "pictures": "",
        "parkDesc": "xxxxx",
        "longitude": "xxxxx",
        "latitude": "xxxxx",
        "fee": "xxxxx",
        "businessTime": "xxxxx",
        "businessType": "xxxxx",
        "operateType": "xxxxx",
        "freeFastNum": "xxxxx",
        "fastNum": "xxxxx",
        "freeSlowNum": "xxxxx",
        "slowNum": "xxxxx",
        "targetDistance": "xxxxx"
      },
      {
        "id": 4,
        "storeState": 0,
        "siteName": "xxxxx",
        "pictures": "",
        "parkDesc": "xxxxx",
        "longitude": "xxxxx",
        "latitude": "xxxxx",
        "fee": "xxxxx",
        "businessTime": "xxxxx",
        "businessType": "xxxxx",
        "operateType": "xxxxx",
        "freeFastNum": "xxxxx",
        "fastNum": "xxxxx",
        "freeSlowNum": "xxxxx",
        "slowNum": "xxxxx",
        "targetDistance": "xxxxx"
      }
    ]
  },
  findOrderByMemberIdData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": [{
      "id": "xxxxx",
      "connectorNum": "xxxxx",
      "chargeStatus": "xxxxx",
      "plateNo": "xxxxx",
      "connStartTime": "xxxxx",
      "connEndTime": "xxxxx",
      "soc": "xxxxx",
      "remainChargeTime": "xxxxx",
      "payStatus": "xxxxx",
      "payTime": "xxxxx",
      "totalPower": "xxxxx",
      "realAmount": "xxxxx"
    }]
  },
  findConnectorBySiteIdData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": [{
        "connectorNum": "xxxxx",
        "currentUpperLimits": "xxxxx",
        "voltageUpperLimits": "xxxxx",
        "powerUpperLimits": "xxxxx",
        "soc": "xxxxx",
        "connectorStatus": "1",
        "equipmentType": "1",
        "nationalStandard": "xxxxx"
      },
      {
        "connectorNum": "xxxxx",
        "currentUpperLimits": "xxxxx",
        "voltageUpperLimits": "xxxxx",
        "powerUpperLimits": "xxxxx",
        "soc": "xxxxx",
        "connectorStatus": "2",
        "equipmentType": "2",
        "nationalStandard": "xxxxx"
      }
    ]
  },
  findPostageBySiteIdData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": [{
        "startTime": "00:00",
        "endTime": "11:59",
        "electricityFee": "xxxxx",
        "serviceFee": "xxxxx",
        "fee": "xxxxx",
        "type": "xxxxx"
      },
      {
        "startTime": "12:00",
        "endTime": "13:59",
        "electricityFee": "xxxxx",
        "serviceFee": "xxxxx",
        "fee": "xxxxx",
        "type": "xxxxx"
      },
      {
        "startTime": "14:00",
        "endTime": "23:59",
        "electricityFee": "xxxxx",
        "serviceFee": "xxxxx",
        "fee": "xxxxx",
        "type": "xxxxx"
      }
    ]
  },
  findConnectorByNumData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": {
      "siteId": "xxxxx",
      "siteName": "xxxxx",
      "address": "xxxxx",
      "connectorNum": "xxxxx",
      "startTime": "xxxxx",
      "endTime": "xxxxx",
      "electricityFee": "xxxxx",
      "serviceFee": "xxxxx",
      "fee": "xxxxx"
    }
  }
}

export function findSiteByCoordinate(params) {
  return Promise.resolve(mock.findSiteByCoordinateData)
  return http.get('/site/findSiteByCoordinate', params)
}

// 站点详情信息
export function findSiteById(params) {
  return Promise.resolve(mock.findSiteByIdData)
  return http.get('/site/findSiteById', params)
}

// 关键字搜索站点列表
export function findSiteByKey(params) {
  return Promise.resolve(mock.findSiteByKeyData)
  return http.get('/site/findSiteByKey', params)
}

// 充电枪列表查询
export function findConnectorBySiteId(params) {
  return Promise.resolve(mock.findConnectorBySiteIdData)
  return http.get('/site/findConnectorBySiteId', params)
}

// 站点电价列表查询
export function findPostageBySiteId(params) {
  return Promise.resolve(mock.findPostageBySiteIdData)
  return http.get('/site/findPostageBySiteId', params)
}

// 充电枪查询
export function findConnectorByNum(params) {
  return Promise.resolve(mock.findConnectorByNumData)
  return http.get('/site/findConnectorByNum', params)
}
