<template>
	<view class="container">
		<view class="ysqnote">
			预授权支付：您可以选择本次订单预计充电金额，我们最后会
			<text>根据最终的结算金额退回给您</text>
			。选择手动支付，您在24H内可自行进行支付，超过24H则会使用系统计算出最终价格进行结算。如选择自动支付，则会使用系统计算出的最终价格进行结算。
		</view>
		<!-- 预付金额 -->
		<view class="ysqitem">
			<view class="ysqtitle">预付金额</view>
			<view class="ysqip disflex4">
				<text>￥</text>
				<input type="digit" placeholder="输入您的实际支付金额" />
			</view>
			<view class="ysqli">
				<view :class="currentA == index ? 'csnone' : ''" v-for="(item, index) in sqAlist" :key="index" @click="sqAcheck(index)">
					<text>{{ item }}</text>
					元
				</view>
			</view>
		</view>
		<!-- 退款方式 -->
		<view class="ysqitem">
			<view class="ysqtitle">预授权金额会优先抵用充电费用，剩余金额将</view>
			<view class="ysqli"><view class="csnone">实时原路返回</view></view>
		</view>
		<!-- 金额不足 -->
		<view class="ysqitem">
			<view class="ysqtitle">预先支付金额不足时</view>
			<view class="ysqli">
				<view :class="currentB == index ? 'csnone' : ''" v-for="(item, index) in sqBlist" :key="index" @click="sqBcheck(index)">{{ item }}</view>
			</view>
			<view>余额：0.00元</view>
		</view>
		<view class="clearw"></view>
		<!-- 底部按钮 -->
		<view class="wfoot"><button class="combutton">确定</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 预付金额
			sqAlist: [30, 50],
			currentA: 0,
			// 金额不足
			sqBlist: ['终止充电', '使用个人账户继续充电'],
			currentB: 0
		};
	},
	onLoad() {},
	methods: {
		// 选中充值金额
		sqAcheck(index) {
			this.currentA = index;
		},
		// 选中金额不足时
		sqBcheck(index) {
			this.currentB = index;
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	background: #fff;
	padding: 30rpx 30rpx 0;
}
.ysqnote {
	width: 100%;
	background: #f1f1f1;
	padding: 24rpx;
	border-radius: 14rpx;
	margin-bottom: 30rpx;
	font-size: 28rpx;
	color: #666;
	line-height: 1.8;
	text {
		color: #333;
		font-weight: 500;
	}
}
.ysqtitle {
	color: #333;
	font-size: 30rpx;
	font-weight: 500;
	margin-bottom: 20rpx;
}
.ysqitem {
	padding: 20rpx 0 20rpx;
	.ysqip {
		padding: 0rpx 0 20rpx;
		border-bottom: 1px solid #ededed;
		font-size: 40rpx;
		font-weight: 550;
		color: #333;
		line-height: 60rpx;
		margin-bottom: 30rpx;

		input,
		uni-input {
			color: #333;
			width: 80%;
      height: 60rpx;
      line-height: 60rpx;
			font-size: 60rpx;
			margin-left: 10rpx;
		}
		.uni-input-placeholder {
			color: #999;
			font-size: 40rpx;
		}
	}
	// 选择
	.ysqli {
		width: 100%;
		padding: 10rpx 0 0 0;
		font-size: 28rpx;
		color: #888;
		overflow: hidden;

		view {
			float: left;
			display: inline-block;
			width: auto;
			margin: 0 30rpx 30rpx 0;
			background: #f7f6fb;
			border: 1px dashed #dedede;
			text-align: center;
			padding: 14rpx 50rpx;
			border-radius: 10rpx;
			text {
				font-size: 50rpx;
				margin-right: 10rpx;
			}
		}
	}
	.csnone {
		color: #33b048;
		border: 1px dashed #33b048 !important;
		background: #e6f7e8 !important;
	}
}
// 底部按钮
.wfoot {
	width: 100%;
	box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.05);
	background: #fff;
	padding: 30rpx 3%;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 9;
}
.clearw {
	height: 180rpx;
	display: block;
}

</style>
