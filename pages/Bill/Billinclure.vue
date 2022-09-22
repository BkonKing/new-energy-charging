<template>
  <view class="container">
    <z-paging v-model="listData" ref="paging" :fixed="true" @query="queryList">
      <view
        v-for="(item, index) in listData"
        :key="index"
        class="dep_ul"
        @click="goOrderDetail(item)"
      >
        <view class="bihead disflex">
          <view class="bikind disflex4">
            <image src="/static/image/logo2.png" mode="heightFix"></image>
            <text>逸充新能源</text>
          </view>
          <text>{{ item.createTime }}</text>
        </view>
        <view class="biname ellipsis">{{ item.siteName }}</view>
        <view class="bipay">
          实付：
          <text>￥{{ item.realAmount }}</text>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script>
import { findMemberInvoiceForOrdersRel } from '@/api/member.js';

export default {
  data() {
    return {
      id: '',
      listData: []
    };
  },
  onLoad({ id }) {
    this.id = id;
  },
  methods: {
    queryList(pageNo, pageSize) {
      findMemberInvoiceForOrdersRel({ pageNo, pageSize, id: this.id }).then(
        ({ result }) => {
          const records = result?.records || [];
          if (records.length > 0) {
            this.$refs.paging.complete(records);
          } else {
            this.$refs.paging.complete([]);
          }
        }
      );
    },
    // 前往订单详情
    goOrderDetail({id}) {
      uni.navigateTo({
        url: `/pages/Order/Orderdetail?orderId=${id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30rpx;
}
.dep_ul {
  width: 94%;
  background: #fff;
  box-shadow: 0rpx 0rpx 15rpx rgba(60, 122, 255, 0.1);
  border-radius: 14rpx;
  padding: 20rpx 24rpx 20rpx;
  margin: 30rpx auto 0;
  line-height: 1;
  .bihead {
    font-size: 24rpx;
    color: #999;
    line-height: 60rpx;
    .bikind {
      font-size: 28rpx;
      color: #555;
      line-height: 60rpx;
      image {
        width: auto;
        height: 36rpx;
        margin-right: 10rpx;
      }
    }
  }
  .biname {
    width: 100%;
    font-size: 32rpx;
    color: #555;
    font-weight: 500;
    line-height: 70rpx;
    height: 70rpx;
  }
  .bipay {
    font-size: 28rpx;
    color: #555;
    font-weight: 550;
    line-height: 50rpx;
    text {
      font-size: 30rpx;
    }
  }
}
// 没有更多
.nomore {
  display: block;
  font-size: 28rpx;
  color: #999;
  line-height: 100rpx;
  text-align: center;
  clear: both;
}
</style>
