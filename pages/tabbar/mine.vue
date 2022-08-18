<template>
  <view class="container">
    <view class="myul">
      <!-- A -->
      <view class="myliA disflex3">
        <image
          v-if="avatar"
          :src="avatar"
          mode="widthFix"
          class="myico"
        ></image>
        <image
          v-else
          src="/static/image/logo.jpg"
          mode="widthFix"
          class="myico"
        ></image>
        <view class="myname" v-if="token">{{ username }}</view>
        <view class="myname" @click="login" v-else>请登录</view>
        <view class="yritem">
          <view class="w-40">
            <view class="yrtag">可用余额（元）</view>
            <view>
              ￥
              <text class="yrnum">{{ balances }}</text>
            </view>
          </view>
          <button class="ytx" @click="cashout">提现</button>
          <button class="ycz" @click="cashin">充值</button>
        </view>
      </view>
    </view>
    <!-- B -->
    <view class="myliB">
      <view @click="wallet">
        <image src="/static/image/my_01.png" mode="widthFix"></image>
        <text>我的钱包</text>
      </view>
      <!-- <view @click="mycar">
				<image src="/static/image/my_08.png" mode="widthFix"></image>
				<text>我的爱车</text>
			</view> -->
      <view @click="order">
        <image src="/static/image/my_02.png" mode="widthFix"></image>
        <text>我的订单</text>
      </view>
      <view @click="sitefav">
        <image src="/static/image/my_06.png" mode="widthFix"></image>
        <text>收藏电站</text>
      </view>
    </view>
    <!-- C -->
    <view class="myliB">
      <view @click="renzname">
        <image src="/static/image/my_04.png" mode="widthFix"></image>
        <text>实名认证</text>
        <text v-if="hasCertification === 1" class="ztpos">
          已认证
        </text>
      </view>
      <view @click="renzcard">
        <image src="/static/image/my_05.png" mode="widthFix"></image>
        <text>我的银行卡</text>
      </view>
      <view @click="billitem">
        <image src="/static/image/my_03.png" mode="widthFix"></image>
        <text>发票报销</text>
      </view>
      <view @click="fixsent">
        <image src="/static/image/my_07.png" mode="widthFix"></image>
        <text>故障报修</text>
      </view>
      <view @click="contact">
        <image src="/static/image/my_09.png" mode="widthFix"></image>
        <text>联系客服</text>
      </view>
    </view>
    <view class="loginout" @click="handleLogout">账号登出</view>
    <view class="cleard"></view>
    <!-- 头部底图色 -->
    <view class="myimg"></view>
    <!-- 底部自定义tabBar -->
    <custom-tab-bar></custom-tab-bar>
  </view>
</template>

<script>
import { findMemberByWallet } from '@/api/member.js';
import { mapGetters } from 'vuex';
import hideBackHome from '@/mixins/hideBackHome.js';
import CustomTabBar from '@/components/CustomTabBar/CustomTabBar.vue';
export default {
  mixins: [hideBackHome],
  components: {
    CustomTabBar
  },
  data() {
    return {
      balances: 0
    };
  },
  computed: {
    ...mapGetters(['token', 'username', 'avatar', 'hasCertification'])
  },
  onShow() {
    if (this.token) {
      this.getUserInfo();
      this.findMemberByWallet();
    }
  },
  methods: {
    // 前往登录
    login() {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    },
    handleLogout() {
      this.$tip.confirm('是否退出当前账号').then(() => {
        this.logout()
      })
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.userInfo = {};
        this.balances = 0;
      });
    },
    getUserInfo() {
      this.$store.dispatch('getUserInfo').then(({ result }) => {
        this.userInfo = result || {};
      });
    },
    findMemberByWallet() {
      findMemberByWallet().then(({ result }) => {
        this.balances = result.balances || 0;
      });
    },
    // 前往我的钱包
    wallet() {
      uni.navigateTo({
        url: '/pages/Wallet/Wallet'
      });
    },
    // 前往我的爱车
    mycar() {
      uni.navigateTo({
        url: '/pages/Car/Carlist'
      });
    },
    // 前往我的订单
    order() {
      uni.navigateTo({
        url: '/pages/Order/Orderlist'
      });
    },
    // 前往实名认证
    renzname() {
      if (this.hasCertification) {
        return
      }
      uni.navigateTo({
        url: '/pages/Renz/Renzname'
      });
    },
    // 前往银行卡
    renzcard() {
      uni.navigateTo({
        url: '/pages/Renz/Renzcard'
      });
    },
    // 收藏电站
    sitefav() {
      uni.navigateTo({
        url: '/pages/Site/Sitefav'
      });
    },
    // 前往提现
    cashout() {
      uni.navigateTo({
        url: '/pages/Wallet/Cashout'
      });
    },
    // 前往充值
    cashin() {
      uni.navigateTo({
        url: '/pages/Wallet/Cashin'
      });
    },
    // 前往故障报修
    fixsent() {
      uni.navigateTo({
        url: '/pages/Mine/Fixsent'
      });
    },
    // 联系客服
    contact() {
      uni.navigateTo({
        url: '/pages/Mine/Contact'
      });
    },
    // 前往发票报销
    billitem() {
      uni.navigateTo({
        url: '/pages/Bill/Billitem'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  z-index: 0;
  width: 100%;
}
.myimg {
  width: 100%;
  background: #33b048;
  height: 300rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
// 主体
.myul {
  width: 100%;
  padding: 80px 0 0;
}
// A
.myliA {
  width: 94%;
  margin: 0 auto 30rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  font-size: 22rpx;
  color: #999;

  .myico {
    width: 160rpx;
    height: 160rpx;
    margin: -80rpx auto 20rpx;
    border-radius: 500rpx;
    background: #efefef;
  }
  .myname {
    font-size: 30rpx;
    color: #555;
    font-weight: 500;
    margin-bottom: 30rpx;
  }
  .yritem {
    width: 100%;
    padding: 30rpx;
    border-top: 2px dashed #f5f5f5;
    font-size: 30rpx;
    color: #333;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .yrnum {
      font-size: 44rpx;
      font-weight: bold;
    }
    .yrtag {
      font-size: 22rpx;
      color: #999;
      font-weight: normal;
      margin-bottom: 10rpx;
    }
    button.ycz,
    uni-button.ycz {
      width: 25%;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 30rpx;
      background: #33b048;
      color: #fff;
      font-weight: 500;
      border: 1px solid #33b048;
      border-radius: 100rpx;
    }
    button.ytx,
    uni-button.ytx {
      width: 25%;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 30rpx;
      background: #fff;
      color: #33b048;
      font-weight: 500;
      border: 1px solid #33b048;
      border-radius: 100rpx;
    }
  }
}
// B
.myliB {
  width: 94%;
  margin: 0 auto 30rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  font-size: 30rpx;
  color: #555;
  font-weight: 500;
  padding: 0 30rpx;

  view {
    position: relative;
    background: url(/static/image/arrow_02.png) right center no-repeat;
    background-size: 20rpx 20rpx;
    padding: 30rpx 0;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    image {
      width: 40rpx;
      height: 40rpx;
      margin-right: 20rpx;
    }
    .ztpos {
      color: red;
      font-size: 26rpx;
      font-weight: normal;
      position: absolute;
      right: 30rpx;
      top: 36rpx;
      z-index: 1;
    }
  }
}
// 登出
.loginout {
  text-align: center;
  line-height: 3;
  font-size: 28rpx;
  color: #33b048;
}
.cleard {
  clear: both;
  display: block;
  height: 200rpx;
}
</style>
