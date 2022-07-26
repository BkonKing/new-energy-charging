<template>
	<view class="container">
		<view class="waitimg">
			<image src="../../static/image/wait.gif" mode="widthFix"></image>
			<view>商城开发中，敬请期待!</view>
		</view>
		<!-- 底部自定义tabBar -->
		<view class="tmenu">
			<view class="tm40">
				<view @click="index">
					<image src="../../static/image/bar_01.png" mode="widthFix"></image>
					<text>首页</text>
				</view>
				<view @click="sitelist">
					<image src="../../static/image/bar_02.png" mode="widthFix"></image>
					<text>站点</text>
				</view>
			</view>
			<view class="tmscan" @click="scango"><image src="../../static/image/scan.png" mode="widthFix"></image></view>
			<view class="tm40">
				<view>
					<image src="../../static/image/bar_03a.png" mode="widthFix"></image>
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
export default {
	data() {
		return {
			// 前往首页
			index() {
				uni.navigateTo({
					url: '../Index/Index'
				});
			},
			// 前往站点
			sitelist() {
				uni.navigateTo({
					url: '../Site/Sitelist'
				});
			},
			// 前往我的
			mine() {
				uni.navigateTo({
					url: '../Mine/Mine'
				});
			}
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
page,
.container {
	background: #fff;
}
.waitimg {
	width: 100%;
	padding: 150rpx 0 0rpx;
	margin: 0 auto;
	font-size: 32rpx;
	color: #888;
	line-height: 2;
	text-align: center;
	image {
		width: 50%;
		height: auto;
		margin-bottom: 100rpx;
	}
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
