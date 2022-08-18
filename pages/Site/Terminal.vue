<template>
  <view class="dylist">
    <view class="leader">
      <view class="ltitle">
        <view
          @tap="changeShowType(0)"
          :class="showType == 0 ? 'activeContentA' : ''"
        >
          <view>快充（空闲{{ siteData.freeFastNum || 0 }} | 共{{ siteData.fastNum || 0 }}）</view>
        </view>
        <view
          @tap="changeShowType(1)"
          :class="showType == 1 ? 'activeContentB' : ''"
        >
          <view>慢充（空闲{{ siteData.freeSlowNum || 0 }} | 共{{ siteData.slowNum || 0 }}）</view>
        </view>
      </view>
    </view>
    <!-- 多个tab切换的时候，注意插件的isTab属性， 它可以用来防止两个tab之间用手滑动时造成的误操作-->
    <swiper :current="showType" @change="onChange">
      <swiper-item>
        <terminal-list
          type="fast"
          ref="TerminalK"
          :siteId="id"
          :name="name"
          @refresh="findSiteById"
        ></terminal-list>
      </swiper-item>
      <swiper-item>
        <terminal-list
          type="slow"
          ref="TerminalM"
          :siteId="id"
          :name="name"
          @refresh="findSiteById"
        ></terminal-list>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { findSiteById } from '@/api/site.js';
import TerminalList from './components/TerminalList.vue'; //快充
export default {
  components: {
    TerminalList
  },
  data() {
    return {
      id: '',
      name: '',
      showType: 0,
      siteData: {}
    };
  },
  computed: {
    ...mapGetters(['locationInfo'])
  },
  onLoad({ id, name }) {
    this.id = id;
    this.name = name;
    this.findSiteById()
  },
  methods: {
    findSiteById() {
      findSiteById({
        id: this.id,
        lon: this.locationInfo.lon || 0,
        lat: this.locationInfo.lat || 0
      }).then(({ result }) => {
        this.siteData = result || {};
      });
    },
    // 切换显示内容
    changeShowType(type) {
      this.showType = type;
    },
    // 手动滑动swiper触发的事件
    onChange(e) {
      this.showType = e.detail.current;
    }
  }
};
</script>

<style lang="scss" scoped>
.dylist {
  width: 100%;
  height: 100%;
  .leader {
    width: 100%;
    height: 91rpx;
    border-top: 1px solid #eee;
    .ltitle {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > view {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 85rpx;
        background: #fff;
        border-bottom: 6rpx solid #fff;
        color: #888;
        font-size: 28rpx;
      }
      .activeContentA {
        font-size: 30rpx;
        font-weight: 500;
        background: #fff;
        border-bottom: 6rpx solid #f18b70;
        color: #f18b70;
      }
      .activeContentB {
        font-size: 30rpx;
        font-weight: 500;
        background: #fff;
        border-bottom: 6rpx solid #86a5e9;
        color: #86a5e9;
      }
    }
  }
  swiper {
    width: 100%;
    /* #ifdef H5 */
    height: calc(100vh - 100rpx - 44px);
    /* #endif */
    
    /* #ifndef H5 */
    height: calc(100vh - 100rpx);
    /* #endif */
    
  }
  swiper-item {
    width: 100%;
    height: 100%;
  }
}
</style>
