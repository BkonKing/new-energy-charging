<template>
  <view class="container">
    <z-paging v-model="bhistory" ref="paging" :fixed="true" @query="queryList">
      <view
        class="dep_ul"
        v-for="(item, index) in bhistory"
        :key="index"
        @click="goDetail(item)"
      >
        <view class="dep_title">
          <text>{{item.createTime || '--'}}</text>
          <text>{{item.status | statusText}}</text>
        </view>
        <view class="dep_nr">
          <text>电子发票</text>
          <text>￥{{item.invoiceAmount}}</text>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script>
import { findMemberHisInvoice } from '@/api/member.js';

const statusObj = {
  1: '已开票',
  0: '开票失败',
  2: '开票中',
}

export default {
  data() {
    return {
      bhistory: []
    };
  },
  filters: {
    statusText(value) {
      return statusObj[value];
    }
  },
  created() {},
  methods: {
    queryList(pageNo, pageSize) {
      findMemberHisInvoice({ pageNo, pageSize }).then(({ result }) => {
        const records = result?.records || [];
        if (records.length > 0) {
          this.$refs.paging.complete(records);
        } else {
          this.$refs.paging.complete([]);
        }
      });
    },
    goDetail({ id }) {
      uni.navigateTo({
        url: `./Billdetail?id=${id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dep_ul {
  width: 94%;
  background: #fff;
  box-shadow: 0rpx 0rpx 15rpx rgba(60, 122, 255, 0.1);
  border-radius: 14rpx;
  padding: 0rpx 24rpx 0rpx;
  margin: 30rpx auto 0;
  line-height: 1;
}
.dep_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 35rpx 24rpx 0;
  font-size: 28rpx;
  color: #999;
  border-bottom: 1px solid #eaeaea;
  background: url(../../static/image/arrow_01.png) right center no-repeat;
  background-size: 30rpx 30rpx;

  text:last-child {
    color: 28rpx;
  }
}
.dep_nr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 0;
  font-size: 30rpx;
  color: #555;
  line-height: 1.5;

  text:first-child {
    width: 70%;
  }
  text:last-child {
    font-weight: 500;
    font-size: 30rpx;
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
