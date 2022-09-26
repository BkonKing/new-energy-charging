<template>
  <view class="container">
    <radio-group @change="checkboxChange">
      <label class="bcosli" v-for="(item, index) in invoiceList">
        <radio
          :checked="checked.includes(item.departId)"
          :value="item.departId"
          class="checkbox"
          style="transform:scale(0.9)"
        />
        <view class="bcosnr">
          <view class="bcname ellipsis">{{ item.companyName }}</view>
          <view class="bctag">
            {{ item.hasInvoiceCategory | invoiceType }}
            <text>|</text>
            <!-- 纸质发票
            <text>|</text> -->
            电子发票
            <!-- <text>|</text>
            快递到付 -->
          </view>
          <view class="bcrpice">
            ￥
            <text>{{ item.totalAmount }}</text>
          </view>
        </view>
      </label>
    </radio-group>
    <!-- 底部 -->
    <view class="clearw"></view>
    <view class="wfoot">
      <button class="combutton" @click="billopen">下一步</button>
    </view>
  </view>
</template>

<script>
import { findMemberOrderByNextInvoice } from '@/api/member.js';

const InvoiceTypes = {
  0: '增值税普通发票',
  1: '增值税专用发票',
  2: '增值税电子普通发票',
  3: '所有'
};

export default {
  data() {
    return {
      id: '',
      checked: [],
      checkData: [],
      invoiceList: []
    };
  },
  components: {},
  filters: {
    invoiceType(value) {
      return InvoiceTypes[value] || '--';
    }
  },
  onLoad({ id }) {
    this.id = id;
    this.findMemberOrderByNextInvoice();
  },
  methods: {
    findMemberOrderByNextInvoice() {
      findMemberOrderByNextInvoice({
        orderIds: this.id
      }).then(({ result }) => {
        this.invoiceList = result || [];
      });
    },
    checkboxChange({ detail }) {
      this.checked = detail.value || [];
      this.checkData = this.invoiceList.find(data => {
        return this.checked === data.departId;
      });
    },
    // 下一步，前往开具发票
    billopen() {
      if (!this.checked.length) {
        this.$tip.toast('请先选择订单');
        return;
      }
      const {
        real_amount: amount,
        orderIds: id,
        hasInvoiceCategory
      } = this.checkData;
      const departId = this.checked;
      uni.navigateTo({
        url: `./Billopen?id=${id}&amount=${amount}&departId=${departId}&hasInvoiceCategory=${hasInvoiceCategory}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30rpx;
}
// 列表
.bcosli {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 94%;
  background: #fff;
  box-shadow: 0rpx 0rpx 15rpx rgba(60, 122, 255, 0.1);
  border-radius: 14rpx;
  padding: 20rpx 24rpx 20rpx;
  margin: 0rpx auto 30rpx;
  line-height: 1;
}
uni-checkbox .uni-checkbox-input,
.checkbox {
  margin-right: 5px;
}

.bcosnr {
  width: calc(100% - 30px);
}
.bcname {
  width: 100%;
  font-size: 32rpx;
  color: #555;
  font-weight: 550;
  line-height: 60rpx;
  height: 60rpx;
}
.bctag {
  font-size: 26rpx;
  color: #999;
  line-height: 1.4;
  text {
    padding: 0 10rpx;
  }
}
.bcrpice {
  color: #fe5f5e;
  font-size: 30rpx;
  font-weight: 550;
  margin-top: 14rpx;
  text {
    font-size: 34rpx;
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
</style>
