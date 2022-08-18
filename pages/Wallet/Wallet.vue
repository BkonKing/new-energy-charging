<template>
  <view class="container">
    <z-paging v-model="billList" ref="paging" :fixed="true" @query="queryList">
      <!-- 余额 -->
      <view class="wallA">
        <view class="wali">
          <view>资产总额</view>
          <view class="wanum">{{ walletData.totalAssets || 0 }}</view>
        </view>
        <view class="waol disflex">
          <view>
            <text>可用余额</text>
            <text class="wonum">{{ walletData.balances || 0 }}</text>
          </view>
          <view>
            <text>冻结余额</text>
            <text class="wonum">{{ walletData.frozenAmount || 0 }}</text>
          </view>
        </view>
        <view class="watisw disflex3" v-show="tipshow">
          <text>总金额-冻结金额</text>
          <text>（待支付金额）</text>
        </view>
        <image
          src="/static/image/ico_12.png"
          class="watip"
          mode="widthFix"
          @click="showtip"
        ></image>
      </view>
      <view class="wbchos">
        <view class="wbdmx">
          <text>收入{{ walletData.inSummary || 0 }}元</text>
          <text>支出{{ walletData.expSummary || 0 }}元</text>
        </view>
        <view class="datawp" @click="showPicker">
          <!-- hy:默认显示为当天 -->
          <text style="color: #33b048;">{{ chooseDate }} ▼</text>
          <rangeDatePick
            start="2021-01-01"
            end="2200-12-01"
            themeColor="#33b048"
            fields="day"
            :show="dateShow"
            :value="value"
            @change="bindChange"
            @cancel="bindCancel"
            @showchange="showchange"
          ></rangeDatePick>
        </view>
      </view>
      <!-- 明细 -->
      <view class="wallB">
        <view v-for="item in billList" :key="item.id">
          <view
            class="wblist"
            :class="{ wtxbg: item.payType === '2' }"
            @click="goTxdetail(item)"
          >
            <view class="w-70">
              <view class="wbtou">
                {{ item.payType | payTypeText }}
                <text
                  v-if="item.payType === '2' && item.payStatus === '1'"
                  class="wbtxzt"
                >
                  提现成功
                </text>
              </view>
              <view>{{ item.payTime || '--' }}</view>
            </view>
            <view>
              <view class="wbmon">
                <!-- 不懂后端是否返回 +/- -->
                <!-- <text>+</text> -->
                <text>{{ item.realAmount || 0 }}</text>
                <text class="wbtsm">元</text>
              </view>
              <view class="wbyu">余额：{{ item.afterAmount || 0 }}</view>
            </view>
          </view>
        </view>
      </view>
      <!-- <view class="clearw"></view> -->
      <template slot="bottom">
        <!-- 底部按钮 -->
        <view class="wfoot">
          <button class="wtxbt" @click="cashout">提现</button>
          <button class="wczbt" @click="cashin">充值</button>
        </view>
      </template>
    </z-paging>
  </view>
</template>

<script>
import { findMemberByWallet, findMemberBalance } from '@/api/member.js';
import rangeDatePick from '@/components/pyh-rdtpicker/pyh-rdtpicker.vue'; //日期选择

const payTypeText = {
  1: '充值',
  2: '提现',
  3: '消费',
  4: '退款'
};

export default {
  components: {
    rangeDatePick
  },
  data() {
    const currentDate = this.getDate({
      format: true
    });
    return {
      tipshow: false,
      walletData: {},
      nowDate: currentDate, //获取当前时间
      dateShow: false,
      value: [],
      chooseDate: '日期筛选',
      formData: {
        startDate: '',
        endDate: ''
      },
      billList: []
    };
  },
  filters: {
    payTypeText(value) {
      return payTypeText[value];
    }
  },
  onLoad() {
    this.findMemberByWallet();
  },
  methods: {
    findMemberByWallet() {
      findMemberByWallet().then(({ result }) => {
        this.walletData = result || {};
      });
    },
    queryList(pageNo, pageSize) {
      findMemberBalance({ ...this.formData, pageNo, pageSize }).then(
        ({ result }) => {
          const records = result?.balance?.records;
          if (records.length > 0) {
            this.$refs.paging.complete(records);
          } else {
            this.$refs.paging.complete([]);
          }
        }
      );
    },
    // 显示tip
    showtip() {
      this.tipshow = !this.tipshow;
    },
    //提现明细
    goTxdetail(data) {
      if (data.payType === '2') {
        uni.navigateTo({
          url: `/pages/Wallet/Txdetail?id=${data.id}`
        });
      }
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
    // 选择日期
    showPicker(e) {
      this.dateShow = true;
    },
    showchange() {
      this.dateShow = !this.dateShow;
    },
    bindChange(data) {
      console.log(data);
      this.chooseDate = data[0] + ' 至 ' + data[1];
      this.formData.startDate = data[0];
      this.formData.endDate = data[1];
      this.$refs.paging.reload();
    },
    bindCancel(e) {
      console.log(e);
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month > 9 ? month : '0' + month;
      day = day > 9 ? day : '0' + day;
      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  // padding-top: 30rpx;
}
// 余额
.wallA {
  position: relative;
  width: 94%;
  margin: 30rpx auto;
  padding: 0 30rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  font-size: 24rpx;
  color: #999;
  line-height: 1.4;
  text-align: center;

  .wali {
    font-size: 26rpx;
    padding: 40rpx 0;
    border-bottom: 1px solid #ededed;
    .wanum {
      color: #333;
      font-size: 60rpx;
      font-weight: bold;
    }
  }
  .waol {
    padding: 30rpx 0;
    view {
      width: 50%;
      border-right: 1px solid #ededed;
      display: flex;
      align-items: center;
      flex-direction: column;
      .wonum {
        color: #333;
        font-size: 40rpx;
        font-weight: bold;
      }
    }
    view:last-child {
      border: none;
    }
  }

  .watip {
    width: 40rpx;
    height: 40rpx;
    opacity: 0.5;
    position: absolute;
    right: 90rpx;
    bottom: 80rpx;
    z-index: 2;
  }
  .watisw {
    color: #fff;
    font-size: 26rpx;
    line-height: 1.4;
    background: rgba(0, 0, 0, 0.4);
    padding: 10rpx 20rpx;
    border-radius: 10rpx;
    position: absolute;
    right: 30rpx;
    bottom: 140rpx;
    z-index: 3;
  }
}
.wbchos {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 94%;
  margin: 0 auto;
  padding: 0 30rpx 20rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx 14rpx 0 0;
  font-size: 24rpx;
  color: #999;
  line-height: 1.4;
  padding: 30rpx 0;

  .datawp {
    border: 1px solid #33b048;
    background: #e6f7e8;
    padding: 10rpx 30rpx;
    border-radius: 100rpx;
    font-size: 30rpx;
  }
  .wbdmx {
    color: #33b048;
    margin: 0rpx auto 30rpx;
    text {
      font-size: 30rpx;
      margin: 0 20rpx;
    }
  }
}
// 明细
.wallB {
  width: 94%;
  margin: 0 auto 30rpx;
  padding: 0 30rpx 20rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 0 0 14rpx 14rpx;
  font-size: 24rpx;
  color: #999;
  line-height: 1.4;
  .wblist {
    padding: 24rpx 40rpx 24rpx 0;
    border-bottom: 1px dashed #ededed;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .wbtou {
      font-size: 30rpx;
      font-weight: 550;
      color: #555;
      margin-bottom: 10rpx;
      .wbtxzt {
        margin-left: 16rpx;
        font-weight: normal;
        background: #ffe8e8;
        color: #f88686;
        font-size: 22rpx;
        padding: 8rpx 10rpx;
        border-radius: 10rpx;
      }
    }
    .wbmon {
      font-size: 34rpx;
      color: #555;
      font-weight: 550;
      margin-bottom: 10rpx;
      text-align: right;
    }
    .wbtsm {
      font-size: 24rpx;
      margin-left: 6rpx;
    }
    .wbyu {
      font-size: 28rpx;
      text-align: right;
    }
  }
  .wtxbg {
    background: url('@/static/image/arrow_01.png') right -10rpx center no-repeat;
    background-size: 40rpx 40rpx;
    padding-right: 40rpx;
  }
}
// 底部按钮
.wfoot {
  width: 100%;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.05);
  background: #eff0f1;
  padding: 30rpx 3%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9;

  button.wtxbt,
  uni-button.wtxbt {
    width: 45%;
    height: 82rpx;
    line-height: 80rpx;
    font-size: 34rpx;
    background: #fff;
    color: #33b048;
    font-weight: 500;
    border: 2rpx solid #33b048;
    border-radius: 100rpx;
  }
  button.wczbt,
  uni-button.wczbt {
    width: 45%;
    height: 82rpx;
    line-height: 80rpx;
    font-size: 34rpx;
    background: #33b048;
    color: #fff;
    font-weight: 500;
    border: 1px solid #33b048;
    border-radius: 100rpx;
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
.clearw {
  height: 160rpx;
  display: block;
}
</style>
