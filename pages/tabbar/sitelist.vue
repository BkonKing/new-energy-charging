<template>
  <view class="container">
    <z-paging
      v-model="siteListData"
      class="site-list-paging"
      ref="paging"
      :auto="false"
      :fixed="true"
      @query="queryList"
    >
      <template slot="top">
        <!-- #ifdef MP-WEIXIN -->
        <uni-nav-bar
          title="站点"
          :border="false"
          statusBar="false"
        ></uni-nav-bar>
        <!-- #endif -->
        <!-- 顶部搜索+筛选 -->
        <view class="shead">
          <!-- 定位搜索 -->
          <view class="locsea" @click="search">
            <view>
              <text>福州</text>
              <text>搜索你想要去的充电桩站点/目的地</text>
            </view>
          </view>
          <!-- 筛选 -->
          <dropdown-screen @finish="getParams"></dropdown-screen>
        </view>
      </template>
      <template slot="bottom">
        <div class="paging-bottom">
          <!-- 底部自定义tabBar -->
          <custom-tab-bar class="sitelist-tabbar"></custom-tab-bar>
        </div>
      </template>
      <Sitelist ref="Sitelist" :data="siteListData"></Sitelist>
    </z-paging>
  </view>
</template>

<script>
import { findSiteByKey } from '@/api/site.js';
import dropdownScreen from '@/components/dropdown-screen/dropdown-screen'; //筛选
import Sitelist from '@/components/Site/Sitelist.vue'; //站点列表
import CustomTabBar from '@/components/CustomTabBar/CustomTabBar.vue';
import hideBackHome from '@/mixins/hideBackHome.js';

const paramKeys = {
  0: 'equipmentAction',
  1: 'parkType'
};

export default {
  mixins: [hideBackHome],
  components: {
    CustomTabBar,
    dropdownScreen,
    Sitelist
  },
  data() {
    return {
      params: {
        equipmentAction: undefined,
        parkType: undefined
      },
      siteListData: [],
      currentLocation: {
        lat: undefined,
        lon: undefined
      }
    };
  },
  onLoad() {
    this.getLocationInfo();
  },
  methods: {
    getLocationInfo() {
      this.$store
        .dispatch('getLocationInfo')
        .then(({ longitude, latitude }) => {
          this.currentLocation.lon = longitude;
          this.currentLocation.lat = latitude;
          this.$refs.paging.reload(true);
        })
        .catch(() => {
          this.rejectGetLocation();
          this.$refs.paging.complete([]);
        });
    },
    // 彻底拒绝位置获取
    rejectGetLocation() {
      uni.showToast({
        title: '你拒绝了授权，无法获得周边站点信息',
        icon: 'none',
        duration: 2000
      });
    },
    // 前往搜索页面
    search() {
      uni.navigateTo({
        url: '/pages/Mine/Search'
      });
    },
    queryList(pageNo, pageSize) {
      if (!this.currentLocation.lon || !this.currentLocation.lat) {
        this.$refs.paging.complete([]);
        return;
      }
      findSiteByKey({
        ...this.params,
        ...this.currentLocation,
        pageNo,
        pageSize
      }).then(({ result }) => {
        const records = result?.siteInfo?.records || [];
        if (records.length > 0) {
          this.$refs.paging.complete(records);
        } else {
          this.$refs.paging.complete([]);
        }
      });
    },
    getParams({ $index, value }) {
      const key = paramKeys[$index];
      this.params[key] = value;
      this.$refs.paging.reload(true);
    }
  }
};
</script>
<style lang="scss" scoped>
page {
  background: #fff;
}
.container {
  overflow-y: hidden;
}
// 顶部搜索+筛选
.shead {
  width: 100%;
  background: #fff;

  //定位搜索 h=90rpx,筛选88rpx
  .locsea {
    width: 100%;
    padding: 20rpx 3% 0;
    background: #fff;
    position: relative;
    z-index: 99;
    font-size: 24rpx;
    color: #999;
    view {
      width: 100%;
      margin: 0rpx auto;
      line-height: 70rpx;
      border-radius: 14rpx;
      background: #f1f1f1;
    }

    text:nth-child(1) {
      color: #555;
      font-weight: 500;
      padding: 0 30rpx;
      border-right: 1px solid #ddd;
    }
    text:nth-child(2) {
      padding: 0 60rpx;
      border-right: 1px solid #ddd;
      background: url(../../static/image/ico_02.png) 20rpx center no-repeat;
      background-size: 30rpx 30rpx;
      border: none;
    }
  }
}
.paging-bottom {
  height: 112rpx;
  position: relative;
}
.sitelist-tabbar ::v-deep .tmenu {
  position: absolute !important;
}
.site-list-paging ::v-deep .zp-l-container {
  padding-bottom: 80rpx;
}
</style>
