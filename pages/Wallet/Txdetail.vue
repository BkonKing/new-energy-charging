<template>
  <view class="container">
    <view class="txdA">
      <view>提现</view>
      <view class="wanum">
        -{{ dataInfo.realAmount }}
        <text>元</text>
      </view>
    </view>
    <view class="txdB">
      <view class="txditem">
        <text>类型</text>
        <text>提现</text>
      </view>
      <view class="txditem">
        <text>时间</text>
        <text>{{ dataInfo.payTime }}</text>
      </view>
      <view class="txditem">
        <text>余额</text>
        <text>￥{{ dataInfo.afterAmount }}</text>
      </view>
      <view class="txditem">
        <text>状态</text>
        <text>{{ payStatusText }}</text>
      </view>
      <view class="txdms">
        <view class="w-20">明细</view>
        <view class="w-80">
          <view
            v-for="(item, index) in dataInfo.records"
            :key="index"
            class="txmin disflex"
          >
            <view>
              <view>{{item.payChannel | payChannelText}}</view>
              <view class="gray">{{item.payTime}}</view>
            </view>
            <view>￥{{item.realAmount}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { findMemberExtractCash } from '@/api/member.js'

const payStatusText = {
  0: '提现中',
  1: '提现成功',
  2: '提现中',
  3: '已取消',
}

const payChannelText = {
  1: '钱包',
  2: '微信',
  3: '支付宝',
  5: '云闪付',
}

export default {
	data() {
		return {
      id: '',
      dataInfo: {
        records: []
      }
    };
	},
  components: {
    payStatusText() {
      const status = this.dataInfo.payStatus
      return payStatusText[status] || '';
    }
  },
  filters: {
    payChannelText(value) {
      return payChannelText[value];
    }
  },
	onLoad({id}) {
    this.id = id
    this.findMemberExtractCash()
  },
	methods: {
    findMemberExtractCash() {
      findMemberExtractCash({
        id: this.id
      }).then(({result}) => {
        this.dataInfo = result || {}
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30rpx;
}
//提现
.txdA {
  position: relative;
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
  position: relative;
  width: 94%;
  margin: 0 auto 30rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  color: #333;
  line-height: 1.8;
  font-size: 30rpx;
  padding: 30rpx 40rpx 10rpx;
  font-weight: 500;

  .txditem {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 40rpx;
    text:nth-child(1) {
      width: 20%;
    }
    text:nth-child(2) {
      color: #888;
    }
  }
  .txdms {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .txmin {
    padding-bottom: 20rpx;
    border-bottom: 1px dashed #dedede;
    color: #333;
    margin-bottom: 30rpx;
    .gray {
      font-size: 24rpx;
      font-weight: normal;
      color: #999;
    }
  }
}
</style>
