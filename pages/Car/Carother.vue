<template>
	<view class="container">
		<view class="othip"><textarea placeholder="输入您的车型" class="ycbuc" maxlength="200" /></view>
		<view class="wfoot"><button class="combutton">提交</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.container {
	background: #fff;
	padding-top: 30rpx;
}
.othip {
	width: 94%;
	margin: 0 auto 30rpx;
	font-size: 28rpx;
	.ycbuc {
		width: 100%;
		font-size: 28rpx;
		border-radius: 14rpx;
		background: #f1f1f1;
		padding: 30rpx;
		margin: 0rpx 0;
	}
}
// 底部按钮
.wfoot {
	width: 100%;
	padding: 30rpx 3%;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 9;
}
</style>
