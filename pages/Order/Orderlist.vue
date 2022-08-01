<template>
  <view class="container">
    <!-- 暂无记录 显示 -->
    <template v-if="isshow">
      <view class="nodata">- 暂无数据 -</view>
      <button class="gosy" @click="gosy">去充电</button>
    </template>
    <template v-else>
      <view class="ordul" v-for="item in listData" :key="item.id">
        <view class="stcode">
          <text>充电桩编码：{{item.connectorNum}}</text>
          <image
            src="/static/image/ico_10.png"
            mode="widthFix"
            @click="setClipboardData(item.connectorNum)"
          ></image>
        </view>
        <view @click="orderdetail">
          <view class="stname">
            <view class="ellipsis">
              福州市规划设计研究院充电桩福州市规划设计研究院充电桩
            </view>
            <text v-if="item.payStatus">已完成</text>
          </view>
          <view class="stkind disflex4">
            <image src="../../static/image/logo2.png" mode="heightFix"></image>
            <text>逸充新能源</text>
          </view>
          <view class="stbst disflex4">
            <text class="ststar">起</text>
            <text>{{item.connStartTime}}</text>
          </view>
          <view class="stbst disflex4">
            <text class="stend">讫</text>
            <text>{{item.connEndTime}}</text>
          </view>
          <view class="stprice">
            <text>
              ￥
              <text class="stbum">{{item.realAmount}}</text>
            </text>
            <text>| {{item.totalPower}}度</text>
          </view>
        </view>
      </view>
    </template>
    <view class="clearit"></view>
  </view>
</template>

<script>
import { findOrderByMemberId } from '@/api/member.js';

export default {
  data() {
    return { isshow: false, listData: [] };
  },
  onLoad() {
    this.findOrderByMemberId()
  },
  methods: {
    findOrderByMemberId() {
      findOrderByMemberId({
        memberId: '',
        findType: 0 // 全部订单
      }).then(({result}) => {
        this.listData = result || []
      })
    },
    setClipboardData(data) {
      uni.setClipboardData({
        data: `${data}`,
        success: function() {
          console.log('success');
        }
      });
    },
    // 前往去充电首页
    gosy() {
      uni.navigateTo({
        url: '/pages/tabbar/index'
      });
    },
    // 前往订单详情
    orderdetail() {
      uni.navigateTo({
        url: '/pages/Order/Orderdetail'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30rpx;
}
.ordul {
  position: relative;
  width: 94%;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
  border-radius: 14rpx;
  font-size: 26rpx;
  color: #999;
  margin: 0rpx auto 30rpx;
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
      background: url(../../static/image/arrow_01.png) right -5rpx center no-repeat;
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
// 暂无数据
.nodata {
  display: block;
  font-size: 28rpx;
  color: #999;
  line-height: 200rpx;
  text-align: center;
}
.clearit {
  height: 30rpx;
  display: block;
}
button.gosy,
uni-button.gosy {
  position: fixed;
  left: 3%;
  bottom: 60rpx;
  z-index: 5;
  line-height: 90rpx;
  font-size: 34rpx;
  width: 94%;
  background: #33b048;
  color: #fff;
  font-weight: 500;
  border: 1px solid #33b048;
  box-shadow: 0 0 20rpx 10rpx rgba(45, 255, 80, 0.2);
  border-radius: 100rpx;
  margin: 0 auto;
}
</style>
