<template>
	<view class="container">
		<view class="dep_ul">
			<view class="bihead disflex">
				<view class="bikind disflex4">
					<image src="../../static/image/logo2.png" mode="heightFix"></image>
					<text>逸充新能源</text>
				</view>
				<text>2021-06-20 15:00:21</text>
			</view>
			<view class="biname ellipsis">福州市规划设计研究院充电桩</view>
			<view class="bipay">
				实付：
				<text>￥0.62</text>
			</view>
		</view>
		<view class="nomore">- 没有更多了 -</view>
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
	padding-top: 30rpx;
}
.dep_ul {
	width: 94%;
	background: #fff;
	box-shadow: 0rpx 0rpx 15rpx rgba(60, 122, 255, 0.1);
	border-radius: 14rpx;
	padding: 20rpx 24rpx 20rpx;
	margin: 0rpx auto 30rpx;
	line-height: 1;
	.bihead {
		font-size: 24rpx;
		color: #999;
		line-height: 60rpx;
		.bikind {
			font-size: 28rpx;
			color: #555;
			line-height: 60rpx;
			image {
				width: auto;
				height: 36rpx;
				margin-right: 10rpx;
			}
		}
	}
	.biname {
		width: 100%;
		font-size: 32rpx;
		color: #555;
		font-weight: 500;
		line-height: 70rpx;
		height: 70rpx;
	}
	.bipay {
		font-size: 28rpx;
		color: #555;
		font-weight: 550;
		line-height: 50rpx;
		text {
			font-size: 30rpx;
		}
	}
}
// 没有更多
.nomore {
	display: block;
	font-size: 28rpx;
	color: #999;
	line-height: 100rpx;
	text-align: center;
	clear: both;
}

</style>
