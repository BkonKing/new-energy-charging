<template>
	<view class="container">
		<view class="cardlist b_qingdao" @click="cardcardDel">
			<view class="cardA">
				<image src="../../static/bank/b_qingdao.png" mode="widthFix"></image>
				<view>
					<view>中国农业银行</view>
					<view class="ctag">储蓄卡</view>
				</view>
			</view>
			<view class="cardB">
				<text>****</text>
				<text>****</text>
				<text>****</text>
				<text>1234</text>
			</view>
		</view>
		<view class="cardadd disflex3" @click="cardadd">
			<image src="../../static/image/add.png" mode="widthFix"></image>
			<text class="addit">添加银行卡</text>
			<text>添加银行卡·安全 便捷 优惠</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		// 前往银行卡解绑
		cardcardDel(){
			uni.navigateTo({
				url:'RenzcardDel'
			})
		},
		// 前往绑定银行卡
		cardadd(){
			uni.navigateTo({
				url:'RenzcardAdd'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 30rpx;
}
.cardlist {
	width: 94%;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
	border-radius: 20rpx;
	color: #fff;
	margin: 0rpx auto 34rpx;
	padding: 30rpx 30rpx;

	.cardA {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 40rpx;
		font-size: 38rpx;
		font-weight: 500;

		image {
			width: 90rpx;
			height: 90rpx;
			background: #fff;
			border-radius: 100%;
			margin-right: 20rpx;
			border: 1px solid #fff;
		}
		.ctag {
			font-size: 28rpx;
			font-weight: normal;
			opacity: 0.7;
			margin-top: 4rpx;
		}
	}
	.cardB {
		width: 100%;
		overflow: hidden;
		font-weight: bold;
		text {
			float: left;
			font-size: 70rpx;
			width: 25%;
			text-align: center;
			opacity: 0.5;
		}
		text:last-child {
			font-size: 50rpx;
			font-weight: 500;
			opacity: 1;
		}
	}
}
.cardadd {
	width: 94%;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
	border-radius: 20rpx;
	color: #999;
	font-size: 28rpx;
	margin: 0rpx auto 34rpx;
	padding: 50rpx 0 50rpx;
	image {
		width: 90rpx;
		height: 90rpx;
		margin: 0rpx auto 20rpx;
	}
	.addit {
		font-size: 36rpx;
		font-weight: 500;
		color: #333;
		margin-bottom: 20rpx;
	}
	
}
/* 银行卡颜色 左上到右下 */
.blue {
	background-image: linear-gradient(to right bottom, #07b7fe, #2d7efc, #4858ff);
}
.red {
	background-image: linear-gradient(to right bottom, #ff696a, #fa4655, #f42542);
}
.green {
	background-image: linear-gradient(to right bottom, #00cfa2, #00bd94, #00b089);
}
.orange {
	background-image: linear-gradient(to right bottom, #fea94d, #f1893f, #e86b30);
}
</style>
