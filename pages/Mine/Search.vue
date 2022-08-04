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
            @click="removeKey"
          ></image>
        </view>
      </template>
      <template v-if="siteListData && siteListData.length">
        <view
          v-for="item in siteListData"
          :key="item.id"
          class="fav_ul"
          @click="sitedetail"
        >
          <site-card :data="item" :storeType="2"></site-card>
        </view>
        <view class="clearit"></view>
      </template>
    </z-paging>
  </view>
</template>

<script>
import { findSiteByKey } from '@/api/site.js';
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
      siteListData: []
    };
  },
  onLoad() {},
  methods: {
    handleSearch() {
      const key = this.searchText;
      if (!key) {
        return;
      }
      this.saveKey(key);
      // findSiteByKey({
      //   key
      // }).then(({ result }) => {
      //   this.siteListData = result || [];
      // });
      this.queryList(1, 10);
    },
    queryList(pageNo, pageSize) {
      const key = this.searchText;
      if (!key) {
        return;
      }
      this.$tip.loading();
      //组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
      findSiteByKey({
        key,
        pageNo,
        pageSize
      })
        .then(({ result }) => {
          // this.siteListData = result || [];
          if (result.length > 0) {
            this.$refs.paging.complete(result);
          } else {
            this.$refs.paging.complete([]);
          }
        })
        .finally(() => {
          this.$tip.loaded();
        });
      //防止某些原因导致加载框不隐藏
      setTimeout(() => {
        this.$tip.loaded();
      }, 10000);
    },
    setSearchText(key) {
      if (this.searchText === key) {
        return;
      }
      this.searchText = key;
      this.handleSearch();
    },
    getKey() {
      const value = uni.getStorageSync('storage_key');
      if (value) {
        this.keyList = value.split(',');
      }
    },
    saveKey(key) {
      if (this.keyList.includes(key)) {
        return;
      }
      if (this.keyList.length === 6) {
        this.keyList.pop();
      }
      this.keyList.unshift(key);
      uni.setStorage({
        key: 'site_key',
        data: this.keyList.join(','),
        success: () => {
          console.log('success');
        }
      });
    },
    removeKey() {
      uni.removeStorage({
        key: 'site_key',
        success: res => {
          console.log('success');
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
    color: #888;
    font-size: 28rpx;
    line-height: 1.6;
    font-weight: 500;
  }
  button.favbt,
  uni-button.favbt {
    width: auto;
    display: inline-block;
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
// 暂无数据
.nodata {
  display: block;
  font-size: 28rpx;
  color: #999;
  line-height: 200rpx;
  text-align: center;
}
.clearit {
  height: 30rpx;
  display: block;
}
</style>
