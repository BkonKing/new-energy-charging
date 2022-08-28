<template>
  <view class="container">
    <!-- 加载动画 -->
    <view
      class="loaditem"
      @touchmove.stop.prevent="moveHandle"
      v-show="loadshwo"
    >
      <view>请稍等，正在通知设备给电……</view>
    </view>
    <view class="PcoA">
      <view class="zduan">
        <view class="zdshop ellipsis" @click="goSitedetail">
          <text class="zdkind">{{ operateTypeText }}</text>
          <text>{{ terminalData.siteName }}</text>
        </view>
        <view class="zdcode">
          <text>终端编号：{{ terminalData.connectorNum }}</text>
          <text class="zdcope" @click="setClipboardData">复制</text>
        </view>
        <view class="zdtime">
          当前时段：{{ terminalData.startTime || '00:00' }}-{{ terminalData.endTime || '00:00'  }}
        </view>
        <view class="zdprice">
          <text>{{ terminalData.fee || 0 }}</text>
          元/度
        </view>
        <view class="zdtime">
          <text>电费：{{ terminalData.electricityFee || 0 }}元/度</text>
          <text>服务费：{{ terminalData.serviceFee || 0 }}元/度</text>
        </view>
        <view class="zdtips">只充电，不占位；充电结束后请及时离场，谢谢！</view>
      </view>
    </view>
    <!-- 支付方式 -->
    <view class="odtitem">
      <view class="otbig">支付方式</view>
      <view class="otkind">
        <text
          v-for="(item, index) in paykind"
          :key="index"
          :class="paykindcurrent == index ? 'otkindck' : ''"
          @click="paykindcheck(index)"
        >
          {{ item }}
        </text>
      </view>
      <!-- <view class="otli">
        <text>电站优惠</text>
        <view class="fufei">服务费6.5折</view>
      </view> -->
      <!-- 余额付 -->
      <view class="payYue" v-if="paykindcurrent == 0">
        <!-- <view>预付金额</view>
        <view class="py_sm">预计可充电1.09度，可行驶22.95公里</view> -->
        <view class="disflex">
          <text class="py_num">￥{{ walletData.totalAssets || 0 }}</text>
          <text class="py_gcz" @click="cashin">充值</text>
        </view>
      </view>
      <!-- 预授权 -->
      <view class="otli" v-if="paykindcurrent == 1" @click="payYsq">
        <text>预付金额</text>
        <text class="otfor">请选择预付金额</text>
      </view>
      <!-- 信用付 -->
      <view class="payXy" v-if="paykindcurrent == 2">
        <view class="disflex">
          <text>授信额度</text>
          <text>￥100</text>
        </view>
        <!-- #ifndef MP-ALIPAY -->
        <view class="Xyitem">
          <image src="../../static/image/xy_wx.png" mode="widthFix"></image>
          <view class="Xynr disflex">
            <view>
              <view>微信支付分·先充电后付费</view>
              <view class="Xy_sm">微信支付分550分及以上，先充电后付款</view>
            </view>
            <view class="Xyopen" v-if="xyshow">去开通</view>
            <image
              class="xyget"
              src="/static/image/ico_13.png"
              mode="widthFix"
              v-else
            ></image>
          </view>
        </view>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <view class="Xyitem">
          <image src="../../static/image/xy_zm.png" mode="widthFix"></image>
          <view class="Xynr disflex">
            <view>
              <view>开通芝麻信用·先充电后付费</view>
              <view class="Xy_sm">芝麻信用650分及以上，先充电后付款</view>
            </view>
            <view class="Xyopen" v-if="!xyshow">去开通</view>
            <image
              class="xyget"
              src="../../static/image/ico_13.png"
              mode="widthFix"
              v-else
            ></image>
          </view>
        </view>
        <!-- #endif -->
      </view>
    </view>
    <!-- 车辆选择 -->
    <!-- <view class="odtitem">
			<view class="otli" @click="mycar">
				<view>
					<view>车辆选择</view>
					<view class="ot_sm">选择充电车辆 充电更安全</view>
				</view>
				<view class="textfr otcar">
					<view>闽AD59199</view>
					<view class="ot_sm">北京EU5</view>
				</view>
			</view>
		</view> -->
    <!-- 充电策略 -->
    <view class="odtitem">
      <view class="otli">
        <view>充电策略</view>
        <view class="otcl">
          <text
            v-for="(item, index) in chargeStrategyOptions"
            :key="index"
            :class="chargeStrategyValue == item.value ? 'otcl_a' : ''"
            @click="planCdcheck(item)"
          >
            {{ item.label }}
          </text>
        </view>
      </view>
      <view class="otli" v-if="chargeStrategyValue == 1">
        <view>
          <view>限定金额</view>
          <view class="ot_sm">可用余额：{{ walletData.balances }}元</view>
        </view>
        <view class="otxip">
          <input
            v-model="amount"
            placeholder="请输入充电金额(￥)"
            type="digit"
          />
        </view>
      </view>
    </view>
    <!-- 结算策略 -->
    <!-- <view class="odtitem">
			<view class="otli">
				<view>结算策略</view>
				<view class="otcl">
					<text v-for="(item, index) in planAs" :key="index" :class="planAscurrent == index ? 'otcl_a' : ''" @click="planAscheck(index)">{{ item }}</text>
				</view>
			</view>
			<view class="zsnote" v-if="planAscurrent == 0">自动结算：订单结束后会按照系统计算的最优方式结算</view>
			<view class="zsnote" v-if="planAscurrent == 1">充电结束24H内可自行进行支付，超过24H则会使用系统计算出最终价格进行结算</view>
		</view> -->
    <view class="clearw"></view>
    <view class="wfoot">
      <button class="combutton" :disabled="disabled" :loading="disabled" @click="handleSubmit">启动充电</button>
    </view>
  </view>
</template>

<script>
import { findConnectorByNum } from '@/api/site.js';
import { findMemberByWallet, startCharge } from '@/api/member.js';
import { throttle } from '@/common/util.js'

const operateTypeDict = {
  1: '直营',
  2: '联营',
  3: '互联互通',
  4: '他营'
};

export default {
  data() {
    return {
      connectorNum: '',
      terminalData: {},
      // 支付方式
      paykind: ['余额付' /* , '预授权', '信用付' */],
      paykindcurrent: 0,
      // 充电策略
      chargeStrategyOptions: [
        {
          label: '限定金额',
          value: 1
        }
        /* '自动充满', */
      ],
      chargeStrategyValue: 1,
      // 结算策略
      planAs: ['自动结算', '手动结算'],
      planAscurrent: 0,
      //开通信用-显示
      xyshow: true,
      amount: undefined,
      walletData: {},
      // 加载动画显示
      loadshwo: false,
      disabled: false,
      handleSubmit: throttle(this.submitCharge)
    };
  },
  computed: {
    operateTypeText() {
      return operateTypeDict[this.terminalData.operateType] || '';
    }
  },
  onLoad({ connectorNum }) {
    this.connectorNum = connectorNum;
  },
  onShow() {
    this.findConnectorByNum();
    this.findMemberByWallet();
  },
  methods: {
    findConnectorByNum() {
      findConnectorByNum({
        connectorNum: this.connectorNum
      }).then(({ result }) => {
        this.terminalData = result || {};
      });
    },
    findMemberByWallet() {
      findMemberByWallet().then(({ result }) => {
        this.walletData = result || {};
        console.log('wallet', this.walletData);
      });
    },
    // 前往终端详情
    goSitedetail() {
      uni.navigateTo({
        url: `/pages/Site/Sitedetail?id=${this.terminalData.siteId}`
      });
    },
    setClipboardData(data) {
      uni.setClipboardData({
        data: this.terminalData.connectorNum
      });
    },
    // 选中支付方式
    paykindcheck(index) {
      this.paykindcurrent = index;
    },
    // 选中充电策略
    planCdcheck({ value }) {
      this.chargeStrategyValue = value;
    },
    // 选中结算策略
    planAscheck(index) {
      this.planAscurrent = index;
    },
    // 前往充值
    cashin() {
      uni.navigateTo({
        url: '../Wallet/Cashin'
      });
    },
    // 前往预授权
    payYsq() {
      uni.navigateTo({
        url: './PayYsq'
      });
    },
    submitCharge() {
      const value = parseFloat(this.amount);
      if (!value) {
        this.$tip.toast('请输入金额');
        return;
      }
      if (value > this.walletData.balances) {
        this.$tip.toast('余额不足，请先充值');
        return;
      }
      const max = 500;
      const min = 5;
      if (value < min) {
        this.$tip.toast(`限定金额最少为${min}元`);
        return;
      }
      if (value > max) {
        this.$tip.toast(`限定金额最大为${max}元`);
        return;
      }
      this.startCharge();
    },
    startCharge() {
      this.disabled = true
      // 000000001：逸充新能源-APP；000000002：逸充新能源-微信；000000003：逸充新能源-支付宝；
      let chargeChannel = '000000002';
      // #ifdef MP-ALIPAY
      chargeChannel = '000000003'
      // #endif
      // #ifdef APP
      chargeChannel = '000000001'
      // #endif
      startCharge({
        amount: this.amount,
        connectorNum: this.connectorNum,
        chargeStrategy: this.chargeStrategyValue,
        chargeChannel
      }).then(({result}) => {
        this.goCharge(result.orderId);
      }).finally(() => {
        this.disabled = false
      });
    },
    // 前往开始充电
    goCharge(orderId) {
      uni.redirectTo({
        url: `/pages/Charge/Charge?connectorNum=${this.connectorNum}&orderId=${orderId}`
      });
    },
    // 前往车辆选择
    mycar() {
      uni.navigateTo({
        url: '../Car/Carlist'
      });
    },
    // 禁止外壳页面手指上下滑动
    moveHandle() {
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30rpx;
}
.PcoA {
  width: 94%;
  margin: 0 auto 30rpx;
  padding: 30rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  font-size: 28rpx;
  color: #999;

  .zdshop {
    width: 100%;
    font-size: 34rpx;
    color: #333;
    font-weight: 500;
    line-height: 2;
    .zdkind {
      font-size: 22rpx;
      font-weight: normal;
      color: #33b048;
      border: 1px solid #33b048;
      padding: 4rpx 10rpx;
      border-radius: 4px;
      margin-right: 10rpx;
    }
  }
  .zdcode {
    font-size: 30rpx;
    color: #555;
    margin: 10rpx 0 10rpx;
    .zdcope {
      font-size: 28rpx;
      color: #33b048;
      margin-left: 20rpx;
    }
  }
  .zdtime {
    font-size: 24rpx;
    color: #999;
    text + text {
      margin-left: 14rpx;
    }
  }
  .zdprice {
    font-size: 24rpx;
    color: #999;
    margin: 10rpx 0;
    text {
      font-size: 50rpx;
      font-weight: 500;
      color: #33b048;
      font-weight: bold;
      margin-right: 10rpx;
    }
  }

  .zdtips {
    margin: 20rpx 0 0;
    font-size: 22rpx;
    line-height: 1.4;
    color: #999;
    background: #eee;
    border-radius: 6rpx;
    text-align: center;
    padding: 10rpx 0;
  }
}
// item
.odtitem {
  position: relative;
  width: 94%;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
  border-radius: 14rpx;
  font-size: 30rpx;
  color: #333;
  margin: 0rpx auto 30rpx;
  padding: 34rpx 30rpx 20rpx;

  .otbig {
    font-size: 34rpx;
    font-weight: 500;
    margin-bottom: 20rpx;
  }
  .otli {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
    font-weight: 500;
    line-height: 1.8;
    .fufei {
      font-size: 28rpx;
      color: #999;
      font-weight: normal;
    }
    .otfor {
      background: url('@/static/image/arrow_01.png') right center no-repeat;
      background-size: 30rpx 30rpx;
      padding-right: 50rpx;
      font-size: 34rpx;
      margin: 10rpx 0 0;
    }
    .otcar {
      background: url('@/static/image/arrow_01.png') right center no-repeat;
      background-size: 30rpx 30rpx;
      padding-right: 50rpx;
    }

    .ot_sm {
      font-size: 24rpx;
      font-weight: normal;
      color: #999;
    }
    // 限定金额充电
    .otxip {
      width: 400rpx;
      font-weight: 500;
      color: #333;
      line-height: 50rpx;

      input,
      uni-input {
        text-align: right;
        color: #333;
        font-size: 40rpx;
        margin-left: 10rpx;
      }
      .uni-input-placeholder {
        color: #999;
        font-size: 30rpx;
      }
    }
    // 策略小按钮
    .otcl {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 26rpx;

      text {
        border: 1px solid #ddd;
        border-radius: 6rpx;
        padding: 5rpx 10rpx;
        display: inline-block;
        color: #bbb;
        margin-left: 20rpx;
      }
      .otcl_a {
        border: 1px solid #333;
        color: #4c4c64;
      }
    }
  }
  // 选择类型
  .otkind {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 30rpx;
    font-size: 28rpx;
    color: #888;
    line-height: 1.4;
    text {
      padding: 10rpx 20rpx;
      background: #f7f6fb;
      border: 1px solid #ddd;
      border-radius: 6rpx;
      margin-left: 30rpx;
    }
    .otkindck {
      background: #4c4c64;
      color: #fff;
      border: 1px solid #333 !important;
    }
  }
  // 余额付
  .payYue {
    margin-bottom: 20rpx;
    font-weight: 500;
    line-height: 1.8;
    .py_sm {
      font-size: 26rpx;
      // font-weight: normal;
      color: #ff7134;
    }
    .py_num {
      font-size: 70rpx;
      color: #333;
    }
    .py_gcz {
      color: #ff7134;
      font-size: 30rpx;
      border: 1px solid #ff7134;
      padding: 0 20rpx;
      border-radius: 10rpx;
    }
  }
  // 信用付
  .payXy {
    font-weight: 500;
    margin-bottom: 20rpx;
    line-height: 1.8;
    .Xyitem {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      image {
        width: 60rpx;
        height: 60rpx;
        margin: 30rpx 20rpx 30rpx 0;
      }
      .Xynr {
        width: calc(100% - 80rpx);
        padding: 30rpx 0;
        border-bottom: 1px solid #ededed;
      }
      .Xy_sm {
        font-size: 24rpx;
        font-weight: normal;
        color: #999;
      }
      .Xyopen {
        font-size: 26rpx;
        color: #ff7134;
      }
      image.xyget {
        width: 50rpx;
        height: 50rpx;
        margin: 0;
      }
    }
  }
}
.zsnote {
  border-top: 1px solid #ddd;
  font-size: 26rpx;
  color: #999;
  padding-top: 20rpx;
}
.textfr {
  text-align: right;
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
// 加载动画
.loaditem {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 101;

  view {
    width: 70%;
    border-radius: 20rpx;
    background: rgba(0, 0, 0, 0.7) url('@/static/image/loading_1.gif') center
      50rpx no-repeat;
    background-size: 100rpx 100rpx;
    color: #fff;
    font-size: 28rpx;
    padding: 200rpx 20rpx 30rpx;
    text-align: center;
    margin: 60% auto 0;
  }
}
.combutton[disabled] {
  opacity: 0.6;
}
</style>
