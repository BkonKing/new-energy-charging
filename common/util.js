import {
  handlePermission
} from '@/common/permission.js';

// 获取当前地址信息
export function getLocationInfo(params) {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02',
      success(res) {
        console.log('getLocationInfo', res);
        resolve(res)
      },
      fail({
        errMsg
      }) {
        console.log('getLocationInfo err: ', errMsg);
        if (errMsg === 'getLocation:fail auth deny') {
          handlePermission({
              name: 'userLocation',
              ...params
            })
            .then(() => {
              getLocationInfo(params).then((res) => {
                resolve(res)
              }).catch(() => {
                reject()
              });
            })
            .catch(() => {
              reject()
            });
          return
        }
        reject()
      }
    })
  })
}

// 获取用户信息
export function getUserInfo(params) {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success(loginRes) {
        console.log(loginRes);
        // 获取用户信息
        uni.getUserInfo({
          success(res) {
            resolve(res)
          },
          fail({
            errMsg
          }) {
            if (errMsg === 'etUserInfo:fail auth deny') {
              handlePermission({
                  name: 'getUserInfo',
                  ...params
                })
                .then(() => {
                  getUserInfo(params).then((res) => {
                    resolve(res)
                  }).catch(() => {
                    reject()
                  });
                })
                .catch(() => {
                  reject()
                });
              return
            }
            reject()
          }
        })
      }
    });
  })
}

export function validateForm(arr) {
  const status = arr.some(obj => {
    return validateEmpty(obj.value, obj.message)
  })
  return new Promise((resolve, reject) => {
    if (!status) {
      resolve(status)
    } else {
      reject(status)
    }
  })
}

export function validateEmpty(value, message) {
  let status = typeof value === 'undefined' || value === null || value === ''
  if (status) {
    uni.showToast({
      title: message || '值不能为空',
      icon: 'none'
    })
  }
  if (Array.isArray(value)) {
    status = value.length === 0
  }
  return status
}
