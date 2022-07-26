<template>
	<view class="container" @touchmove.stop.prevent="moveHandle">
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
			<dropdown-screen></dropdown-screen>
		</view>
		<!-- 站点列表 -->
		<view class="sitewarp"><Sitelist ref="Sitelist"></Sitelist></view>
		<!-- 底部自定义tabBar -->
		<view class="tmenu">
			<view class="tm40">
				<view @click="index">
					<image src="../../static/image/bar_01.png" mode="widthFix"></image>
					<text>首页</text>
				</view>
				<view>
					<image src="../../static/image/bar_02a.png" mode="widthFix"></image>
					<text>站点</text>
				</view>
			</view>
			<view class="tmscan" @click="scango"><image src="../../static/image/scan.png" mode="widthFix"></image></view>
			<view class="tm40">
				<view @click="wait">
					<image src="../../static/image/bar_03.png" mode="widthFix"></image>
					<text>商城</text>
				</view>
				<view @click="mine">
					<image src="../../static/image/bar_04.png" mode="widthFix"></image>
					<text>我的</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import dropdownScreen from '@/components/dropdown-screen/dropdown-screen'; //筛选
import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue'; //加载
import Sitelist from '@/components/Site/Sitelist.vue'; //站点列表

export default {
	components: {
		dropdownScreen,
		hrPullLoad,
		Sitelist
	},
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		// 前往搜索页面
		search() {
			uni.navigateTo({
				url: '../Mine/Search'
			});
		},
		// 前往首页
		index() {
			uni.navigateTo({
				url: '../Index/Index'
			});
		},
		// 前往我的
		mine() {
			uni.navigateTo({
				url: '../Mine/Mine'
			});
		},
		// 扫码前往
		scango() {
			uni.navigateTo({
				url: '../Charge/Paychos'
			});
		},
		// 前往开发中页面
		wait() {
			uni.navigateTo({
				url: '../Other/Wait'
			});
		},
		// 禁止外壳页面手指上下滑动
		moveHandle: function() {
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
// 底部tabbar
.tmenu {
	width: 100%;
	background: #fff;
	padding: 0rpx 0;
	line-height: 30rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
	.tm40 {
		width: 38%;
		display: flex;
		align-items: center;
		justify-content: center;
		view {
			width: 50%;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 20rpx 0;
			font-size: 22rpx;
			color: #555;
			image {
				width: 46rpx;
				height: 46rpx;
			}
		}
	}
	.tmscan {
		width: 24%;
		display: flex;
		align-items: center;
		justify-content: center;
		image {
			width: 170rpx;
			height: 170rpx;
			margin-top: -60rpx;
		}
	}
}
</style>
