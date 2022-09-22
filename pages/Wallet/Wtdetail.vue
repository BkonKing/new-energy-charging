<template>
	<view class="container">
		<view class="txdA">
			<!-- 类型为：充值、退款、提现退回 -->
			<block v-if="kindshow">
				<view>充值</view>
				<view class="wanum colorb">
					+10.70
					<text>元</text>
				</view>
			</block>
			<!-- 类型为：消费、提现 -->
			<block v-else>
				<view>消费</view>
				<view class="wanum">
					-10.70
					<text>元</text>
				</view>
			</block>
		</view>
		<view class="txdB">
			<view class="txditem">
				<text>订单号</text>
				<text>CZ123456789101112</text>
			</view>
			<view class="txditem">
				<text>交易金额</text>
				<text>￥10.7</text>
			</view>
			<view class="txditem">
				<text>优惠金额</text>
				<text class="colora">-￥1.0</text>
			</view>
			<view class="txditem">
				<text>实际交易金额</text>
				<text>￥9.7</text>
			</view>
			<view class="txditem">
				<text>交易后余额</text>
				<text class="colorb">￥51.7</text>
			</view>
			<view class="txditem">
				<text>支付通道</text>
				<text>微信</text>
			</view>
			<view class="txditem">
				<text>支付状态</text>
				<text>已支付</text>
			</view>
			<view class="txditem">
				<text>支付时间</text>
				<text>2022.06.16 14:40</text>
			</view>
		</view>
		<!-- 状态为待支付时显示 -->
		<view class="paywarp"><button class="surepay">去支付</button></view>
		<view class="clearha"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//种类
			kindshow: true
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx 0;
}
//提现
.txdA {
	width: 94%;
	margin: 0 auto 30rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
	border-radius: 14rpx;
	color: #555;
	line-height: 1.6;
	text-align: center;
	font-size: 30rpx;
	padding: 30rpx 0;

	.wanum {
		color: #33b048;
		font-size: 80rpx;
		font-weight: bold;
		text {
			font-size: 28rpx;
			margin-left: 10rpx;
		}
	}
}
.txdB {
	width: 94%;
	margin: 0 auto 30rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
	border-radius: 14rpx;
	color: #333;
	line-height: 1.8;
	font-size: 30rpx;
	padding: 10rpx 40rpx 10rpx;
	font-weight: 500;

	.txditem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px dashed #dedede;
		padding: 24rpx 0;
		text:nth-child(1) {
			color: #888;
		}
		text:nth-child(2) {
			font-weight: 500;
		}
	}
}
.colora {
	color: #33b048;
}
.colorb {
	color: #eb3735 !important;
}
.clearha {
	height: 30rpx;
	clear: both;
}
.paywarp {
	padding: 20rpx 0 30rpx;

	button.surepay,
	uni-button.surepay {
		line-height: 90rpx;
		font-size: 34rpx;
		width: 94%;
		background: #33b048;
		color: #fff;
		font-weight: 500;
		border: 1px solid #33b048;
		box-shadow: 0 0 20rpx 5rpx rgba(45, 255, 80, 0.2);
		border-radius: 100rpx;
		margin: 0rpx auto;
	}
}

</style>
