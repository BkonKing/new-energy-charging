<template>
  <div class="site-card">
    <view class="site-content" @click="goSitedetail">
      <view v-if="isStoreTag && data.storeState === 1" class="fav_ico">
        收藏
      </view>
      <view class="fcname">
        <!-- <image
          v-if="data.pictures"
          :src="pictures"
          mode="heightFix"
        ></image> -->
        <image src="/static/image/logo2.png" mode="heightFix"></image>
        <view class="ellipsis">{{ data.siteName }}</view>
      </view>
      <view class="fctips">
        <text v-if="isStoreContent" class="favy">
          {{ data.storeState | storeState }}
        </text>
        <!-- <text class="xying">歇业中</text> -->
        <text v-if="businessTime">{{ businessTime }}</text>
        <text v-if="data.businessType">
          <!-- 对外开放 -->
          {{ data.businessType }}
        </text>
        <text v-if="data.operateType">
          <!-- 互联互通 -->
          {{ data.operateType }}
        </text>
      </view>
      <view v-if="data.parkDesc" class="fcpark ellipsis">
        停车收费：{{ data.parkDesc }}
      </view>
      <view class="fcprice">
        ￥
        <text>{{ data.fee || 0 }}</text>
      </view>
    </view>
    <view class="fcsta" @click="gomap()">
      <view>
        <text>快</text>
        <text class="colx">闲{{ data.freeFastNum || 0 }}</text>
        <text class="gray">/{{ data.fastNum || 0 }}</text>
        <text class="pl-30">慢</text>
        <text class="colm">闲{{ data.freeSlowNum || 0 }}</text>
        <text class="gray">/{{ data.slowNum || 0 }}</text>
      </view>
      <view class="dwei">{{ data.targetDistance || '--' }}km</view>
    </view>
  </div>
</template>

<script>
import { openLocation } from '@/common/util.js'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    storeType: {
      type: Number,
      default: 1
    }
  },
  computed: {
    isStoreContent() {
      return this.storeType === 1;
    },
    isStoreTag() {
      return this.storeType === 2;
    },
    pictures() {
      if (this.data.pictures) {
        return this.data.pictures.split(',')[0]
      }
      return ''
    },
    businessTime() {
      if (this.data.businessTime) {
        return this.data.businessTime.split(',').join(' ~ ')
      }
      return ''
    }
  },
  filters: {
    storeState(value) {
      const status = {
        1: '已收藏',
        0: '未收藏'
      };
      return status[value];
    }
  },
  methods: {
    goSitedetail() {
      uni.navigateTo({
        url: `/pages/Site/Sitedetail?id=${this.data.id}`
      });
    },
    // 前往地图APP
    gomap() {
      openLocation({
        latitude: +this.data.latitude,
        longitude: +this.data.longitude,
        name: this.data.siteName,
        address: this.data.address,
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.site-card {
  position: relative;
  font-size: 22rpx;
  color: #999;
  .fav_ico {
    font-size: 22rpx;
    color: #fff;
    padding: 6rpx 14rpx;
    background-image: linear-gradient(
      to right bottom,
      #ff696a,
      #fa4655,
      #f42542
    );
    border-radius: 0 14rpx 0 14rpx;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }
  .fcname {
    width: 100%;
    padding: 34rpx 0 24rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
    image {
      width: auto;
      height: 40rpx;
    }
    view {
      width: calc(100% - 80rpx);
      height: 40rpx;
      margin-left: 10rpx;
      line-height: 40rpx;
    }
  }
  .fctips {
    margin-bottom: 10rpx;
    font-size: 22rpx;
    line-height: 1.2;
    color: #999;
    text {
      display: inline-block;
      padding: 6rpx 10rpx;
      margin-right: 20rpx;
      background: #f1f1f1;
      border-radius: 6rpx;
      margin-bottom: 10rpx;
    }
    .favy {
      color: #fff;
      background-image: linear-gradient(
        to right bottom,
        #ff696a,
        #fa4655,
        #f42542
      );
    }
    .xying {
      background: #999;
      color: #fff;
    }
  }
  .fcprice {
    margin-bottom: 10rpx;
    font-size: 30rpx;
    font-weight: 500;
    color: #333;
    text {
      font-size: 50rpx;
      font-weight: bold;
    }
  }
  .fcpark {
    width: 100%;
    background: url(/static/image/ico_03.png) left center no-repeat;
    background-size: 30rpx 30rpx;
    background-position: 0 4rpx;
    padding-left: 36rpx;
    font-size: 22rpx;
    color: #999;
    margin: 10rpx 0;
    height: 40rpx;
    line-height: 40rpx;
  }
  .fcsta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 24rpx;
    color: #333;
    font-weight: 500;
    background: #f9f9f9;
    border-radius: 6rpx;
    padding: 10rpx 15rpx;
    .colx {
      color: #f37c2c;
      padding-left: 20rpx;
      letter-spacing: 2px;
    }
    .colm {
      color: #5581ff;
      padding-left: 20rpx;
      letter-spacing: 2px;
    }
    .gray {
      color: #999;
      font-weight: normal;
    }
    .dwei {
      background: url(/static/image/ico_04.png) right center no-repeat;
      background-size: 25rpx 25rpx;
      padding-right: 30rpx;
    }
  }
}
</style>
