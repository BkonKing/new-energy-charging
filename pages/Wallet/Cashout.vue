<template>
  <view class="container">
    <view class="coutA">
      <view class="outitem">
        <view>提现金额</view>
        <view class="outip disflex4">
          <text>￥</text>
          <input v-model="amount" placeholder="0.00" type="digit" @blur="handleBlur" />
        </view>
      </view>
      <view class="cotip">
        <text>可提现金额：￥{{ balances }}</text>
        <text class="alltx" @click="cashOutAll">全部提现</text>
      </view>
      <button class="suretx" :disabled="disabled" :loading="disabled" @click="handleSubmit">2小时内到账，确定提现</button>
    </view>
    <view class="cotts">
      <view>温馨提示</view>
      <view>1、存在未结束订单时无法进行提现操作。</view>
      <view>2、充值金额涉及充值优惠，退款时扣除相应的优惠金额。</view>
      <view>3、6个月订单原路退回。</view>
    </view>
    <!-- 弹框 -->
    <pop ref="popA" direction="below" :is_close="true" :is_mask="true" :width="100" height="fit-content" :maskFun="true" @watchOpen="watchOpen" @watchClose="watchClose">
      <view class="tcwarp">
        <view class="taxtA">
          <view>余额提现</view>
          <view class="taxnum">{{ amount }}</view>
        </view>
        <scroll-view scroll-y="true" class="Dview">
          <!-- 原路返回 -->
          <block v-if="!isshow">
            <view class="txmin disflex" v-for="t in 2">
              <view>
                <view>支付宝充值</view>
                <view class="gray">2022.06.16 14:40</view>
              </view>
              <view>￥10.00</view>
            </view>
          </block>
          <!-- 提现至 -->
          <view class="taxfor" @click="$refs.popB.show()" v-else>
            <text>提现至</text>
            <view class="txfid">
              <image :src="activeBank.logo" mode="widthFix"></image>
              <text>{{ activeBank.bankName }}（{{ activeBank.cardNo | cardNoSubstr }}）</text>
            </view>
          </view>
        </scroll-view>
        <button class="sureco" :disabled="disabled" :loading="disabled" @click="handleWithdraw">确认提现</button>
      </view>
    </pop>

    <!-- 弹框 提现至-->
    <pop ref="popB" direction="below" :is_close="true" :is_mask="true" :width="100" height="fit-content" :maskFun="true" @watchOpen="watchOpen" @watchClose="watchClose">
      <view class="tcwarp">
        <view class="tctitle">请选择</view>
        <scroll-view scroll-y="true" class="radiowp">
          <radio-group @change="radioChange">
            <label v-for="item in bankList" class="radioli" :key="item.id">
              <view class="radname">
                <image :src="item.logo" mode="widthFix"></image>
                <text>{{ item.bankName }}（{{ item.cardNo | cardNoSubstr }}）</text>
              </view>
              <radio :value="item.id" :checked="bankId === item.id" color="#33b048" />
            </label>
          </radio-group>
        </scroll-view>
        <view class="glcard" @click="goRenzcard">管理银行卡</view>
      </view>
    </pop>
    <view v-if="showToast" class="toast">{{ toastText }}</view>
  </view>
</template>

<script>
import { throttle } from '@/common/util.js';
import { findMemberBanks, withdrawalMember, findMemberByWallet } from '@/api/member.js';
import pop from '@/components/ming-pop/ming-pop.vue'; //弹框

export default {
  components: {
    pop
  },
  data() {
    return {
      isshow: true,
      balances: 0.0,
      amount: undefined,
      bankId: '',
      activeBank: {},
      bankList: [],
      showToast: false,
      toastText: '',
      disabled: false,
      handleSubmit: throttle(this.submit),
      handleWithdraw: throttle(this.withdrawToBank),
    };
  },
  watch: {
    showToast(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    }
  },
  filters: {
    cardNoSubstr(value) {
      return value ? value.substr(-4, 4) : '';
    }
  },
  onShow() {
    this.findMemberByWallet();
    this.findMemberBanks();
  },
  methods: {
    findMemberByWallet() {
      findMemberByWallet().then(({ result }) => {
        this.balances = result?.balances || 0.0;
      });
    },
    findMemberBanks() {
      findMemberBanks().then(({ result }) => {
        this.bankList = result || [];
        // this.bankList = []
        if (this.bankList.length > 0) {
          this.activeBank = result[0];
          this.bankId = this.activeBank.id;
        }
      });
    },
    cashOutAll() {
      this.amount = this.balances;
    },
    handleBlur() {
      if (this.amount > this.balances) {
        this.amount = this.balances;
        return;
      }
      if (this.amount < 0) {
        this.amount = 0;
      }
    },
    submit() {
      if (!this.validateAmount()) {
        return;
      }
      this.withdrawalMember({
        amount: this.amount
      });
    },
    validateAmount() {
      if (!this.amount || parseFloat(this.amount) <= 0) {
        this.$tip.toast('请输入提现金额');
        return false;
      }
      if (parseFloat(this.amount) > this.balances) {
        this.$tip.toast('提现金额不能大于可提现金额');
        return false;
      }
      return true;
    },
    openBank() {
      if (parseFloat(this.amount) <= 0) {
        this.$tip.toast('请输入提现金额');
        return;
      }
      if (this.bankList.length === 0) {
        this.$refs.popB.show();
        return;
      }
      this.$refs.popA.show();
    },
    // 弹框支付方式单选
    radioChange(event) {
      this.bankId = event.detail.value;
      this.activeBank = this.bankList.find(obj => obj.id === this.bankId) || {};
      this.$refs.popB.close();
      this.$refs.popA.open();
    },
    withdrawToBank() {
      if (!this.validateAmount()) {
        return;
      }
      if (!this.bankId) {
        this.$tip.toast('请选择提现的银行卡');
        return;
      }
      this.withdrawalMember({
        amount: this.amount,
        channel: 1, // 1：银行卡；
        bankId: this.bankId
      });
    },
    withdrawalMember(params) {
      this.disabled = true;
      withdrawalMember(params).then(({ result }) => {
        if (+result.status === 1) {
          this.toastText = '您的充值订单全部超过六个月，无法原路退还，请提现到银行卡';
          this.showToast = true;
          this.openBank();
          return;
        }
        if (+result.status === 2) {
          this.toastText = `您有${result.amount}元可原路退还，剩余充值金额超过六个月无法原路返回，请提现到银行卡`;
          this.amount = result.noAmount;
          this.showToast = true;
          this.findMemberByWallet();
          this.openBank();
          return;
        }
        this.$tip.success('提交成功，请耐心等待');
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          });
        }, 1500);
      }).finally(() => {
        this.disabled = false
      });
    },
    watchOpen() {},
    watchClose() {},
    // 前往银行卡
    goRenzcard() {
      uni.navigateTo({
        url: '/pages/Renz/Renzcard'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30rpx;
}

.coutA {
  position: relative;
  width: 94%;
  margin: 0 auto 30rpx;
  padding: 0 30rpx 10rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  font-size: 30rpx;
  color: #555;

  .couchos {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx 0;
    background: url('@/static/image/arrow_01.png') right center no-repeat;
    background-size: 30rpx 30rpx;

    .couid {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: 500;
      margin-right: 40rpx;
      image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 10rpx;
      }
    }
  }
  .outitem {
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    padding: 30rpx 0 0;

    .outip {
      font-size: 40rpx;
      color: #333;
      font-weight: 500;
      padding: 30rpx 0;

      input,
      uni-input {
        width: 80%;
        height: 52rpx;
        font-size: 52rpx;
        line-height: 52rpx;
        color: #333;
      }
      // .uni-input-placeholder {
      //   color: #333;
      // }
    }
  }
  .cotip {
    font-size: 28rpx;
    color: #999;
    padding: 30rpx 0;

    .alltx {
      color: #33b048;
      margin-left: 20rpx;
    }
  }
  button.suretx,
  uni-button.suretx {
    line-height: 90rpx;
    font-size: 34rpx;
    width: 100%;
    background: #33b048;
    color: #fff;
    font-weight: 500;
    border: 1px solid #33b048;
    box-shadow: 0 0 20rpx 0rpx rgba(45, 255, 80, 0.2);
    border-radius: 100rpx;
    margin: 40rpx auto;
    &[disabled] {
      opacity: 0.6;
    }
  }
}
/* 温馨提示 */
.cotts {
  width: 93%;
  font-size: 28rpx;
  line-height: 1.8;
  color: #888;
  font-weight: 500;
  margin: 50rpx auto;
}

.cotts view {
  margin-bottom: 10rpx;
}

.cotts view:first-child {
  margin-bottom: 20rpx;
  font-size: 32rpx;
  color: #33b048;
}
// 弹框
.tcwarp {
  background: #fff;
  padding-bottom: 150rpx;
  // 提现金额
  .taxtA {
    padding: 50rpx 0;
    line-height: 1.6;
    font-size: 32rpx;
    color: #333;
    font-weight: 550;
    text-align: center;
    .taxnum {
      color: #33b048;
      font-size: 74rpx;
    }
  }
  .Dview {
    width: 100%;
    max-height: 50vh;
    // overflow-y: scroll;
    margin: 0 auto;
  }
  // 原路返回 明细
  .txmin {
    width: 90%;
    padding-bottom: 20rpx;
    border-bottom: 1px dashed #dedede;
    color: #333;
    line-height: 1.6;
    margin: 0 auto 30rpx;
    .gray {
      font-size: 24rpx;
      font-weight: normal;
      color: #999;
    }
  }
  // 提现至银行卡
  .taxfor {
    width: 90%;
    margin: 0 auto 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40rpx 0 40rpx;
    background: url('@/static/image/arrow_01.png') right center no-repeat;
    background-size: 30rpx 30rpx;
    font-size: 30rpx;
    color: #555;
    .txfid {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: 500;
      color: #333;
      font-size: 32rpx;
      margin-right: 30rpx;
      image {
        width: 50rpx;
        height: 50rpx;
        background: #f1f1f1;
        border-radius: 100%;
        margin-right: 20rpx;
      }
    }
  }

  .tctitle {
    width: 100%;
    background: #eee;
    font-size: 34rpx;
    font-weight: 500;
    color: #333;
    line-height: 100rpx;
    text-align: center;
  }
  .radiowp {
    width: 92%;
    // min-height: 320rpx;
    max-height: 50vh;
    // overflow-y: scroll;
    margin: 0 auto;
    font-size: 30rpx;
    color: #555;
    padding: 30rpx 0 0;
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
  .glcard {
    position: fixed;
    left: 3%;
    bottom: 30rpx;
    z-index: 11;
    width: 94%;
    line-height: 80rpx;
    font-size: 32rpx;
    color: #fe5f5e;
    border-radius: 100rpx;
    border: 1px solid #fe5f5e;
    text-align: center;
  }
  button.sureco,
  uni-button.sureco {
    position: fixed;
    left: 3%;
    bottom: 30rpx;
    z-index: 11;
    width: 94%;
    line-height: 80rpx;
    font-size: 34rpx;
    background: #33b048;
    color: #fff;
    font-weight: 500;
    border: 1px solid #33b048;
    border-radius: 100rpx;
    margin: 0rpx auto;
  }
}

.toast {
  max-width: 300rpx;
  padding: 20rpx;
  position: fixed;
  top: 50%;
  left: 50%;
  font-size: 28rpx;
  transform: translate(-50%, -50%);
  border-radius: 10rpx;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
}
</style>
