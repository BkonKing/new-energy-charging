<template>
	<view class="container">
		<!-- 暂无记录 显示 -->
		<block v-if="isshow">
			<view class="nodata">- 3天内暂无充电记录 -</view>
			<button class="gosy" @click="gosy">去充电</button>
		</block>
		<view class="ordul" v-for="t in 3" v-else>
			<view class="stcode">
				<text>充电桩编码：12345465456</text>
				<text>已完成</text>
			</view>
			<view class="stname"><view class="ellipsis">福州市规划设计研究院充电桩福州市规划设计研究院充电桩</view></view>
			<view class="stkind disflex4">
				<image src="../../static/image/logo2.png" mode="heightFix"></image>
				<text>逸充新能源</text>
			</view>
			<view class="stbst disflex4">
				<text class="ststar">起</text>
				<text>2021-06-20 15:00:21</text>
			</view>
			<view class="stbst disflex4">
				<text class="stend">讫</text>
				<text>2021-06-20 15:02:21</text>
			</view>
			<view class="stprice">
				<text>
					￥
					<text class="stbum">0.62</text>
				</text>
				<text>| 0.71度</text>
			</view>
		</view>
		<view class="clearit"></view>
	</view>
</template>

<script>
export default {
	data() {
		return { isshow: false };
	},
	onLoad() {},
	methods: {
		// 前往去充电首页
		gosy() {
			uni.navigateTo({
				url: '../Index/Index'
			});
		},
		// 前往订单详情
		orderdetail() {
			uni.navigateTo({
				url: './Orderdetail'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 30rpx;
}
.ordul {
	position: relative;
	width: 94%;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
	border-radius: 14rpx;
	font-size: 26rpx;
	color: #999;
	margin: 0rpx auto 30rpx;
	padding: 20rpx 30rpx;
	.stcode {
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 60rpx;
		text:nth-child(2) {
			color: #33b048;
		}
	}
	.stname {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32rpx;
		color: #333;
		font-weight: 500;
		line-height: 60rpx;
	}
	.stkind {
		font-size: 28rpx;
		color: #555;
		line-height: 60rpx;
		image {
			width: auto;
			height: 40rpx;
			margin-right: 10rpx;
		}
	}
	.stbst {
		line-height: 60rpx;
		.ststar {
			background: #edab99;
			font-size: 22rpx;
			color: #fff;
			width: 40rpx;
			height: 40rpx;
			vertical-align: middle;
			text-align: center;
			line-height: 40rpx;
			border-radius: 100rpx;
			margin-right: 15rpx;
		}
		.stend {
			background: #afc3ee;
			font-size: 22rpx;
			color: #fff;
			width: 40rpx;
			height: 40rpx;
			vertical-align: middle;
			text-align: center;
			line-height: 40rpx;
			border-radius: 100rpx;
			margin-right: 15rpx;
		}
	}

	.stprice {
		position: absolute;
		right: 30rpx;
		bottom: 20rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #555;
		font-weight: 500;
		.stbum {
			font-size: 34rpx;
			margin-right: 10rpx;
		}
	}
}
// 暂无数据
.nodata {
	display: block;
	font-size: 28rpx;
	color: #999;
	line-height: 200rpx;
	text-align: center;
}
.clearit {
	height: 30rpx;
	display: block;
}
button.gosy,
uni-button.gosy {
	position: fixed;
	left: 3%;
	bottom: 60rpx;
	z-index: 5;
	line-height: 90rpx;
	font-size: 34rpx;
	width: 94%;
	background: #33b048;
	color: #fff;
	font-weight: 500;
	border: 1px solid #33b048;
	box-shadow: 0 0 20rpx 10rpx rgba(45, 255, 80, 0.2);
	border-radius: 100rpx;
	margin: 0 auto;
}
</style>
