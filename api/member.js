import {
  http
} from '@/common/service.js'

const mock = {
  findMemberByIdData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": {
      "memberId": "xxxxx",
      "nickName": "xxxxx",
      "avatar": "xxxxx",
      "gender": "xxxxx",
      "trueName": "xxxxx",
      "hasCertification": "xxxxx",
      "registChannel": "xxxxx"
    }
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
  findSiteByFavoriteData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": [{
        "id": "xxxxx",
        "storeState": "xxxxx",
        "siteName": "xxxxx",
        "pictures": "xxxxx",
        "parkDesc": "xxxxx",
        "longitude": "xxxxx",
        "latitude": "xxxxx",
        "startTime": "xxxxx",
        "endTime": "xxxxx",
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
        "id": "xxxxx",
        "storeState": "xxxxx",
        "siteName": "xxxxx",
        "pictures": "xxxxx",
        "parkDesc": "xxxxx",
        "longitude": "xxxxx",
        "latitude": "xxxxx",
        "startTime": "xxxxx",
        "endTime": "xxxxx",
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
  findMemberByWalletData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": {
      "id": "xxxxx",
      "totalAssets": "xxxxx",
      "balances": "xxxxx",
      "frozenAmount": "xxxxx",
      "inSummary": "xxxxx",
      "expSummary": "xxxxx"
    }
  },
  findMemberBalanceData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": [{
        "id": "xxxxx",
        "payType": "2",
        "realAmount": "xxxxx",
        "afterAmount": "xxxxx",
        // ":"
        // xxxxx ",
        "payStatus": "xxxxx",
        "payTime": "xxxxx"
      },
      {
        "id": "xxxxx",
        "payType": "3",
        "realAmount": "xxxxx",
        "afterAmount": "xxxxx",
        // ":"
        // xxxxx ",
        "payStatus": "xxxxx",
        "payTime": "xxxxx"
      }
    ]
  },
  findMemberExtractCashData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": {
      "realAmount": "xxxx",
      "payType": "xxxx",
      "afterAmount": "xxxx",
      "payStatus": "xxxx",
      "payTime": "xxxx",
      "records": [{
          "payChannel": "xxxx",
          "realAmount": "xxxx",
          "payTime": "xxxx"
        },
        {
          "payChannel": "xxxx",
          "realAmount": "xxxx",
          "payTime": "xxxx"
        }
      ]
    }
  },
  findMemberBanksData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": [{
        "id": "xxxxx",
        "bankName": "xxxxx",
        "cardNo": "xxxxx",
        "logo": "xxxxx"
      },
      {
        "id": "xxxxx",
        "bankName": "xxxxx",
        "cardNo": "xxxxx",
        "logo": "xxxxx"
      }
    ]
  },
  addMemberBankData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": {}
  },
  removeMemberBankData: {
    "code": "200",
    "message": "操作成功！",
    "success": true,
    "timestamp": 1658930171207,
    "result": {}
  }
}


export function findMemberById() {
  return Promise.resolve(mock.findMemberByIdData)
  return http.get('/member/findMemberById', params)
}

export function findOrderByMemberId() {
  return Promise.resolve(mock.findOrderByMemberIdData)
  return http.get('/member/findOrderByMemberId', params)
}

export function findSiteByFavorite() {
  return Promise.resolve(mock.findSiteByFavoriteData)
  return http.get('/member/findSiteByFavorite', params)
}

export function findMemberByWallet() {
  return Promise.resolve(mock.findMemberByWalletData)
  return http.get('/member/findMemberByWallet', params)
}

export function findMemberBalance() {
  return Promise.resolve(mock.findMemberBalanceData)
  return http.get('/member/findMemberBalance', params)
}

export function findMemberExtractCash() {
  return Promise.resolve(mock.findMemberExtractCashData)
  return http.get('/member/findMemberExtractCash', params)
}

export function findMemberBanks() {
  return Promise.resolve(mock.findMemberBanksData)
  return http.get('/member/findMemberBanks', params)
}

export function addMemberBank() {
  return Promise.resolve(mock.addMemberBankData)
  return http.post('/member/addMemberBank', params)
}

export function removeMemberBank() {
  return Promise.resolve(mock.removeMemberBankData)
  return http.delete('/member/removeMemberBank', params)
}
