<template>
  <view class="container">
    <uni-nav-bar title="首页" :border="false" statusBar="false"></uni-nav-bar>
    <!-- 浮动显示 -->
    <view class="float">
      <!-- 定位搜索 -->
      <view class="locsea" @click="search">
        <text>福州</text>
        <text>搜索你想要去的充电桩站点/目的地</text>
      </view>
      <!-- 充电中的设备-浮框 -->
      <view class="fing disflex4" v-show="!fcshow" @click="charge">
        <view class="fcmd">
          <cCircle
            :size="60"
            :percent="percent"
            :animation="true"
            :animationSpeed="5"
            :circleColor="circleColor"
          >
            <span slot="content" class="cmdtx">
              <text>{{ percent }}%</text>
            </span>
          </cCircle>
        </view>
        <view class="vmt">
          <view>闽AD59199</view>
          <view class="fcsm">
            <text>
              实时费用：
              <text class="fcfont">0.03</text>
            </text>
            <text>
              预计剩余：
              <text class="fcfont">00小时57分钟</text>
            </text>
          </view>
        </view>
      </view>
      <!-- 站点浮窗信息 -->
      <view class="fcul" v-if="siteshow">
        <view @click="sitedetail">
          <view class="fcname">
            <image
              v-if="siteData.pictures"
              :src="siteData.pictures"
              mode="heightFix"
            ></image>
            <image
              v-else
              src="../../static/image/logo2.png"
              mode="heightFix"
            ></image>
            <view class="ellipsis">{{ siteData.siteName }}</view>
          </view>
          <view class="fctips">
            <text class="favy">{{ siteData.storeState | storeState }}</text>
            <!-- <text class="xying">歇业中</text> -->
            <text>{{ siteData.businessTime }}</text>
            <text>
              <!-- 对外开放 -->
              {{ siteData.businessType }}
            </text>
            <text>
              <!-- 互联互通 -->
              {{ siteData.operateType }}
            </text>
          </view>
          <view class="fcprice">
            ￥
            <text>{{ siteData.fee }}</text>
          </view>
          <view v-if="siteData.parkDesc" class="fcpark ellipsis">
            停车收费：{{ siteData.parkDesc }}
          </view>
        </view>
        <view class="fcsta" @click="gomap()">
          <view>
            <text>快</text>
            <text class="colx">闲{{ siteData.freeFastNum }}</text>
            <text class="gray">/{{ siteData.fastNum }}</text>
            <text class="pl-30">慢</text>
            <text class="colm">闲{{ siteData.freeSlowNum }}</text>
            <text class="gray">/{{ siteData.slowNum }}</text>
          </view>
          <view class="dwei">{{ siteData.targetDistance }}m</view>
        </view>
      </view>
    </view>
    <!-- 输入电桩编码 -->
    <view class="enterbm" @click="inputcode">输入电桩编码</view>
    <!-- 底部自定义tabBar -->
    <custom-tab-bar></custom-tab-bar>
    <!-- 地图 -->
    <map
      id="myMap"
      style="width: 100%; height: 100%;"
      :show-location="true"
      :enable-zoom="true"
      :latitude="myMap.latitude"
      :longitude="myMap.longitude"
      :markers="markers"
      :scale="myMap.scale"
      @callouttap="callouttap"
      @regionchange="handleRegionchange"
      @tap="tap"
    >
      <cover-view class="cover-view" @click="onControltap">
        <cover-image
          class="cover-image"
          src="../../static/image/map_02.png"
        ></cover-image>
      </cover-view>
      <cover-view slot="callout">
        <template v-for="item in siteListData">
          <cover-view
            class="customCallout-container"
            :marker-id="item.id"
            :key="item.id"
          >
            <cover-view class="customCallout">
              <cover-view class="callout-label">
                闲{{ item.freeNum }}
              </cover-view>
              <cover-view class="callout-content">
                <cover-view class="callout-number">￥{{ item.fee }}</cover-view>
                <cover-view class="callout-text">
                  快{{ item.freeFastNum }} 慢{{ item.freeSlowNum }}
                </cover-view>
              </cover-view>
            </cover-view>
            <cover-view class="callout-mark"></cover-view>
          </cover-view>
        </template>
      </cover-view>
    </map>
  </view>
</template>

<script>
import { findSiteByCoordinate, findSiteById } from '@/api/home.js';
import CustomTabBar from '@/components/CustomTabBar/CustomTabBar.vue';
import cCircle from '@/components/cCircle/cCircle.vue'; //进度环

const scaleObj = {
  3: 1000 * 1000,
  4: 500 * 1000,
  5: 200 * 1000,
  6: 100 * 1000,
  7: 50 * 1000,
  8: 50 * 1000,
  9: 20 * 1000,
  10: 10 * 1000,
  11: 5 * 1000,
  12: 2 * 1000,
  13: 1 * 1000,
  14: 500,
  15: 200,
  16: 100,
  17: 50,
  18: 50,
  19: 20,
  20: 10
};

export default {
  components: {
    CustomTabBar,
    cCircle
  },
  data() {
    return {
      siteshow: false, //站点浮窗是否显示
      fcshow: false, //浮窗信息是否显示
      percent: 80, //进度圈
      circleColor: '#33b048', //进度圈颜色
      // 地图数据
      myMap: {
        latitude: 26.04243, // 纬度
        longitude: 119.216452, //经度
        iconPath: '../../static/image/map_01.png', //图标为空白透明图片
        scale: 16 //缩放级别
      },
      markers: [],
      siteListData: [],
      siteData: {}
    };
  },
  filters: {
    storeState(value) {
      const status = {
        1: '已收藏',
        0: '未收藏'
      };
      return status[value];
    }
  },
  onLoad() {},
  onReady() {
    //   wx请求获取位置权限
    this.getAuthorize()
      .then(() => {
        //   同意后获取
        this.getLocationInfo();
      })
      .catch(() => {
        //   不同意给出弹框，再次确认
        this.openConfirm()
          .then(() => {
            this.getLocationInfo();
          })
          .catch(() => {
            this.rejectGetLocation();
          });
      });
    this.findSiteByCoordinate();
  },
  computed: {},
  methods: {
    // 前往搜索页面
    search() {
      uni.navigateTo({
        url: '../Mine/Search'
      });
    },
    // 前往输入充电桩编码
    inputcode() {
      uni.navigateTo({
        url: '../Charge/Inputcode'
      });
    },
    // 前往电站详情
    sitedetail() {
      uni.navigateTo({
        url: '../../pages/Site/Sitedetail'
      });
    },
    // 前往充电中
    charge() {
      uni.navigateTo({
        url: '../Charge/Charge'
      });
    },
    //   初次位置授权
    getAuthorize() {
      return new Promise((resolve, reject) => {
        uni.authorize({
          scope: 'scope.userLocation',
          success: () => {
            this.getLocationInfo(); // 允许授权
          },
          fail: () => {
            this.openConfirm(); // 拒绝授权
          }
        });
      });
    },
    // 确认授权后，获取用户位置
    getLocationInfo() {
      return new Promise((resolve, reject) => {
        uni.getLocation({
          type: 'wgs84',
          success: res => {
            console.log('当前位置的经度：' + res.longitude);
            console.log('当前位置的纬度：' + res.latitude);
            resolve(res);
          }
        });
      });
    },
    // 拒绝授权后，弹框提示是否手动打开位置授权
    openConfirm() {
      return new Promise((resolve, reject) => {
        uni.showModal({
          title: '请求授权当前位置',
          content: '我们需要获取地理位置信息，为您推荐附近的站点',
          success: res => {
            if (res.confirm) {
              console.log(res, '同意授权');
            } else if (res.cancel) {
              reject();
              this.rejectGetLocation();
            }
          }
        });
      });
    },
    // 彻底拒绝位置获取
    rejectGetLocation() {
      uni.showToast({
        title: '你拒绝了授权，无法获得周边站点信息',
        icon: 'none',
        duration: 2000
      });
    },
    //点击标记气泡
    callouttap(e) {
      const { markerId } = e.detail;
      if (markerId) {
        const data = this.siteListData.find(obj => obj.id === markerId);
        this.myMap.latitude = data.latitude;
        this.myMap.longitude = data.longitude;
        this.findSiteById({
          id: markerId
        });
      }
    },

    findSiteById(params) {
      findSiteById(params).then(({ result }) => {
        console.log(result);
        this.siteData = result;
        this.siteshow = true;
      });
    },
    //视野发生变化时触发
    handleRegionchange(e) {
      console.log(e);
      const { type, detail } = e;
      if (e.type === 'end') {
        const { longitude: lon, latitude: lat } = detail.centerLocation;
        this.findSiteByCoordinate({
          lon,
          lat,
          scale: detail.scale
        });
      }
    },
    findSiteByCoordinate(params) {
      findSiteByCoordinate(params).then(({ result }) => {
        this.markers = result.map(data => {
          return this.setMarker(data);
        });
        this.siteListData = result;
        console.log(result);
      });
    },
    setMarker({ id, longitude, latitude }) {
      return {
        id,
        longitude,
        latitude,
        iconPath: '../../static/image/map_no.png', //图标为空白透明图片
        rotate: 0, // Number - 顺时针旋转的角度，范围 0 ~ 360，默认为 0
        alpha: 1, // 默认1，无透明，范围 0 ~ 1
        width: 0,
        height: 0,
        joinCluster: true,
        customCallout: {
          display: 'ALWAYS'
        }
      };
    },
    tap() {
      this.siteshow = false;
    },
    onControltap() {
      this.getLocationInfo().then(res => {
        console.log(res);
        const { longitude, latitude } = res;
        this.myMap.latitude = latitude;
        this.myMap.longitude = longitude;
      });
    },
    // 前往地图APP
    gomap(e) {
      // #ifdef H5
      const that = this;
      uni.showActionSheet({
        title: '选择地图应用软件',
        itemList: ['腾讯地图', '百度地图', '高德地图'],
        success: e => {
          let url = '';
          let iosDownloadUrl = '';
          let andriodDownloadUrl = '';
          let longitude = 119.216452;
          let latitude = 26.04243;
          let name = '中青大厦'; //
          let address = '福建省福州市闽侯县中青大厦'; //地址
          switch (e.tapIndex) {
            case 0:
              url =
                'qqmap://map/geocoder?coord=${latitude},${longitude}&referer=GOPBZ-RSWK6-Z2CSX-MKQ57-VNKQV-WZBMU'; //key
              break;
            case 1:
              url =
                'baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo';
              break;
            case 2:
              if (this.platform == 'ios') {
                url =
                  'iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0';
              } else {
                url =
                  'androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0';
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
      // #ifndef H5
      uni.getLocation({
        type: 'wgs84',
        success: function(res) {
          console.log('当前位置的经度：' + res.longitude);
          console.log('当前位置的纬度：' + res.latitude);
          let longitude = 119.216452;
          let latitude = 26.04243;
          let name = '中青大厦'; //
          let address = '福建省福州市闽侯县中青大厦'; //地址
          uni.openLocation({
            latitude,
            longitude,
            name,
            address,
            scale: 18 //缩放比例
          });
        }
      });
      // #endif
    }
  }
};
</script>

<style lang="scss" scoped>
.cover-view {
  position: fixed;
  right: 3%;
  bottom: 240rpx;
  z-index: 101;
}
.cover-image {
  width: 110rpx;
  height: 110rpx;
}
// 浮动显示
.float {
  width: 94%;
  position: fixed;
  left: 3%;
  top: 20rpx;
  z-index: 102;
  background: rgba(255, 255, 255, 0.95);
  padding: 16rpx;
  border-radius: 14rpx;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);

  //定位搜索
  .locsea {
    background: #f1f1f1;
    border-radius: 14rpx;
    font-size: 24rpx;
    color: #999;
    padding: 20rpx 0;

    text:nth-child(1) {
      color: #555;
      font-weight: 500;
      padding: 0 30rpx;
      border-right: 1px solid #ddd;
    }
    text:nth-child(2) {
      padding: 0 60rpx;
      border-right: 1px solid #ddd;
      background: url(../../static/image/ico_02.png) 20rpx center no-repeat;
      background-size: 30rpx 30rpx;
      border: none;
    }
  }
  // 站点浮窗信息
  .fcul {
    font-size: 22rpx;
    color: #999;
    .fcname {
      width: 100%;
      padding: 34rpx 0 24rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 32rpx;
      color: #333;
      font-weight: 500;
      image {
        width: auto;
        height: 40rpx;
        margin-right: 10rpx;
      }
      view {
        width: calc(100% - 80rpx);
        height: 40rpx;
        line-height: 40rpx;
      }
    }
    .fctips {
      margin-bottom: 10rpx;
      font-size: 22rpx;
      line-height: 1.2;
      color: #999;
      text {
        display: inline-block;
        padding: 6rpx 10rpx;
        margin-right: 10rpx;
        background: #f1f1f1;
        border-radius: 6rpx;
        margin-bottom: 10rpx;
      }
      .favy {
        color: #fff;
        background-image: linear-gradient(
          to right bottom,
          #ff696a,
          #fa4655,
          #f42542
        );
      }
      .xying {
        background: #999;
        color: #fff;
      }
    }
    .fcprice {
      font-size: 30rpx;
      font-weight: 500;
      color: #333;
      text {
        font-size: 50rpx;
        font-weight: bold;
      }
    }
    .fcpark {
      width: 100%;
      background: url(../../static/image/ico_03.png) left center no-repeat;
      background-size: 30rpx 30rpx;
      padding-left: 36rpx;
      font-size: 22rpx;
      color: #999;
      margin: 10rpx 0 20rpx;
      height: 40rpx;
      line-height: 40rpx;
    }
    .fcsta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-size: 24rpx;
      color: #333;
      font-weight: 500;
      background: #f1f1f1;
      border-radius: 6rpx;
      padding: 10rpx 15rpx;
      .colx {
        color: #f37c2c;
        padding-left: 20rpx;
        letter-spacing: 2px;
      }
      .colm {
        color: #5581ff;
        padding-left: 20rpx;
        letter-spacing: 2px;
      }
      .gray {
        color: #999;
        font-weight: normal;
      }
      .dwei {
        background: url(../../static/image/ico_04.png) right center no-repeat;
        background-size: 25rpx 25rpx;
        padding-right: 30rpx;
      }
    }
  }
  // 充电中的设备-浮框
  .fing {
    color: #333;
    font-weight: 500;
    font-size: 34rpx;
    padding: 30rpx 0 24rpx;
    border-bottom: 1px solid #ddd;
    .fcmd {
      width: 150rpx;
      height: 120rpx;
      display: flex;
      align-items: center;
      flex-direction: column;
      position: relative;
      overflow: hidden;

      .cmdtx {
        position: absolute;
        width: 120rpx;
        margin-top: -20rpx;
        // height: 160rpx;
        left: -6rpx;
        // top: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 28rpx;
        color: #555;
      }
    }
    .vmt {
      margin-top: -14rpx;
    }
    .fcsm {
      font-size: 24rpx;
      font-weight: normal;
      margin-top: 10rpx;
      color: #888;
      .fcfont {
        color: #333;
        font-weight: 500;
        margin-right: 20rpx;
      }
    }
  }
}
//输入电桩编码
.enterbm {
  background: #fff url(../../static/image/ico_01.png) 14rpx center no-repeat;
  background-size: 50rpx 50rpx;
  font-size: 28rpx;
  color: #555;
  font-weight: 500;
  display: inline-block;
  border-radius: 100rpx;
  padding: 20rpx 20rpx 20rpx 70rpx;
  position: fixed;
  right: 3%;
  bottom: 150rpx;
  z-index: 101;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
}
.customCallout-container {
  // width: 170rpx;
  // height: 400rpx;
  position: relative;
  padding-bottom: 20rpx;
  // background-color: #5581ff;
}
.customCallout {
  display: flex;
  align-items: center;
  min-width: 170rpx;
  padding: 16rpx 10rpx;
  background-color: #fff;
  border-radius: 10rpx;
}
.callout-label {
  height: 30rpx;
  padding: 10rpx;
  margin-right: 10rpx;
  background-color: #ff7134;
  color: #fff;
  text-align: center;
  font-size: 24rpx;
  border-radius: 50%;
}
.callout-content {
  font-size: 24rpx;
  color: #999;
}
.callout-number {
  margin-bottom: 10rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: #333;
}
.callout-mark {
  position: absolute;
  left: 50%;
  transform: translateX(-20rpx);
  bottom: -16rpx;
  border: 20rpx solid transparent;
  border-top: 20rpx solid #fff;
}
</style>
