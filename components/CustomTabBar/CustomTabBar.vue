<template>
  <!-- 底部自定义tabBar -->
  <view class="tmenu">
    <view class="tm40">
      <view @click="goPage(0)">
        <image
          v-if="active === 0"
          src="/static/image/bar_01a.png"
          mode="widthFix"
        ></image>
        <image v-else src="/static/image/bar_01.png" mode="widthFix"></image>
        <text>首页</text>
      </view>
      <view @click="goPage(1)">
        <image
          v-if="active === 1"
          src="/static/image/bar_02a.png"
          mode="widthFix"
        ></image>
        <image v-else src="/static/image/bar_02.png" mode="widthFix"></image>
        <text>站点</text>
      </view>
    </view>
    <view class="tmscan" @click="handleScan">
      <image src="/static/image/scan.png" mode="widthFix"></image>
    </view>
    <view class="tm40">
      <view @click="goPage(2)">
        <image
          v-if="active === 2"
          src="/static/image/bar_03a.png"
          mode="widthFix"
        ></image>
        <image v-else src="/static/image/bar_03.png" mode="widthFix"></image>
        <text>商城</text>
      </view>
      <view @click="goPage(3)">
        <image
          v-if="active === 3"
          src="/static/image/bar_04a.png"
          mode="widthFix"
        ></image>
        <image v-else src="/static/image/bar_04.png" mode="widthFix"></image>
        <text>我的</text>
      </view>
    </view>
  </view>
</template>

<script>
import scanCode from '@/mixins/scanCode.js';

const routeObj = {
  'pages/tabbar/index': 0,
  'pages/tabbar/sitelist': 1,
  'pages/tabbar/wait': 2,
  'pages/tabbar/mine': 3
};
const pages = {
  0: 'pages/tabbar/index',
  1: 'pages/tabbar/sitelist',
  2: 'pages/tabbar/wait',
  3: 'pages/tabbar/mine'
};

export default {
  name: 'CustomTabBar',
  mixins: [scanCode],
  data() {
    return {
      active: 0
    };
  },
  created() {
    const { route } = getCurrentPages()[0];
    this.active = routeObj[route];
  },
  methods: {
    goPage(key) {
      if (this.active === key) {
        return;
      }
      uni.reLaunch({
        url: pages[key]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// 底部tabbar
.tmenu {
  width: 100%;
  background: #fff;
  padding: 0rpx 0;
  line-height: 30rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
  padding-bottom: $iosAreaBottomConstant;
  padding-bottom: $iosAreaBottomEnv;
  .tm40 {
    width: 38%;
    display: flex;
    align-items: center;
    justify-content: center;
    view {
      width: 50%;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 20rpx 0;
      font-size: 22rpx;
      color: #555;
      image {
        width: 46rpx;
        height: 46rpx;
      }
    }
  }
  .tmscan {
    width: 24%;
    display: flex;
    align-items: center;
    justify-content: center;
    image {
      width: 170rpx;
      height: 170rpx;
      margin-top: -60rpx;
    }
  }
}
</style>
