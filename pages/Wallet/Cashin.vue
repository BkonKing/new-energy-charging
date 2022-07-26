<template>
	<view class="container">
		<view class="cinA">
			<view class="danyu">当前余额：￥0.00 元</view>
			<view class="cinitem">
				<view>
					充值金额
					<text class="cinqi">￥1.00 起充</text>
				</view>
				<view class="cinip disflex4">
					<text>￥</text>
					<input placeholder="0.00" type="digit" />
				</view>
			</view>
			<view class="cinB">
				<view :class="current == index ? 'cinone' : ''" v-for="(item, index) in cinlist" :key="index" @click="cincheck(index)">
					<text class="cinpum">{{ item.price }}</text>
					<text>元</text>
				</view>
			</view>
		</view>
		<view class="cintage">请根据实际需求进行充值</view>
		<!-- 付款方式 除微信、支付宝外均显示 -->
		<!-- #ifndef MP-WEIXIN || MP-ALIPAY -->
		<view class="cinC">
			<view class="cinpayt">请选择支付方式</view>
			<view class="radioul">
				<radio-group @change="radioChange">
					<label class="radioli">
						<view class="radname">
							<image src="../../static/image/wx.png" mode="widthFix"></image>
							<text>微信钱包</text>
						</view>
						<radio value="1" checked color="#33b048" />
					</label>
					<label class="radioli">
						<view class="radname">
							<image src="../../static/image/zfb.png" mode="widthFix"></image>
							<text>支付宝钱包</text>
						</view>
						<radio value="2" color="#33b048" />
					</label>
				</radio-group>
			</view>
		</view>
		<!-- #endif -->
		<view class="paywarp"><button class="surepay">充值</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cinlist: [{ price: 5 }, { price: 10 }, { price: 20 }, { price: 50 }, { price: 100 }, { price: 200 }, { price: 500 }, { price: 1000 }],
			current: 0
		};
	},
	onLoad() {},
	methods: {
		// 选中充值金额
		cincheck(index) {
			this.current = index;
		},
		// 选择支付方式
		radioChange() {}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx 0 0;
}
.cinA {
	width: 94%;
	margin: 0 auto 30rpx;
	padding: 0 30rpx 30rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
	border-radius: 14rpx;
	font-size: 28rpx;
	color: #999;

	.danyu {
		font-size: 30rpx;
		color: #555;
		font-weight: 550;
		line-height: 100rpx;
	}

	.cinitem {
		border-top: 1px solid #ededed;
		border-bottom: 1px solid #ededed;
		padding: 30rpx 0 0;

		.cinip {
			font-size: 34rpx;
			color: #333;
			font-weight: 500;
			padding: 30rpx 0;

			input,
			uni-input {
				color: #333;
				width: 80%;
				font-size: 60rpx;
				padding: 0rpx 0;
			}
			.uni-input-placeholder {
				color: #333;
			}
		}
		.cinqi {
			margin-left: 16rpx;
			background: #ffeede;
			color: #f98416;
			font-size: 24rpx;
			padding: 5rpx 10rpx;
			border-radius: 10rpx;
		}
	}
}
.cinB {
	width: 100%;
	padding: 50rpx 0 0 0;
	font-size: 28rpx;
	color: #888;
	overflow: hidden;

	view {
		float: left;
		width: 29%;
		margin: 0 2% 30rpx;
		background: #f7f6fb;
		border: 1px dashed #dedede;
		text-align: center;
		padding: 30rpx 0;
		border-radius: 10rpx;
		font-weight: 500;
		.cinpum {
			font-size: 30rpx;
		}
	}
}
.cinone {
	color: #33b048;
	border: 1px dashed #33b048 !important;
	background: #e6f7e8 !important;
}

.cintage {
	width: 94%;
	margin: 0 auto 50rpx;
	font-size: 28rpx;
	color: #999;
}

// 选择付款方式
.cinC {
	width: 94%;
	margin: 0 auto 30rpx;
	padding: 0 30rpx 30rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
	border-radius: 14rpx;
	font-size: 30rpx;
	color: #555;

	.cinpayt {
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
		line-height: 100rpx;
	}
	.radioul {
		.radioli {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 0;
			border-bottom: 1px solid #ededed;
			.radname {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
					background: #f1f1f1;
					border-radius: 100%;
				}
			}
		}
	}
}
.paywarp {
	padding: 30rpx 0 30rpx;

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
