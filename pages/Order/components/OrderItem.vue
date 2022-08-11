<template>
  <view class="ordul">
    <view class="stcode">
      <text>充电桩编码：{{ data.connectorNum }}</text>
      <image
        src="/static/image/ico_10.png"
        mode="widthFix"
        @click="setClipboardData(data.connectorNum)"
      ></image>
    </view>
    <view @click="handleClick">
      <view class="stname">
        <view class="ellipsis">
          {{data.siteName}}
        </view>
        <text v-if="data.payStatus">已完成</text>
      </view>
      <view class="stkind disflex4">
        <image src="/static/image/logo2.png" mode="heightFix"></image>
        <text>逸充新能源</text>
      </view>
      <view class="stbst disflex4">
        <text class="ststar">起</text>
        <text>{{ data.startTime }}</text>
      </view>
      <view class="stbst disflex4">
        <text class="stend">讫</text>
        <text>{{ data.endTime }}</text>
      </view>
      <view class="stprice">
        <text>
          ￥
          <text class="stbum">{{ data.realAmount }}</text>
        </text>
        <text>| {{ data.totalPower }}度</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'OrderItem',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'list'
    }
  },
  methods: {
    setClipboardData(data) {
      uni.setClipboardData({
        data: `${data}`
      });
    },
    handleClick() {
      if (this.type === 'select') {
        uni.$emit('selectOrder', this.data);
        uni.navigateBack({
          delta: 1
        });
        return;
      }
      this.goOrderDetail();
    },
    // 前往订单详情
    goOrderDetail() {
      uni.navigateTo({
        url: '/pages/Order/Orderdetail'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ordul {
  position: relative;
  width: 94%;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
  border-radius: 14rpx;
  font-size: 26rpx;
  color: #999;
  margin: 30rpx auto 0;
  padding: 20rpx 30rpx;
  .stcode {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 60rpx;
    image {
      width: 30rpx;
      height: 30rpx;
      margin-left: 20rpx;
    }
  }
  .stname {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
    line-height: 60rpx;
    view {
      width: 75%;
    }
    text {
      color: #33b048;
      font-size: 28rpx;
      // font-weight: normal;
      background: url(/static/image/arrow_01.png) right -5rpx center no-repeat;
      background-size: 30rpx 30rpx;
      padding-right: 25rpx;
    }
  }
  .stkind {
    font-size: 28rpx;
    color: #555;
    line-height: 60rpx;
    image {
      width: auto;
      height: 40rpx;
      margin-right: 10rpx;
    }
  }
  .stbst {
    line-height: 60rpx;
    .ststar {
      background: #edab99;
      font-size: 22rpx;
      color: #fff;
      width: 40rpx;
      height: 40rpx;
      vertical-align: middle;
      text-align: center;
      line-height: 40rpx;
      border-radius: 100rpx;
      margin-right: 15rpx;
    }
    .stend {
      background: #afc3ee;
      font-size: 22rpx;
      color: #fff;
      width: 40rpx;
      height: 40rpx;
      vertical-align: middle;
      text-align: center;
      line-height: 40rpx;
      border-radius: 100rpx;
      margin-right: 15rpx;
    }
  }
  .stprice {
    position: absolute;
    right: 30rpx;
    bottom: 20rpx;
    line-height: 60rpx;
    font-size: 26rpx;
    color: #555;
    font-weight: 500;
    .stbum {
      font-size: 34rpx;
      margin-right: 10rpx;
    }
  }
}
</style>
