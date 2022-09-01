<template>
  <view class="container">
    <view class="botitle">
      <text>电子发票</text>
      <text class="bstatus">已开票</text>
    </view>
    <view class="pd24">
      <view class="boitem">
        <text>发票抬头</text>
        <text>附件逸充物联网科技有限公司</text>
      </view>
      <view class="boitem">
        <text>纳税号码</text>
        <text>454654354545</text>
      </view>
      <view class="boitem">
        <text>发票金额</text>
        <text>300.00元</text>
      </view>
      <view class="boitem">
        <text>申请事件</text>
        <text>2022-04-06 12:23:33</text>
      </view>
      <view class="boitem">
        <text>电话号码</text>
        <text>13800000000</text>
      </view>
      <view class="boitem">
        <text>单位地址</text>
        <text>福建声卡街坊邻居</text>
      </view>
      <view class="boitem">
        <text>银行账号</text>
        <text>6222000012340236123</text>
      </view>
      <view class="boitem">
        <text>开户银行</text>
        <text>中国工商银行五一支行</text>
      </view>
    </view>
    <view class="botitle">接收信息</view>
    <view class="pd24">
      <view class="boitem">
        <text>电子邮件</text>
        <text>123@123.com</text>
      </view>
    </view>
    <view class="pd24 bord" @click="billinclure">
      <view>1张发票，含4个订单</view>
    </view>
    <view class="clearw"></view>
    <view class="wfoot">
      <button class="combutton" @click="repeatSent()">重发发票</button>
    </view>
    <!-- 提现弹框 -->
    <view class="maskbg" v-if="mshow">
      <view class="swarp">
        <view class="stitle">重发发票</view>
        <input placeholder="请输入电子邮件" />
        <view class="sbtv">
          <button class="cancel" @click="Sentcancel()">取消</button>
          <button>提交</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      mshow: false
    };
  },
  onLoad() {},
  methods: {
    // 弹框
    watchOpen() {},
    watchClose() {},
    // 点击重新发票
    repeatSent() {
      this.mshow = true;
    },
    // 点击弹框取消按钮
    Sentcancel() {
      this.mshow = false;
    },
    //前往所含订单
    billinclure() {
      uni.navigateTo({
        url: './Billinclure'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.botitle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #555;
  font-size: 30rpx;
  font-weight: 500;
  padding: 0 24rpx;
  line-height: 80rpx;

  .bstatus {
    font-size: 28rpx;
    color: #fe5f5e;
  }
}
.pd24 {
  background: #fff;
  display: block;
  padding: 0rpx 24rpx;
}
.boitem {
  width: 100%;
  display: flex;
  // align-items: center;
  justify-content: space-between;
  font-size: 30rpx;
  color: #999;
  padding: 30rpx 0;
  border-bottom: 1px solid #eaeaea;
  line-height: 1.4;

  text:nth-child(2) {
    color: #555;
    width: 75%;
    text-align: right;
  }
}
.boitem:last-child {
  border-bottom: none;
}
.bord {
  margin: 30rpx 0;
  view {
    background: url(../../static/image/arrow_01.png) right center no-repeat;
    background-size: 40rpx 40rpx;
    font-size: 30rpx;
    color: #555;
    font-weight: 500;
    padding: 30rpx 0;
  }
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
// 弹框
.maskbg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  .swarp {
    width: 84%;
    background: #fff;
    border-radius: 20rpx;

    .stitle {
      width: 100%;
      line-height: 100rpx;
      color: #fff;
      font-size: 34rpx;
      text-align: center;
      background: #333;
      border-radius: 20rpx 20rpx 0 0;
    }

    uni-input,
    input {
      display: block;
      width: 84%;
      color: #555;
      font-weight: 500;
      text-align: center;
      font-size: 32rpx;
      margin: 40rpx auto 80rpx;
      border-bottom: 1px solid #ddd;
      line-height: 100rpx;
      height: 100rpx;
    }

    .sbtv {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 84%;
      margin: 0 auto 30rpx;

      uni-button,
      button {
        width: 40%;
        display: inline-block;
        line-height: 80rpx;
        font-size: 30rpx;
        background: #33b048;
        color: #fff;
        // font-weight: 500;
        border: none;
        border-radius: 10rpx;
      }

      .cancel {
        color: #999;
        background: #ddd;
      }
    }
  }
}
</style>
