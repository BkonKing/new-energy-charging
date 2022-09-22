<template>
  <view class="container">
    <z-paging v-model="bcosInfo" ref="paging" :fixed="true" @query="queryList">
      <view class="bcosul">
        <checkbox-group @change="checkboxChange">
          <label v-for="(item, index) in bcosInfo" :key="index" class="bcosli">
            <checkbox
              :checked="checked.includes(item.id)"
              :value="item.id"
              class="checkbox"
              style="transform:scale(0.9)"
            />
            <view class="bcosnr">
              <view class="disflex mbt">
                <text>{{ item.id }}</text>
                <text class="bcrpice">￥{{ item.realAmount }}</text>
              </view>
              <view class="disflex">
                <text class="bcname">用电{{ item.totalPower }}度</text>
                <text class="bctime">{{ item.payTime }}</text>
              </view>
            </view>
          </label>
        </checkbox-group>
      </view>
      <!-- 底部 -->
      <view class="bcofoot" slot="bottom">
        <view>
          <view v-if="checked.length" class="bcoftnr">
            <text>{{ checked.length }}</text>
            个订单，共
            <text>{{ allMoney }}</text>
            元
          </view>
          <checkbox-group @change="checkAll">
            <label class="align-items-center">
              <checkbox class="checkbox" style="transform:scale(0.8)" />
              本页全选
            </label>
          </checkbox-group>
        </view>
        <button @click="billopen">下一步</button>
      </view>
    </z-paging>
  </view>
</template>

<script>
import { findMemberOrderByInvoice } from '@/api/member.js';
export default {
  data() {
    return {
      bcosInfo: [],
      checked: [],
      checkData: []
    };
  },
  computed: {
    allMoney() {
      if (this.checkData.length) {
        const sum = this.checkData.reduce((previousValue, data) => {
          const sum = previousValue + +data.realAmount;
          return sum;
        }, 0);
        return sum.toFixed(2);
      }
      return 0;
    }
  },
  methods: {
    checkboxChange({ detail }) {
      this.checked = detail.value || [];
      this.checkData = this.bcosInfo.filter(data => {
        return this.checked.includes(data.id);
      });
    },
    checkAll({ detail }) {
      if (!detail.value?.length) {
        this.checked = [];
        this.checkData = [];
        return;
      }
      this.checkData = this.bcosInfo;
      this.checked = this.bcosInfo.map(obj => obj.id);
    },
    // 下一步，前往下一步选择 / 开具发票
    billopen() {
      if (!this.checked.length) {
        this.$tip.toast('请先选择订单');
        return;
      }
      uni.navigateTo({
        url: `./BillchoseB?id=${this.checked.join(',')}`
      });
    },
    queryList(pageNo, pageSize) {
      findMemberOrderByInvoice({ pageNo, pageSize }).then(({ result }) => {
        const records = result.records || [];
        if (records.length > 0) {
          this.$refs.paging.complete(records);
        } else {
          this.$refs.paging.complete([]);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  // padding-top: 30rpx;
}
// 列表
.bcosul {
  background: #fff;
  border-top: 1px solid #eaeaea;
}
.bcosli {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 24rpx 3%;
  border-bottom: 1px solid #eaeaea;
  font-size: 28rpx;
  color: #555;
}
uni-checkbox .uni-checkbox-input,
.checkbox {
  margin-right: 5px;
}

.bcosnr {
  width: calc(100% - 30px);
}
.bcrpice {
  color: #fe5f5e;
  font-size: 34rpx;
  font-weight: 500;
}
.bcname {
  font-size: 30rpx;
  font-weight: 500;
  color: #555;
}
.bctime {
  font-size: 24rpx;
  color: #aaa;
}
.mbt {
  margin-bottom: 5rpx;
}
// 底部按钮
.bcofoot {
  width: 100%;
  padding: 20rpx 3%;
  background: #fff;
  height: 130rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30rpx;
  color: #555;

  .bcoftnr {
    font-size: 24rpx;
    color: #555;
    margin-bottom: 20rpx;
    text {
      font-weight: bold;
      color: #fe5f5e;
      font-size: 26rpx;
      padding: 0 5rpx;
    }
  }

  button,
  uni-button {
    line-height: 90rpx;
    font-size: 34rpx;
    width: 45%;
    background: #33b048;
    color: #fff;
    font-weight: 500;
    border: 1px solid #33b048;
    border-radius: 100rpx;
  }
}
// 暂无记录
.nolist {
  width: 100%;
  font-size: 30rpx;
  color: #999;
  line-height: 160rpx;
  text-align: center;
}
</style>
