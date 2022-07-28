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
