<template>
	<view class="container">
		<view class="waitimg">
			<image src="../../static/image/wait.gif" mode="widthFix"></image>
			<view>商城开发中，敬请期待!</view>
		</view>
		<!-- 底部自定义tabBar -->
		<custom-tab-bar></custom-tab-bar>
	</view>
</template>

<script>
import CustomTabBar from '@/components/CustomTabBar/CustomTabBar.vue'
export default {
	components: {
		CustomTabBar,
	},
	data() {
		return {};
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
</style>
