<template>
	<view class="container" @touchmove.stop.prevent="moveHandle">
    <uni-nav-bar title="站点" :border="false" statusBar="false"></uni-nav-bar>
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
		<!-- 站点列表 -->
		<view class="sitewarp"><Sitelist ref="Sitelist"></Sitelist></view>
		<!-- 底部自定义tabBar -->
		<custom-tab-bar></custom-tab-bar>
	</view>
</template>

<script>
import { findSiteByKey } from '@/api/site.js';
import dropdownScreen from '@/components/dropdown-screen/dropdown-screen'; //筛选
import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue'; //加载
import Sitelist from '@/components/Site/Sitelist.vue'; //站点列表
import CustomTabBar from '@/components/CustomTabBar/CustomTabBar.vue';

const paramKeys = {
  0: 'equipmentAction',
  1: 'parkType'
}

export default {
	components: {
		CustomTabBar,
		dropdownScreen,
		hrPullLoad,
		Sitelist
	},
	data() {
		return {
      params: {
        equipmentAction : undefined,
        parkType : undefined
      },
      siteListData: []
    };
	},
	onLoad() {},
	methods: {
		// 前往搜索页面
		search() {
			uni.navigateTo({
				url: '/pages/Mine/Search'
			});
		},
    getListData() {
      findSiteByKey({
        ...this.params
      }).then(({ result }) => {
        this.siteListData = result || [];
      });
    },
    getParams({$index, value}) {
      this[paramKeys[$index]] = value
    },
		// 禁止外壳页面手指上下滑动
		moveHandle() {
			return false;
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
// 站点列表
.sitewarp {
	width: 100%;
	height: calc(100vh - 90rpx - 88rpx - 140rpx);
}
</style>
