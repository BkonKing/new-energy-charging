<template>
  <view class="container">
    <view class="txdA">
      <!-- 类型为：充值、退款、提现退回 -->
      <block v-if="isAdd">
        <view>{{ payTypeText }}</view>
        <view class="wanum colorb">
          +{{ dataInfo.amount || 0 }}
          <text>元</text>
        </view>
      </block>
      <!-- 类型为：消费、提现 -->
      <block v-else>
        <view>消费</view>
        <view class="wanum">
          -{{ dataInfo.amount || 0 }}
          <text>元</text>
        </view>
      </block>
    </view>
    <view class="txdB">
      <view class="txditem">
        <text class="order-label">订单号</text>
        <view class="d-flex flex-fill" @click="setClipboardData">
          <view class="text-truncate flex-fill width-0">{{ dataInfo.platformOrderNo || '' }}</view>
          <view class="clipboard-text">复制</view>
        </view>
      </view>
      <view class="txditem">
        <text>交易金额</text>
        <text>￥{{ dataInfo.amount || 0 }}</text>
      </view>
      <!-- <view v-if="dataInfo.discountAmount" class="txditem">
        <text>优惠金额</text>
        <text class="colora">-￥{{dataInfo.discountAmount}}</text>
      </view> -->
      <!-- <view class="txditem">
        <text>实际交易金额</text>
        <text>￥{{dataInfo.realAmount || 0}}</text>
      </view> -->
      <view class="txditem">
        <text>交易后余额</text>
        <text class="colorb">￥{{ dataInfo.afterAmount || 0 }}</text>
      </view>
      <view class="txditem">
        <text>支付通道</text>
        <text>{{ payChannelText }}</text>
      </view>
      <view class="txditem">
        <text>支付状态</text>
        <text>{{ payStatusText }}</text>
      </view>
      <view class="txditem">
        <text>支付时间</text>
        <text>{{ dataInfo.payTime || '--' }}</text>
      </view>
    </view>
    <!-- 状态为待支付时显示 -->
    <view v-if="dataInfo.payType == 1 && dataInfo.payStatus == 2" class="paywarp">
      <button
        class="surepay"
        :disabled="disabled"
        :loading="disabled"
        @click="handleClose"
      >
        去支付
      </button>
    </view>
    <view class="clearha"></view>
  </view>
</template>

<script>
import { findMemberExtractCash, afreshRechargeMember } from '@/api/member.js';
import { throttle } from '@/common/util.js';

const payChannelText = {
  1: '钱包',
  2: '微信',
  3: '支付宝',
  5: '云闪付'
};

const payStatusDect = {
  0: '已取消',
  1: '已支付',
  2: '待支付',
  3: '执行中'
};

const payTypeDect = {
  1: '充值',
  2: '提现',
  3: '消费',
  4: '退款',
  5: '提现退回'
};

export default {
  data() {
    return {
      id: '',
      dataInfo: {},
      handleClose: throttle(this.handlePay)
    };
  },
  computed: {
    payChannelText() {
      const status = this.dataInfo.payChannel;
      return payChannelText[status];
    },
    payStatusText() {
      const status = this.dataInfo.payStatus;
      return payStatusDect[status];
    },
    payTypeText() {
      const status = this.dataInfo.payType;
      return payTypeDect[status];
    },
    isAdd() {
      return [1, 4, 5].includes(this.dataInfo.payType);
    }
  },
  onLoad({ id }) {
    this.id = id;
    this.findMemberExtractCash();
  },
  methods: {
    findMemberExtractCash() {
      findMemberExtractCash({
        extractId: this.id
      }).then(({ result }) => {
        this.dataInfo = result || {};
      });
    },
    setClipboardData() {
      uni.setClipboardData({
        data: this.dataInfo.platformOrderNo
      });
    },
    handlePay() {
      this.disabled = true;
      afreshRechargeMember({
        platformOrderNo: this.dataInfo.platformOrderNo
      })
        .then(({ result }) => {
          this.requestPayment(result);
        })
        .finally(() => {
          this.disabled = false;
        });
    },
    requestPayment(params) {
      let provider = 'wxpay';
      // #ifdef MP-ALIPAY
      provider = 'alipay';
      // #endif
      uni.requestPayment({
        provider,
        ...params,
        success: res => {
          this.$tip.success('支付成功');
          this.findMemberExtractCash();
        },
        fail(e) {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx 0;
}
//提现
.txdA {
  width: 94%;
  margin: 0 auto 30rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  color: #555;
  line-height: 1.6;
  text-align: center;
  font-size: 30rpx;
  padding: 30rpx 0;

  .wanum {
    color: #33b048;
    font-size: 80rpx;
    font-weight: bold;
    text {
      font-size: 28rpx;
      margin-left: 10rpx;
    }
  }
}
.txdB {
  width: 94%;
  margin: 0 auto 30rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  color: #333;
  line-height: 1.8;
  font-size: 30rpx;
  padding: 10rpx 40rpx 10rpx;
  font-weight: 500;

  .txditem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed #dedede;
    padding: 24rpx 0;
    text:nth-child(1) {
      color: #888;
    }
    text:nth-child(2) {
      font-weight: 500;
    }
  }
}
.colora {
  color: #33b048;
}
.colorb {
  color: #eb3735 !important;
}
.clearha {
  height: 30rpx;
  clear: both;
}
.paywarp {
  padding: 20rpx 0 30rpx;

  button.surepay,
  uni-button.surepay {
    line-height: 90rpx;
    font-size: 34rpx;
    width: 94%;
    background: #33b048;
    color: #fff;
    font-weight: 500;
    border: 1px solid #33b048;
    box-shadow: 0 0 20rpx 5rpx rgba(45, 255, 80, 0.2);
    border-radius: 100rpx;
    margin: 0rpx auto;
  }
}
.order-label {
  width: 170rpx;
  flex-shrink: 0;
}
.clipboard-text {
  margin-left: 20rpx;
  width: 60rpx;
  font-size: 28rpx;
  color: #33b048;
}
.width-0 {
  width: 0;
}
</style>
