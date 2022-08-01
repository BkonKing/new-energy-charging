<template>
  <view class="container">
    <view class="wlogin">
      <template v-if="isshow">
        <view class="wslogen">欢迎来到逸充新能源</view>
        <image
          src="../../static/image/logo.png"
          mode="widthFix"
          class="wlogo"
        ></image>
        <text>该程序将获取以下授权:</text>
        <text class="wtips">获得您的公开信息（昵称、头像等）</text>
        <button class="wbtA" @click="getUserInfo">允许</button>
        <view class="wreject">拒绝</view>
      </template>
      <template v-else>
        <button
          class="wbtB"
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
        >
          微信用户一键登录
        </button>
        <!-- #ifdef MP-ALIPAY -->
        <button class="wbtB">支付宝用户一键登录</button>
        <!-- #endif -->
        <view class="wxiey">
          登录即同意
          <text>《逸充新能源使用协议》</text>
        </view>
      </template>
    </view>
    <pop
      ref="popB"
      direction="below"
      height="fit-content"
      :is_close="true"
      :is_mask="true"
      :width="100"
      :maskFun="true"
    >
      <div class="authorize-popup">
        <div class="d-flex align-items-center">
          <image
            src="/static/image/logo.png"
            mode="widthFix"
            class="logo"
          ></image>
          <view class="font-size-lg">逸充新能源</view>
        </div>
        <div class="font-size-lg font-weight-bold mt-40">
          获取你的昵称、头像
        </div>
        <div class="font-size-sm mt-20">完善用户信息</div>
        <div class="d-flex disflex mt-20 userInfo-box">
          <div class="d-flex align-items-center">
            <div class="wx-avatar mr-20">
              <open-data type="userAvatarUrl"></open-data>
            </div>
            <div>
              <div>
                <open-data class="font-size-sm" type="userNickName"></open-data>
              </div>
              <div class="font-size-sm">微信昵称头像</div>
            </div>
          </div>
          <icon type="success_no_circle"></icon>
        </div>
        <div class="font-size-sm mt-30">使用其他昵称头像</div>
        <div class="d-flex just-content-around mt-40">
          <button class="btn" @click="closePop">拒绝</button>
          <button class="btn" type="primary" @click="getUserInfo">允许</button>
        </div>
      </div>
    </pop>
  </view>
</template>

<script>
import { getUserInfo } from '@/common/util.js';
import pop from '@/components/ming-pop/ming-pop.vue'; //弹框

export default {
  components: {
    pop
  },
  data() {
    return {
      isshow: true,
      userInfo: {}
    };
  },
  onLoad() {},
  methods: {
    login() {
      uni.login({
        provider: 'weixin',
        success: function(loginRes) {
          console.log(loginRes.authResult);
        }
      });
    },
    openPop() {
      this.$refs.popB.show();
    },
    closePop() {
      this.$refs.popB.close();
    },
    getUserInfo() {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: res => {
          console.log('res.userInfo', res.userInfo);
          this.userInfo = res.userInfo || {};
        },
        complete: res => {
          this.isshow = false;
        }
      });
    },
    getPhoneNumber(e) {
      console.log(e);
      console.log(e.detail.errMsg);
      console.log(e.detail.iv);
      console.log(e.detail.encryptedData);
    }
  }
};
</script>

<style lang="scss" scoped>
.wlogin {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 32rpx;
  color: #555;
  line-height: 2;
}
.wslogen {
  width: 100%;
  background: #fff;
  font-size: 60rpx;
  color: #333;
  text-align: center;
  line-height: 180rpx;
}
.wlogo {
  width: 140rpx;
  height: 140rpx;
  border-radius: 20rpx;
  margin: 140rpx 0;
}
.wtips {
  font-size: 28rpx;
  color: #999;
}
button.wbtA,
uni-button.wbtA {
  line-height: 100rpx;
  font-size: 34rpx;
  width: 60%;
  background: #33b048;
  color: #fff;
  font-weight: 500;
  border: 1px solid #33b048;
  box-shadow: 0 0 20rpx 10rpx rgba(45, 255, 80, 0.2);
  border-radius: 100rpx;
  margin: 150rpx 0 60rpx;
}
.wreject {
  font-size: 34rpx;
  color: #777;
  font-weight: 500;
}
button.wbtB,
uni-button.wbtB {
  line-height: 100rpx;
  font-size: 34rpx;
  width: 80%;
  background: #33b048;
  color: #fff;
  font-weight: 500;
  border: 1px solid #33b048;
  box-shadow: 0 0 20rpx 10rpx rgba(45, 255, 80, 0.2);
  border-radius: 100rpx;
  margin: 40% 0 60rpx;
}
.wxiey {
  position: fixed;
  bottom: 60rpx;
  left: 0;
  z-index: 2;
  width: 100%;
  text-align: center;
  font-size: 30rpx;
  color: #999;
  line-height: 3;

  text {
    color: #33b048;
    padding: 0 10rpx;
  }
}
.authorize-popup {
  padding: 24rpx 40rpx;
  .logo {
    width: 60rpx;
    height: 60rpx;
    margin-right: 20rpx;
  }
  .userInfo-box {
    padding: 10rpx 0;
    border-top: 2rpx solid $uni-border-color;
    border-bottom: 2rpx solid $uni-border-color;
  }
  .wx-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 10rpx;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 200rpx;
  }
}
</style>
