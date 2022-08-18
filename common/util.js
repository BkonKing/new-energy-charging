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

//百度坐标转换成腾讯坐标
export function convert2TecentMap({
  lon,
  lat
}) {
  if (lon == '' && lat == '') {
    return {
      lon: '',
      lat: ''
    }
  }
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0
  var x = lon - 0.0065
  var y = lat - 0.006
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
  var qqlon = z * Math.cos(theta)
  var qqlat = z * Math.sin(theta)
  return {
    lon: qqlon,
    lat: qqlat
  }
}

export function openLocation({
  longitude,
  latitude,
  name,
  address
}) {
  let lon = longitude
  let lat = latitude
  // #ifdef H5
  const that = this;
  uni.showActionSheet({
    title: '选择地图应用软件',
    itemList: ['腾讯地图', '百度地图', '高德地图'],
    success: e => {
      let url = '';
      let iosDownloadUrl = '';
      let andriodDownloadUrl = '';
      switch (e.tapIndex) {
        case 0:
          url =
            `qqmap://map/geocoder?coord=${latitude},${longitude}&referer=GOPBZ-RSWK6-Z2CSX-MKQ57-VNKQV-WZBMU`; //key
          break;
        case 1:
          url =
            `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`;
          break;
        case 2:
          if (this.platform == 'ios') {
            url =
              `iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
          } else {
            url =
              `androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
          }
          break;
        default:
          break;
      }
      if (url != '') {
        url = encodeURI(url);
        Window.location.href = url;
      }
    },
    fail(err) {}
  });
  // #endif
  // #ifdef MP-WEIXIN
  const {
    lon: qqlon,
    lat: qqlat
  } = convert2TecentMap({
    lon,
    lat
  })
  lon = qqlon
  lat = qqlat
  // #endif
  // #ifndef H5
  console.log(lon, lat);
  uni.openLocation({
    latitude: +lat,
    longitude: +lon,
    name,
    address,
    scale: 18 //缩放比例
  });
  // #endif
}
