<template>
  <view class="container">
    <!-- 搜索列表 -->
    <z-paging
      v-model="siteListData"
      ref="paging"
      :fixed="true"
      @query="queryList"
    >
      <template slot="top">
        <view class="fav_sch">
          <input v-model="searchText" placeholder="输入电站关键字" />
          <button class="favbt" @click="handleSearch">搜索</button>
        </view>
        <!-- 搜索结果 -->
        <view class="sch_ul">
          <text v-for="key in keyList" @click="setSearchText(key)">
            {{ key }}
          </text>
          <image
            v-if="keyList.length"
            src="/static/image/ico_11.png"
            mode="widthFix"
            @click="clearAllKey"
          ></image>
        </view>
      </template>
      <template v-if="siteListData && siteListData.length">
        <view
          v-for="item in siteListData"
          :key="item.id"
          class="fav_ul"
        >
          <site-card :data="item" :storeType="2"></site-card>
        </view>
        <view class="clearit"></view>
      </template>
    </z-paging>
  </view>
</template>

<script>
import { findSiteByFavorite } from '@/api/member.js';
import { getLocationInfo } from '@/common/util.js';
import SiteCard from '@/modules/SiteCard.vue';
export default {
  components: {
    SiteCard
  },
  data() {
    return {
      searchText: '',
      isshow: false,
      keyList: [],
      siteListData: [],
      currentLocation: {
        lat: 0,
        lon: 0
      },
    };
  },
  onLoad() {
    this.getKey()
    this.getLocationInfo()
  },
  methods: {
    getLocationInfo() {
      getLocationInfo({
        title: '请求授权当前位置',
        message: '我们需要获取地理位置信息，为您推荐附近的站点'
      })
        .then(({ longitude, latitude }) => {
          this.currentLocation.lon = longitude;
          this.currentLocation.lat = latitude;
          this.$refs.paging.reload(true);
        })
        .catch(() => {
        });
    },
    handleSearch() {
      const key = this.searchText;
      this.saveKey(key);
      this.$refs.paging.reload(true);
    },
    queryList(pageNo, pageSize) {
      if (!this.currentLocation.lon || !this.currentLocation.lat) {
        return
      }
      const key = this.searchText;
      this.$tip.loading();
      //组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
      findSiteByFavorite({
        key,
        ...this.currentLocation,
        pageNo,
        pageSize
      })
        .then(({ result }) => {
          const records = result?.siteInfo?.records || []
          if (records.length > 0) {
            this.$refs.paging.complete(records);
          } else {
            this.$refs.paging.complete([]);
          }
        })
        .finally(() => {
          this.$tip.loaded();
        });
    },
    setSearchText(key) {
      if (this.searchText === key) {
        return;
      }
      this.searchText = key;
      this.handleSearch();
    },
    getKey() {
      const value = uni.getStorageSync('sitefav_key');
      if (value) {
        this.keyList = value.split(',');
      }
    },
    saveKey(key) {
      if (!key) {
        return;
      }
      if (this.keyList.includes(key)) {
        return;
      }
      if (this.keyList.length === 6) {
        this.keyList.pop();
      }
      this.keyList.unshift(key);
      uni.setStorage({
        key: 'sitefav_key',
        data: this.keyList.join(',')
      });
    },
    clearAllKey() {
      uni.removeStorage({
        key: 'sitefav_key',
        success: res => {
          this.keyList = [];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// 搜索
.fav_sch {
  width: 94%;
  background: #fff;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.03);
  border-radius: 100rpx;
  margin: 30rpx auto 50rpx;
  padding: 20rpx 40rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input,
  uni-input {
    width: 80%;
    height: 45rpx;
    color: #888;
    font-size: 28rpx;
    line-height: 1.6;
    font-weight: 500;
  }
  button.favbt,
  uni-button.favbt {
    display: inline-block;
    width: auto;
    height: 64rpx;
    background: #33b048;
    font-size: 26rpx;
    line-height: 1.6;
    color: #fff;
    border: 1px solid #33b048;
    border-radius: 10rpx;
    padding: 10rpx 20rpx;
  }
}
// 搜索结果
.sch_ul {
  width: 94%;
  margin: 0 auto 40rpx;
  padding-right: 30rpx;
  font-size: 24rpx;
  color: #666;
  position: relative;

  text {
    line-height: 1.2;
    display: inline-block;
    background: #ddd;
    padding: 10rpx 20rpx;
    border-radius: 20rpx;
    margin: 0 20rpx 24rpx 0;
  }

  image {
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }
}
// 收藏列表
.fav_ul {
  position: relative;
  width: 94%;
  background: #fff;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.03);
  border-radius: 14rpx;
  font-size: 22rpx;
  color: #999;
  margin: 0rpx auto 30rpx;

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
.clearit {
  height: 30rpx;
  display: block;
}
</style>
