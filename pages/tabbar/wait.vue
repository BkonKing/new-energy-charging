<template>
  <view class="container">
    <!-- #ifdef MP-WEIXIN -->
    <uni-nav-bar
      title="正在开发中"
      :border="false"
      statusBar="false"
    ></uni-nav-bar>
    <!-- #endif -->
    <view class="waitimg">
      <image src="https://yckj-battery-pile.oss-cn-shanghai.aliyuncs.com/nenergy/images/wait.gif" mode="widthFix"></image>
      <view>商城开发中，敬请期待!</view>
    </view>
    <!-- 底部自定义tabBar -->
    <custom-tab-bar></custom-tab-bar>
  </view>
</template>

<script>
import CustomTabBar from '@/components/CustomTabBar/CustomTabBar.vue';
import hideBackHome from '@/mixins/hideBackHome.js';
export default {
  mixins: [hideBackHome],
  components: {
    CustomTabBar
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background: #fff;
}
.waitimg {
  width: 100%;
  padding: 150rpx 0 0rpx;
  margin: 0 auto;
  font-size: 32rpx;
  color: #888;
  line-height: 2;
  text-align: center;
  image {
    width: 50%;
    height: auto;
    margin-bottom: 100rpx;
  }
}
</style>
