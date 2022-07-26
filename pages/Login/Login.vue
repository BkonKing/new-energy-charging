<template>
	<view class="container">
		<view class="wlogin">
			<block v-if="isshow">
				<view class="wslogen">欢迎来到逸充新能源</view>
				<image src="../../static/image/logo.png" mode="widthFix" class="wlogo"></image>
				<text>该程序将获取以下授权:</text>
				<text class="wtips">获得您的公开信息（昵称、头像等）</text>
				<button class="wbtA">允许</button>
				<view class="wreject">拒绝</view>
			</block>
			<block v-else="!isshow">
				<button class="wbtB">微信用户一键登录</button>
				<!-- #ifdef MP-ALIPAY -->
				<button class="wbtB">支付宝用户一键登录</button>
				<!-- #endif -->
				<view class="wxiey">
					登录即同意
					<text>《逸充新能源使用协议》</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isshow: true
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.wlogin {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 32rpx;
	color: #555;
	line-height: 2;
}
.wslogen {
	width: 100%;
	background: #fff;
	font-size: 60rpx;
	color: #333;
	text-align: center;
	line-height: 180rpx;
}
.wlogo {
	width: 140rpx;
	height: 140rpx;
	border-radius: 20rpx;
	margin: 140rpx 0;
}
.wtips {
	font-size: 28rpx;
	color: #999;
}
button.wbtA,
uni-button.wbtA {
	line-height: 100rpx;
	font-size: 34rpx;
	width: 60%;
	background: #33b048;
	color: #fff;
	font-weight: 500;
	border: 1px solid #33b048;
	box-shadow: 0 0 20rpx 10rpx rgba(45, 255, 80, 0.2);
	border-radius: 100rpx;
	margin: 150rpx 0 60rpx;
}
.wreject {
	font-size: 34rpx;
	color: #777;
	font-weight: 500;
}
button.wbtB,
uni-button.wbtB {
	line-height: 100rpx;
	font-size: 34rpx;
	width: 80%;
	background: #33b048;
	color: #fff;
	font-weight: 500;
	border: 1px solid #33b048;
	box-shadow: 0 0 20rpx 10rpx rgba(45, 255, 80, 0.2);
	border-radius: 100rpx;
	margin: 40% 0 60rpx;
}
.wxiey {
	position: fixed;
	bottom: 60rpx;
	left: 0;
	z-index: 2;
	width: 100%;
	text-align: center;
	font-size: 30rpx;
	color: #999;
	line-height: 3;

	text {
		color: #33b048;
		padding: 0 10rpx;
	}
}
</style>
