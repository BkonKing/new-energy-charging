<template>
  <view class="container">
    <view class="odtitle">
      <view class="disflex4">
        <text>{{ payStatusText }}</text>
        <text v-if="orderInfo.payStatus === 2" class="weip">
          剩
          <uni-countdown
            class="weit"
            color="#333"
            :show-day="false"
            :font-size="26"
            :showColon="false"
            :showDay="false"
            :hour="countDownHour"
            :minute="countDownMinute"
            :second="countDownSecond"
          />
          自动结算订单
        </text>
      </view>
      <view class="disflex4 order-number-box">
        <text class="order-label">
          订单编号：{{ orderInfo.platformOrderNo || '--' }}
        </text>
        <text
          class="tcope"
          @click="setClipboardData(orderInfo.platformOrderNo)"
        >
          复制
        </text>
      </view>
    </view>
    <!-- 费用信息 -->
    <view class="odtitem">
      <view class="otbig">费用信息</view>
      <view class="otli">
        <text>订单总额</text>
        <view class="otmx">
          <view>
            ￥
            <text class="otmx_num">{{ orderInfo.totalAmount || 0 }}</text>
          </view>
          <view class="otmx_sm">
            <text class="mr-20">
              电费:￥{{ orderInfo.totalElectricAmount || 0 }}
            </text>
            <text>服务费:￥{{ orderInfo.totalServiceAmount || 0 }}</text>
          </view>
        </view>
      </view>
      <!-- <view class="otli">
				<text>电站优惠</text>
				<view class="otmx">
					<view class="colgreen">
						-￥
						<text class="otmx_num">0.05</text>
					</view>
					<view class="otmx_sm"><text>服务费6.5折</text></view>
				</view>
			</view> -->
      <!-- <view class="otli">
				<text>结算策略</text>
				<text class="otcl">手动结算</text>
			</view> -->
      <view v-if="orderInfo.payStatus === 1" class="sfmon">
        <view>
          <text class="mr-20">实付金额</text>
          <text>￥</text>
          <text class="sfnum">{{ orderInfo.totalAmount || 0 }}</text>
        </view>
        <view>个人账户</view>
      </view>
    </view>
    <!-- 充电信息 -->
    <view class="odtitem">
      <view class="otbig">充电信息</view>
      <view class="stbst disflex4">
        <text class="ststar">起</text>
        <text>{{ orderInfo.startTime }}</text>
      </view>
      <view class="stbst disflex4">
        <text class="stend">讫</text>
        <text>{{ orderInfo.endTime }}</text>
      </view>
      <view class="reson">
        <text>停止原因：{{ orderInfo.stopReason || '--' }}</text>
        <text>
          SOC:{{ orderInfo.startSoc || 0 }}%-{{ orderInfo.endSoc || 0 }}%
        </text>
      </view>
      <view class="otli">
        <text>充电车辆</text>
        <view class="otmx">
          <view>{{ orderInfo.plateNo || '--' }}</view>
          <!-- <view class="otmx_sm">北京EU5</view> -->
        </view>
      </view>
      <view class="otli">
        <text>充电时长</text>
        <view class="otmx">{{chargeTime }}</view>
      </view>
      <view class="otli">
        <text>充电电量</text>
        <view class="otmx">{{ orderInfo.totalPower || '--' }}度</view>
      </view>
      <view class="sechart" @click="orderchart">查看充电曲线</view>
    </view>
    <!-- 终端信息 -->
    <view class="odtitem">
      <view class="otbig">终端信息</view>
      <view class="zduan" @click="sitedetail">
        <view class="zdshop ellipsis">
          <text class="zdkind">自营</text>
          <text>{{ orderInfo.siteName }}</text>
        </view>
        <view class="zdcode">
          <text>终端编号：{{ orderInfo.connectorNum || '--' }}</text>
          <text
            class="zdcope"
            @click.stop="setClipboardData(orderInfo.connectorNum)"
          >
            复制
          </text>
        </view>
      </view>
    </view>
    <view v-if="orderInfo.payStatus === 2" class="paywarp">
      <button
        class="surepay"
        :disabled="disabled"
        :loading="disabled"
        @click="handleClose"
      >
        立即支付
      </button>
    </view>
    <view class="clearit"></view>
  </view>
</template>

<script>
import { findChargeOrder, closeMemberOrder } from '@/api/member.js';
import { throttle } from '@/common/util.js';
const payStatusDict = {
  0: '已关闭',
  1: '已支付',
  2: '待支付',
  3: '执行中'
};
export default {
  data() {
    return {
      orderId: '',
      orderInfo: {},
      disabled: false,
      countDownHour: 0,
      countDownMinute: 0,
      countDownSecond: 0,
      handleClose: throttle(this.closeMemberOrder)
    };
  },
  computed: {
    payStatusText() {
      const key = this.orderInfo.payStatus;
      return payStatusDict[key] || '--';
    },
    chargeTime() {
      const value = this.orderInfo.chargeTime
      if (value) {
        return this.formatTime(value)
      }
      return '--'
    }
  },
  onLoad({ orderId }) {
    this.orderId = orderId;
    this.findChargeOrder();
  },
  methods: {
    findChargeOrder() {
      findChargeOrder({
        orderId: this.orderId
      }).then(({ result }) => {
        const { order, chargeInfo, electricEnergyTrend } = result;
        this.orderInfo = order || {};
      });
    },
    closeMemberOrder() {
      this.disabled = true;
      closeMemberOrder({
        orderId: this.orderId
      })
        .then(({ result }) => {
          this.$tip.success('支付成功');
          this.findChargeOrder();
        })
        .finally(() => {
          this.disabled = false;
        });
    },
    setClipboardData(data) {
      uni.setClipboardData({
        data: `${data}`,
        success: function() {
          console.log('success');
        }
      });
    },
    formatTime(time) {
      let h = parseInt((time / 60 / 60) % 24);
      h = h < 10 ? '0' + h : h;
      let m = parseInt((time / 60) % 60);
      m = m < 10 ? '0' + m : m;
      let s = parseInt(time % 60);
      s = s < 10 ? '0' + s : s;
      return `${h}时${m}分${s}秒`
    },
    // 前往充电曲线
    orderchart() {
      uni.navigateTo({
        url: `/pages/Order/Orderchart?orderId=${this.orderId}`
      });
    },
    // 前往终端详情
    sitedetail() {
      uni.navigateTo({
        url: `/pages/Site/Sitedetail?id=${this.orderInfo.siteId}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.odtitle {
  font-size: 28rpx;
  color: #333;
  padding: 30rpx 4%;

  view:first-child {
    font-size: 44rpx;
    font-weight: 550;
    line-height: 90rpx;
    margin-bottom: 10rpx;
  }
  .weip {
    font-size: 22rpx;
    color: #888;
    border: 1px solid #888;
    line-height: 1.2;
    padding: 4rpx 10rpx;
    font-weight: normal;
    margin-left: 20rpx;

    .weit {
      font-size: 26rpx;
      font-weight: 500;
      color: #333;
      padding: 0 6rpx;
    }
  }
  .order-label {
    max-width: 610rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tcope {
    width: 58rpx;
    margin-left: 20rpx;
    color: #33b048;
  }
}
.odtitem {
  position: relative;
  width: 94%;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
  border-radius: 14rpx;
  font-size: 30rpx;
  color: #333;
  margin: 0rpx auto 30rpx;
  padding: 30rpx 30rpx;

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
    .otmx {
      text-align: right;
      .otmx_num {
        font-size: 34rpx;
        font-weight: 550;
      }
      .otmx_sm {
        font-size: 24rpx;
        font-weight: normal;
        color: #999;
      }
    }
    .otcl {
      border: 1px solid #777;
      border-radius: 6rpx;
      padding: 5rpx 10rpx;
      display: inline-block;
      color: #777;
      font-size: 28rpx;
    }
  }
  // 实际金额
  .sfmon {
    margin-top: 30rpx;
    border-top: 1px solid #ededed;
    padding-top: 20rpx;
    text-align: right;
    font-size: 28rpx;
    line-height: 1.4;
    .sfnum {
      font-size: 50rpx;
      font-weight: 550;
    }
    view:nth-child(2) {
      font-size: 24rpx;
      font-weight: normal;
      color: #999;
    }
  }
  // 查看曲线
  .sechart {
    width: 60%;
    text-align: center;
    font-size: 28rpx;
    color: #777;
    line-height: 60rpx;
    border: 1px solid #777;
    border-radius: 100rpx;
    margin: 40rpx 20% 10rpx;
  }
  // 充电起讫
  .stbst {
    font-size: 28rpx;
    line-height: 60rpx;
    .ststar {
      background: #edab99;
      font-size: 24rpx;
      color: #fff;
      width: 44rpx;
      height: 44rpx;
      vertical-align: middle;
      text-align: center;
      line-height: 44rpx;
      border-radius: 100rpx;
      margin-right: 15rpx;
    }
    .stend {
      background: #afc3ee;
      font-size: 24rpx;
      color: #fff;
      width: 44rpx;
      height: 44rpx;
      vertical-align: middle;
      text-align: center;
      line-height: 44rpx;
      border-radius: 100rpx;
      margin-right: 15rpx;
    }
  }
  .reson {
    font-size: 28rpx;
    color: #33b048;
    line-height: 50rpx;
    padding-bottom: 20rpx;
    margin: 10rpx 0 20rpx;
    border-bottom: 1px solid #ededed;
    display: flex;
    flex-direction: column;
  }
  // 终端信息
  .zduan {
    width: 100%;
    background: url(../../static/image/arrow_01.png) right center no-repeat;
    background-size: 50rpx 50rpx;
    padding-right: 60rpx;
    .zdshop {
      width: 100%;
      font-size: 30rpx;
      color: #333;
      font-weight: 500;
      line-height: 60rpx;
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
      font-size: 28rpx;
      color: #777;
      margin: 20rpx 0 10rpx;
      .zdcope {
        color: #33b048;
        margin-left: 20rpx;
      }
    }
  }
}
.colgreen {
  color: #33b048;
}
.clearit {
  height: 30rpx;
  display: block;
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
.order-number-box {
}
</style>
