<template>
  <view class="container contact">
    <uni-collapse v-for="(item, index) in qalist" :key="index">
      <uni-collapse-item
        :title="item.qtitle"
        thumb="../../static/image/ico_14.png"
      >
        <view class="content">{{ item.qanswer }}</view>
      </uni-collapse-item>
    </uni-collapse>
    <view class="clearw"></view>
    <view class="wfoot" @click="callme">
      <button class="combutton">{{serviceTel}}</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      qalist: [
        {
          qtitle: '问题1',
          qanswer:
            '答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案'
        },
        {
          qtitle: '问题1',
          qanswer:
            '答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案答案'
        }
      ],
      serviceTel: '4000000000'
    };
  },
  onLoad() {},
  methods: {
    // 拨号
    callme() {
      uni.makePhoneCall({
        phoneNumber: this.serviceTel
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30rpx;
}
.content {
  width: 94%;
  margin: 0 auto;
  border-top: 1px dashed #eee;
  padding: 30rpx 0;
  font-size: 28rpx;
  color: #888;
  line-height: 1.6;
  background: url('@/static/image/ico_15.png') 8rpx 34rpx no-repeat;
  background-size: 40rpx 40rpx;
  padding-left: 60rpx;
}
// 底部按钮
.wfoot {
  width: 100%;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.05);
  background: #fff;
  padding: 30rpx 3%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.clearw {
  height: 180rpx;
  display: block;
}
</style>
