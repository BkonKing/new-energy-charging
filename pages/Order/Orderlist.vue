<template>
  <view class="container">
    <z-paging v-model="listData" ref="paging" :fixed="true" @query="queryList">
      <template slot="empty">
        <!-- - 3天内暂无充电记录 - -->
        <view class="nodata">- 暂无数据 -</view>
        <button class="gosy" @click="goHome">去充电</button>
      </template>
      <order-item
        v-for="item in listData"
        :key="item.id"
        :data="item"
        :type="type"
      ></order-item>
    </z-paging>
  </view>
</template>

<script>
import { findOrderByMemberId } from '@/api/member.js';
import OrderItem from './components/OrderItem';

export default {
  components: {
    OrderItem
  },
  data() {
    return {
      type: 'list',
      listData: []
    };
  },
  onLoad({ type }) {
    type && (this.type = type);
  },
  methods: {
    queryList(pageNo, pageSize) {
      findOrderByMemberId({
        findType: 0, // 全部订单
        pageNo,
        pageSize
      }).then(({ result }) => {
        const records = result?.orderInfo?.records || [];
        if (records.length > 0) {
          this.$refs.paging.complete(records);
        } else {
          this.$refs.paging.complete([]);
        }
      });
    },
    // 前往去充电首页
    goHome() {
      uni.navigateTo({
        url: '/pages/tabbar/index'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30rpx;
}
// 暂无数据
.nodata {
  display: block;
  font-size: 28rpx;
  color: #999;
  line-height: 200rpx;
  text-align: center;
}
button.gosy,
uni-button.gosy {
  position: fixed;
  left: 3%;
  bottom: 60rpx;
  z-index: 5;
  line-height: 90rpx;
  font-size: 34rpx;
  width: 94%;
  background: #33b048;
  color: #fff;
  font-weight: 500;
  border: 1px solid #33b048;
  box-shadow: 0 0 20rpx 10rpx rgba(45, 255, 80, 0.2);
  border-radius: 100rpx;
  margin: 0 auto;
}
</style>
