<template>
  <view class="site-list">
    <view class="dep_ul" v-for="(item, index) in data" :key="index">
      <site-card :data="item" :storeType="2"></site-card>
    </view>
  </view>
</template>

<script>
import SiteCard from '@/modules/SiteCard.vue';
export default {
  options: { styleIsolation: 'shared' },
  components: {
    SiteCard
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    // 前往电站详情
    sitedetail() {
      uni.navigateTo({
        url: '/pages/Site/Sitedetail'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.site-list {
  width: 100%;
  height: 100%;
}
.dep_ul {
  position: relative;
  width: 94%;
  background: #fff;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: 14rpx;
  font-size: 22rpx;
  color: #999;
  margin: 30rpx auto 0;

  ::v-deep .site-card {
    .site-content {
      padding-left: 20rpx;
    }
    .fcname {
      width: 80%;
      padding: 34rpx 20rpx 24rpx 0;
    }
    .fcsta {
      border-radius: 0 0 14rpx 14rpx;
      padding: 10rpx 20rpx;
    }
  }
}
</style>
