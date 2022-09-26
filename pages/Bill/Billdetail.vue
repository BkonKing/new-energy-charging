<template>
  <view class="container">
    <view class="botitle">
      <text>电子发票</text>
      <text class="bstatus">{{invoiceInfo.status | statusText}}</text>
    </view>
    <view class="pd24">
      <view class="boitem">
        <text>发票抬头</text>
        <text>{{ invoiceInfo.invoiceTitle }}</text>
      </view>
      <view v-if="invoiceInfo.invoiceTaxNo" class="boitem">
        <text>纳税号码</text>
        <text>{{ invoiceInfo.invoiceTaxNo }}</text>
      </view>
      <view class="boitem">
        <text>发票金额</text>
        <text>{{ invoiceInfo.invoiceAmount || 0 }}元</text>
      </view>
      <view class="boitem">
        <text>申请时间</text>
        <text>{{ invoiceInfo.createTime }}</text>
      </view>
      <view v-if="invoiceInfo.invoiceTelphone" class="boitem">
        <text>电话号码</text>
        <text>{{ invoiceInfo.invoiceTelphone }}</text>
      </view>
      <view v-if="invoiceInfo.invoiceAddress" class="boitem">
        <text>单位地址</text>
        <text>{{ invoiceInfo.invoiceAddress }}</text>
      </view>
      <view v-if="invoiceInfo.invoiceBankAccount" class="boitem">
        <text>银行账号</text>
        <text>{{ invoiceInfo.invoiceBankAccount }}</text>
      </view>
      <view v-if="invoiceInfo.invoiceBankName" class="boitem">
        <text>开户银行</text>
        <text>{{ invoiceInfo.invoiceBankName }}</text>
      </view>
      <view v-if="invoiceInfo.invoiceRemark" class="boitem">
        <text>备注</text>
        <text>{{ invoiceInfo.invoiceRemark }}</text>
      </view>
    </view>
    <view class="botitle">接收信息</view>
    <view class="pd24">
      <view class="boitem">
        <text>电子邮件</text>
        <text>{{ invoiceInfo.email }}</text>
      </view>
    </view>
    <view class="pd24 bord" @click="billinclure">
      <view>1张发票，含{{ invoiceInfo.relOrderNum || 0 }}个订单</view>
    </view>
    <view class="clearw"></view>
    <!-- <view v-if="invoiceInfo.status === 1" class="wfoot">
      <button class="combutton" @click="repeatSent()">重发发票</button>
    </view> -->
    <!-- 提现弹框 -->
    <view v-if="mshow" class="maskbg">
      <view class="swarp">
        <view class="stitle">重发发票</view>
        <input v-model="email" placeholder="请输入电子邮件" />
        <view class="sbtv">
          <button class="cancel" @click="Sentcancel()">取消</button>
          <button
            :disabled="disabled"
            :loading="disabled"
            @click="handleSubmit"
          >
            提交
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { findMemberInvoiceDetail } from '@/api/member.js';
import { throttle } from '@/common/util.js';
import { InvoiceStatusDict } from '@/common/constants.js'

export default {
  components: {},
  data() {
    return {
      mshow: false,
      invoiceInfo: {},
      email: '',
      disabled: false,
      handleSubmit: throttle(this.submit)
    };
  },
  filters: {
    statusText(value) {
      return InvoiceStatusDict[value] || '';
    }
  },
  onLoad({ id }) {
    this.id = id;
    this.findMemberInvoiceDetail();
  },
  methods: {
    findMemberInvoiceDetail() {
      findMemberInvoiceDetail({
        id: this.id
      }).then(({ result }) => {
        this.invoiceInfo = result || {};
      });
    },
    // 弹框
    watchOpen() {},
    watchClose() {},
    // 点击重新发票
    repeatSent() {
      this.email = '';
      this.mshow = true;
    },
    // 点击弹框取消按钮
    Sentcancel() {
      this.mshow = false;
    },
    submit() {
      if (!this.email) {
        this.$tip.toast('请输入电子邮件')
        return
      }
      this.disabled = true;
      Promise.finally(() => {
        this.disabled = false;
      });
    },
    //前往所含订单
    billinclure() {
      uni.navigateTo({
        url: `./Billinclure?id=${this.invoiceInfo.id}`
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
