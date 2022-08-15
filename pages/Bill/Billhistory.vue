<template>
  <view class="container">
    <z-paging v-model="bhistory" ref="paging" :fixed="true" @query="queryList">
      <view
        class="dep_ul"
        v-for="(item, index) in bhistory"
        :key="index"
        @click="billdetail"
      >
        <view class="dep_title">
          <text>2022-04-06 12:23:33</text>
          <text>已开票</text>
        </view>
        <view class="dep_nr">
          <text>电子发票</text>
          <text>￥300.00</text>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script>
import { findOrderByMemberId } from '@/api/member.js';
export default {
  data() {
    return {
      bhistory: []
    };
  },
  created() {},
  methods: {
    queryList(pageNo, pageSize) {
      findOrderByMemberId({ pageNo, pageSize, findType: 0 }).then(
        ({ result }) => {
          const records = result?.orderInfo?.records;
          if (records.length > 0) {
            this.$refs.paging.complete(records);
          } else {
            this.$refs.paging.complete([]);
          }
        }
      );
    },
    // 下一步，前往发票详情
    billdetail: function() {
      uni.navigateTo({
        url: './Billdetail'
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
