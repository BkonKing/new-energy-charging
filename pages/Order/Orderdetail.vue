<template>
	<view class="container">
		<view class="odtitle">
			<view class="disflex4">
				<text>已支付</text>
				<text class="weip">
					剩
					<text class="weit">23小时59分</text>
					自动结算订单
				</text>
			</view>
			<view class="disflex4">
				<text>订单编号：113564564546546456</text>
				<text class="tcope" @click="setClipboardData()">复制</text>
			</view>
		</view>
		<!-- 费用信息 -->
		<view class="odtitem">
			<view class="otbig">费用信息</view>
			<view class="otli">
				<text>订单总额</text>
				<view class="otmx">
					<view>
						￥
						<text class="otmx_num">0.44</text>
					</view>
					<view class="otmx_sm">
						<text class="mr-20">电费:￥0.30</text>
						<text>服务费:￥0.14</text>
					</view>
				</view>
			</view>
			<view class="otli">
				<text>电站优惠</text>
				<view class="otmx">
					<view class="colgreen">
						-￥
						<text class="otmx_num">0.05</text>
					</view>
					<view class="otmx_sm"><text>服务费6.5折</text></view>
				</view>
			</view>
			<!-- <view class="otli">
				<text>结算策略</text>
				<text class="otcl">手动结算</text>
			</view> -->
			<view class="sfmon">
				<view>
					<text class="mr-20">实付金额</text>
					<text>￥</text>
					<text class="sfnum">0.30</text>
				</view>
				<view>个人账户</view>
			</view>
		</view>
		<!-- 充电信息 -->
		<view class="odtitem">
			<view class="otbig">充电信息</view>
			<view class="stbst disflex4">
				<text class="ststar">起</text>
				<text>2021-06-20 15:00:21</text>
			</view>
			<view class="stbst disflex4">
				<text class="stend">讫</text>
				<text>2021-06-20 15:02:21</text>
			</view>
			<view class="reson">
				<text>停止原因：平台正常停止</text>
				<text>SOC:86%-87%</text>
			</view>
			<view class="otli">
				<text>充电车辆</text>
				<view class="otmx">
					<view>闽AD59199</view>
					<view class="otmx_sm">北京EU5</view>
				</view>
			</view>
			<view class="otli">
				<text>充电时长</text>
				<view class="otmx">00:00:30</view>
			</view>
			<view class="otli">
				<text>充电电量</text>
				<view class="otmx">0.342度</view>
			</view>
			<view class="sechart" @click="orderchart">查看充电曲线</view>
		</view>
		<!-- 终端信息 -->
		<view class="odtitem">
			<view class="otbig">终端信息</view>
			<view class="zduan">
				<view class="zdshop ellipsis" @click="sitedetail">
					<text class="zdkind">自营</text>
					<text>福州市规划设计研究院充电桩福州市规划设计研究院充电桩</text>
				</view>
				<view class="zdcode">
					<text>终端编号：1321321131</text>
					<text class="zdcope" @click="setClipboardData">复制</text>
				</view>
			</view>
		</view>
		<view class="paywarp"><button class="surepay">立即支付</button></view>
		<view class="clearit"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
    setClipboardData(data) {
      uni.setClipboardData({
      	data: `${data}`,
      	success: function () {
      		console.log('success');
      	}
      });
    },
		// 前往充电曲线
		orderchart() {
			uni.navigateTo({
				url: '/pages/Order/Orderchart'
			});
		},
		// 前往终端详情
		sitedetail() {
			uni.navigateTo({
				url: '/pages/Site/Sitedetail'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.odtitle {
	font-size: 28rpx;
	color: #333;
	padding: 30rpx 4%;

	view:first-child {
		font-size: 44rpx;
		font-weight: 550;
		line-height: 90rpx;
		margin-bottom: 10rpx;
	}
	.weip {
		font-size: 22rpx;
		color: #888;
		border: 1px solid #888;
		line-height: 1.2;
		padding: 4rpx 10rpx;
		font-weight: normal;
		margin-left: 20rpx;

		.weit {
			font-size: 26rpx;
			font-weight: 500;
			color: #333;
			padding: 0 6rpx;
		}
	}
	.tcope {
		color: #33b048;
		margin-left: 20rpx;
	}
}
.odtitem {
	position: relative;
	width: 94%;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
	border-radius: 14rpx;
	font-size: 30rpx;
	color: #333;
	margin: 0rpx auto 30rpx;
	padding: 30rpx 30rpx;

	.otbig {
		font-size: 34rpx;
		font-weight: 500;
		margin-bottom: 20rpx;
	}
	.otli {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		font-weight: 500;
		line-height: 1.8;
		.otmx {
			text-align: right;
			.otmx_num {
				font-size: 34rpx;
				font-weight: 550;
			}
			.otmx_sm {
				font-size: 24rpx;
				font-weight: normal;
				color: #999;
			}
		}
		.otcl {
			border: 1px solid #777;
			border-radius: 6rpx;
			padding: 5rpx 10rpx;
			display: inline-block;
			color: #777;
			font-size: 28rpx;
		}
	}
	// 实际金额
	.sfmon {
		margin-top: 30rpx;
		border-top: 1px solid #ededed;
		padding-top: 20rpx;
		text-align: right;
		font-size: 28rpx;
		line-height: 1.4;
		.sfnum {
			font-size: 50rpx;
			font-weight: 550;
		}
		view:nth-child(2) {
			font-size: 24rpx;
			font-weight: normal;
			color: #999;
		}
	}
	// 查看曲线
	.sechart {
		width: 60%;
		text-align: center;
		font-size: 28rpx;
		color: #777;
		line-height: 60rpx;
		border: 1px solid #777;
		border-radius: 100rpx;
		margin: 40rpx 20% 10rpx;
	}
	// 充电起讫
	.stbst {
		font-size: 28rpx;
		line-height: 60rpx;
		.ststar {
			background: #edab99;
			font-size: 24rpx;
			color: #fff;
			width: 44rpx;
			height: 44rpx;
			vertical-align: middle;
			text-align: center;
			line-height: 44rpx;
			border-radius: 100rpx;
			margin-right: 15rpx;
		}
		.stend {
			background: #afc3ee;
			font-size: 24rpx;
			color: #fff;
			width: 44rpx;
			height: 44rpx;
			vertical-align: middle;
			text-align: center;
			line-height: 44rpx;
			border-radius: 100rpx;
			margin-right: 15rpx;
		}
	}
	.reson {
		font-size: 28rpx;
		color: #33b048;
		line-height: 50rpx;
		padding-bottom: 20rpx;
		margin: 10rpx 0 20rpx;
		border-bottom: 1px solid #ededed;
		display: flex;
		flex-direction: column;
	}
	// 终端信息
	.zduan {
		width: 100%;
		background: url(../../static/image/arrow_01.png) right center no-repeat;
		background-size: 50rpx 50rpx;
		padding-right: 60rpx;
		.zdshop {
			width: 100%;
			font-size: 30rpx;
			color: #333;
			font-weight: 500;
			line-height: 60rpx;
			.zdkind {
				font-size: 22rpx;
				font-weight: normal;
				color: #33b048;
				border: 1px solid #33b048;
				padding: 4rpx 10rpx;
				border-radius: 4px;
				margin-right: 10rpx;
			}
		}
		.zdcode {
			font-size: 28rpx;
			color: #777;
			margin: 20rpx 0 10rpx;
			.zdcope {
				color: #33b048;
				margin-left: 20rpx;
			}
		}
	}
}
.colgreen {
	color: #33b048;
}
.clearit {
	height: 30rpx;
	display: block;
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
