<template>
  <view class="container">
    <uni-nav-bar title="首页" :border="false" statusBar="false"></uni-nav-bar>
    <!-- 浮动显示 -->
    <view class="float" :style="{ top: `${statusBarHeight + 44}px` }">
      <!-- 定位搜索 -->
      <view class="locsea" @click="search">
        <text>福州</text>
        <text>搜索你想要去的充电桩站点/目的地</text>
      </view>
      <!-- 充电中的设备-浮框 -->
      <view class="fing" v-show="orderVisible" @click="charge">
        <view v-for="item in orderList" :key="item.id" class="disflex4">
          <view class="fcmd">
            <cCircle
              :size="60"
              :percent="item.soc"
              :animation="true"
              :animationSpeed="5"
              :circleColor="circleColor"
            >
              <span slot="content" class="cmdtx">
                <text>{{ item.soc }}%</text>
              </span>
            </cCircle>
          </view>
          <view class="vmt">
            <view>{{ item.connectorNum || '' }}</view>
            <view class="fcsm">
              <text>
                实时费用：
                <text class="fcfont">{{ item.realAmount }}元</text>
              </text>
              <text>
                预计剩余：
                <text class="fcfont">{{ item.remainChargeTime || '--'}}</text>
              </text>
            </view>
          </view>
        </view>
      </view>
      <!-- 站点浮窗信息 -->
      <view class="fcul" v-if="siteshow">
        <site-card :data="siteData"></site-card>
      </view>
    </view>
    <view v-if="hasLocationPermission" class="cover-view" @click="onControltap">
      <image
        class="cover-image"
        src="/static/image/map_02.png"
      ></image>
    </view>
    <!-- 输入电桩编码 -->
    <view class="enterbm" @click="inputcode">输入电桩编码</view>
    <!-- 底部自定义tabBar -->
    <custom-tab-bar></custom-tab-bar>
    <!-- 地图 -->
    <map
      id="map"
      ref="map"
      style="width: 100%; height: 100%;"
      :show-location="true"
      :enable-zoom="true"
      :latitude="myMap.latitude"
      :longitude="myMap.longitude"
      :markers="markers"
      :scale="myMap.scale"
      :enable-rotate="false"
      @callouttap="callouttap"
      @regionchange="handleRegionchange"
      @tap="tap"
    >
      <cover-view slot="callout">
        <template v-for="(item, index) in siteListData">
          <cover-view
            class="customCallout-container"
            :marker-id="index"
            :key="item.id"
          >
            <cover-view class="customCallout">
              <cover-view class="callout-label">
                闲{{ item.freeNum || 0 }}
              </cover-view>
              <cover-view class="callout-content">
                <cover-view class="callout-number">
                  ￥{{ item.fee || 0 }}
                </cover-view>
                <cover-view class="callout-text">
                  快{{ item.freeFastNum || 0 }} 慢{{ item.freeSlowNum || 0 }}
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
import { findSiteByCoordinate, findSiteById } from '@/api/site.js';
import { findOrderByMemberId } from '@/api/member.js';
import CustomTabBar from '@/components/CustomTabBar/CustomTabBar.vue';
import cCircle from '@/components/cCircle/cCircle.vue'; //进度环
import SiteCard from '@/modules/SiteCard.vue';
import { qqScaleObj } from '@/common/constants.js'
import { convert2TecentMap } from '@/common/util.js'

export default {
  components: {
    CustomTabBar,
    cCircle,
    SiteCard
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
        iconPath: '/static/image/map_01.png', //图标为空白透明图片
        scale: 16 //缩放级别
      },
      currentLocation: {
        latitude: 0,
        longitude: 0
      },
      markers: [],
      siteListData: [],
      siteData: {},
      orderList: [],
      statusBarHeight: 0,
      mapContext: null,
      hasLocationPermission: false
    };
  },
  computed: {
    orderVisible() {
      return !!this.orderList.length;
    }
  },
  onLoad() {
    this.findOrderByMemberId();
  },
  onShow() {
    !this.hasLocationPermission && this.getLocationInfo();
  },
  mounted() {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    this.mapContext = uni.createMapContext('map', this);
  },
  methods: {
    getLocationInfo() {
      this.$store
        .dispatch('getLocationInfo')
        .then(({ longitude, latitude }) => {
          this.hasLocationPermission = true
          this.myMap.longitude = longitude;
          this.myMap.latitude = latitude;
          this.currentLocation.longitude = longitude;
          this.currentLocation.latitude = latitude;
        })
        .catch(() => {
          this.hasLocationPermission = false
          this.rejectGetLocation();
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
      const { markerId: index } = e.detail;
      if (index > -1) {
        const data = this.siteListData[index];
        this.myMap.latitude = data.latitude;
        this.myMap.longitude = data.longitude;
        this.findSiteById({
          id: data.id,
          lon: this.currentLocation.longitude,
          lat: this.currentLocation.latitude
        });
      }
    },
    findSiteById(params) {
      findSiteById(params).then(({ result }) => {
        this.siteData = result || [];
        this.siteshow = true;
      });
    },
    findOrderByMemberId() {
      findOrderByMemberId({
        findType: 1, // 0:全部订单，1:充电中和等待充电
        pageSize: 2,
        pageNo: 1
      }).then(({ result }) => {
        this.orderList = result.orderInfo?.records || [];
      });
    },
    //视野发生变化时触发
    handleRegionchange(e) {
      // console.log('handleRegionchange', e);
      const { type, detail } = e;
      if (e.type === 'end') {
        const { longitude: lon, latitude: lat } = detail.centerLocation;
        this.mapContext.getScale({
          success: ({ scale }) => {
            this.findSiteByCoordinate({
              lon,
              lat,
              distance: qqScaleObj[Math.floor(scale)]
              // todo: 测试
              // lon: 119.28411,
              // lat: 26.048446,
              // distance: 10000000
            });
          },
          fail: () => {
            this.findSiteByCoordinate({
              lon,
              lat,
              distance: qqScaleObj[this.myMap.scale]
            });
          }
        });
      }
    },
    findSiteByCoordinate(params) {
      findSiteByCoordinate(params).then(({ result }) => {
        const siteListData = result.siteInfo || [];
        this.markers = siteListData.map((data, index) => {
          return this.setMarker(data, index);
        });
        this.siteListData = siteListData
      });
    },
    setMarker({ id, longitude, latitude }, index) {
      const { lon, lat} = convert2TecentMap({
        lon: +longitude,
        lat: +latitude
      })
      return {
        id: index,
        longitude: lon,
        latitude: lat,
        iconPath: '/static/image/map_no.png', //图标为空白透明图片
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
      this.mapContext.moveToLocation({
        //moveToLocation将地图中心移动到当前定位点，需要配合map组件的show-location使用
        latitude: this.currentLocation.latitude,
        longitude: this.currentLocation.longitude
      });
    },
    // 前往搜索页面
    search() {
      uni.navigateTo({
        url: '/pages/Mine/Search'
      });
    },
    // 前往输入充电桩编码
    inputcode() {
      uni.navigateTo({
        url: '/pages/Charge/Inputcode'
      });
    },
    // 前往充电中
    charge() {
      uni.navigateTo({
        url: '/pages/Charge/Charge'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
}
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
  // width: 94%;
  width: 100%;
  position: fixed;
  // left: 3%;
  left: 0;
  top: 20rpx;
  z-index: 102;
  background: rgba(255, 255, 255, 0.95);
  padding: 16rpx;
  border-radius: 0 0 14rpx 14rpx;
  // box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);

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
  }
  // 充电中的设备-浮框
  .fing {
    color: #333;
    font-weight: 500;
    font-size: 34rpx;
    padding: 30rpx 0 24rpx;
    border-bottom: 1px solid #ddd;
    .disflex4 + .disflex4 {
      margin-top: 20rpx;
    }
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
