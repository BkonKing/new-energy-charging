<template>
	<view class="container">
		<view class="lgimg">
			<image src="../../static/image/logo.png" mode="widthFix"></image>
			<view>逸充新能源</view>
			<text>当前版本号：1.0.0</text>
		</view>
		<view class="about">
			福建逸充物联网科技有效公司（逸充新能源）是国内领先的充电桩运营服务平台，通过逸充新能源充电APP+城市智能充电监控平台，整合全国各充电桩运营群体，实现统一支付、交易管理、运营维护、向新能源车主提供公桩充电服务、私桩预约充电服务、快捷搜索、扫码充电、在线支付、车联网等服务，同时整合充电桩产品和新能源车辆周边产品，为新能源车主提供商城服务。
		</view>
		<view class="xyli" @click="agreeYs">《隐私协议》</view>
		<view class="xyli" @click="agreeUse">《使用协议》</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		// 前往隐私协议
		agreeYs() {
			uni.navigateTo({
				url: '/pages/Other/AgreeYs'
			});
		},
		// 前往使用协议
		agreeUse() {
			uni.navigateTo({
				url: '/pages/Other/AgreeUse'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	height: 100%;
	background: #fff;
}
.container {
	background: #fff;
	color: #666;
	font-size: 30rpx;
	line-height: 2;
}
.lgimg {
	display: flex;
	align-items: center;
	flex-direction: column;
	text-align: center;
	line-height: 1.8;
	font-size: 44rpx;
	color: #222;
	font-weight: 550;

	image {
		width: 150rpx;
		height: 150rpx;
		margin: 80rpx auto 40rpx;
	}
	text {
		color: #bbb;
		font-weight: normal;
		font-size: 26rpx;
	}
}
.about {
	padding: 50rpx 4% 70rpx;
	text-indent: 2em;
}
.xyli {
	width: 92%;
	margin: 0 auto;
	display: block;
	padding: 20rpx 0;
	font-size: 32rpx;
	color: #333;
	font-weight: 550;
	background: url(../../static/image/arrow_01.png) right center no-repeat;
	background-size: 30rpx 30rpx;
	border-bottom: 1px dashed #ddd;
}
</style>
