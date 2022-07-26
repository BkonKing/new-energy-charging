<template>
	<view class="container">
		<view class="billul">
			<view class="billitem" @click="billchose">
				<text>开具电子发票</text>
				<image src="../../static/image/arrow_01.png" mode="widthFix"></image>
			</view>
			<view class="billitem" @click="billhistory">
				<text>开票历史</text>
				<image src="../../static/image/arrow_01.png" mode="widthFix"></image>
			</view>
			<view class="billitem">
				<text>发票帮助</text>
				<image src="../../static/image/arrow_01.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="cotts">
			<view>温馨提示</view>
			<view>1、预计在24小时内将电子发票推送至您的邮箱；</view>
			<view>2、发票类型：电子发票；</view>
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
		// 前往选择订单
		billchose: function() {
			uni.navigateTo({
				url: './Billchose'
			});
		},
		// 前往开票历史
		billhistory: function() {
			uni.navigateTo({
				url: './Billhistory'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 30rpx;
}
.billul {
	width: 100%;
	background: #fff;
	padding: 0 3%;
	font-size: 30rpx;
	color: #555;
	padding-bottom: 20rpx;
	font-weight: 500;
	margin-bottom: 30rpx;
}
.billitem {
	width: 100%;
	padding: 30rpx 0;
	border-bottom: 1px solid #ededed;
	display: flex;
	align-items: center;
	justify-content: space-between;

	image {
		width: 30rpx;
		height: 30rpx;
	}
}
/* 温馨提示 */
.cotts {
	width: 93%;
	font-size: 28rpx;
	line-height: 1.8;
	color: #888;
	font-weight: 500;
	margin: 50rpx auto;
}

.cotts view {
	margin-bottom: 10rpx;
}

.cotts view:first-child {
	margin-bottom: 20rpx;
	font-size: 32rpx;
	color: #33b048;
}

</style>
