<template>
  <view class="container">
    <view class="cinA">
      <view class="danyu">当前余额：￥{{balances}} 元</view>
      <view class="cinitem">
        <view>
          充值金额
          <text class="cinqi">￥1.00 起充</text>
        </view>
        <view class="cinip disflex4">
          <text>￥</text>
          <input v-model="amount" placeholder="0.00" type="digit" />
        </view>
      </view>
      <view class="cinB">
        <view
          v-for="(item, index) in cinlist"
          :key="index"
          :class="current == index ? 'cinone' : ''"
          @click="cincheck(item, index)"
        >
          <text class="cinpum">{{ item.price }}</text>
          <text>元</text>
        </view>
      </view>
    </view>
    <view class="cintage">请根据实际需求进行充值</view>
    <!-- 付款方式 除微信、支付宝外均显示 -->
    <!-- #ifndef MP-WEIXIN || MP-ALIPAY -->
    <view class="cinC">
      <view class="cinpayt">请选择支付方式</view>
      <view class="radioul">
        <radio-group @change="radioChange">
          <label class="radioli">
            <view class="radname">
              <image src="/static/image/wx.png" mode="widthFix"></image>
              <text>微信钱包</text>
            </view>
            <radio value="1" checked color="#33b048" />
          </label>
          <label class="radioli">
            <view class="radname">
              <image src="/static/image/zfb.png" mode="widthFix"></image>
              <text>支付宝钱包</text>
            </view>
            <radio value="2" color="#33b048" />
          </label>
        </radio-group>
      </view>
    </view>
    <!-- #endif -->
    <view class="paywarp">
      <button class="surepay" :disabled="disabled" :loading="disabled" @click="handleSubmit">充值</button>
    </view>
  </view>
</template>

<script>
import { findMemberByWallet, rechargeMember } from '@/api/member.js';
import { throttle } from '@/common/util.js'

export default {
  data() {
    return {
      cinlist: [
        { price: 5 },
        { price: 10 },
        { price: 20 },
        { price: 50 },
        { price: 100 },
        { price: 200 },
        { price: 500 },
        { price: 1000 }
      ],
      current: undefined,
      amount: undefined,
      channel: undefined,
      balances: 0,
      disabled: false,
      handleSubmit: throttle(this.submit)
    };
  },
  onShow() {
    this.findMemberByWallet()
  },
  methods: {
    findMemberByWallet() {
      findMemberByWallet().then(({result}) => {
        this.balances = result.balances || 0
      })
    },
    // 选中充值金额
    cincheck(data, index) {
      this.current = index;
      this.amount = data.price;
    },
    // 选择支付方式
    radioChange() {},
    submit() {
      if (!this.amount) {
        this.$tip.toast('请输入充值金额');
        return;
      }
      if (parseFloat(this.amount) < 1) {
        this.$tip.toast('￥1.00起充');
        return;
      }
      let channel = 0;
      // #ifdef MP-WEIXIN
      channel = 2;
      // #endif
      // #ifdef MP-ALIPAY
      channel = 3;
      // #endif
      this.rechargeMember({
        amount: this.amount
        // channel
      });
    },
    rechargeMember(params) {
      this.disabled = true
      rechargeMember(params).then(({ result }) => {
        this.requestPayment(result);
      }).finally(() => {
        this.disabled = false
      });
    },
    requestPayment(params) {
      let provider = 'wxpay';
      // #ifdef MP-WEIXIN
      provider = 'wxpay';
      // #endif
      // #ifdef MP-ALIPAY
      provider = 'alipay';
      // #endif
      uni.requestPayment({
        provider,
        ...params,
        // orderInfo:params,
        // orderInfo: {
        //   appid: 'wx499********7c70e', // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
        //   noncestr: 'c5sEwbaNPiXAF3iv', // 随机字符串
        //   package: 'Sign=WXPay', // 固定值
        //   partnerid: '148*****52', // 微信支付商户号
        //   prepayid: 'wx202254********************fbe90000', // 统一下单订单号
        //   timestamp: 1597935292, // 时间戳（单位：秒）
        //   sign: 'A842B45937F6EFF60DEC7A2EAA52D5A0' // 签名，这里用的 MD5/RSA 签名
        // },
        success: res => {
          this.$tip.success('充值成功');
          setTimeout(() => {
            uni.navigateBack({
              delta: 1
            });
          }, 1500);
        },
        fail(e) {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx 0 0;
}
.cinA {
  width: 94%;
  margin: 0 auto 30rpx;
  padding: 0 30rpx 30rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  font-size: 28rpx;
  color: #999;

  .danyu {
    font-size: 30rpx;
    color: #555;
    font-weight: 550;
    line-height: 100rpx;
  }

  .cinitem {
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    padding: 30rpx 0 0;

    .cinip {
      font-size: 34rpx;
      color: #333;
      font-weight: 500;
      padding: 30rpx 0;

      input,
      uni-input {
        color: #333;
        width: 80%;
        height: 52rpx;
        line-height: 52rpx;
        font-size: 52rpx;
        padding: 0;
      }
      .uni-input-placeholder {
        color: #333;
      }
    }
    .cinqi {
      margin-left: 16rpx;
      background: #ffeede;
      color: #f98416;
      font-size: 24rpx;
      padding: 5rpx 10rpx;
      border-radius: 10rpx;
    }
  }
}
.cinB {
  width: 100%;
  padding: 50rpx 0 0 0;
  font-size: 28rpx;
  color: #888;
  overflow: hidden;

  view {
    float: left;
    width: 29%;
    margin: 0 2% 30rpx;
    background: #f7f6fb;
    border: 1px dashed #dedede;
    text-align: center;
    padding: 30rpx 0;
    border-radius: 10rpx;
    font-weight: 500;
    .cinpum {
      font-size: 30rpx;
    }
  }
}
.cinone {
  color: #33b048;
  border: 1px dashed #33b048 !important;
  background: #e6f7e8 !important;
}

.cintage {
  width: 94%;
  margin: 0 auto 50rpx;
  font-size: 28rpx;
  color: #999;
}

// 选择付款方式
.cinC {
  width: 94%;
  margin: 0 auto 30rpx;
  padding: 0 30rpx 30rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  font-size: 30rpx;
  color: #555;

  .cinpayt {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    line-height: 100rpx;
  }
  .radioul {
    .radioli {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx 0;
      border-bottom: 1px solid #ededed;
      .radname {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 10rpx;
          background: #f1f1f1;
          border-radius: 100%;
        }
      }
    }
  }
}
.paywarp {
  padding: 30rpx 0 30rpx;

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
    &[disabled] {
      opacity: 0.6;
    }
  }
}
</style>
