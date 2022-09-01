<template>
	<view class="container">
		<view class="rztitle">请输入您的要更换的手机号码</view>
		<view class="rzul">
			<view class="rzli">
				<text>手机号码</text>
				<input type="number" placeholder="输入手机号" />
			</view>
			<view class="rzli2">
				<text>验证码</text>
				<input type="number" placeholder="输入验证码" />
				<!-- hy:倒计时样式加载 disable -->
				<view class="yzmi">获取验证码</view>
			</view>
		</view>
		<view class="agrcd disflex4">
			<checkbox :checked="true" class="checkbox" style="transform:scale(0.7)" />
			<text>我已阅读并同意签署</text>
			<text>《逸充新能源使用协议》</text>
		</view>
		<button class="surerz">确定更改</button>
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
	background: #fff;
}
.rztitle {
	background: #f1f1f1;
	width: 100%;
	padding: 20rpx 26rpx;
	font-size: 28rpx;
	color: #555;
}
.rzul {
	width: 100%;
	padding: 0 26rpx;
	font-size: 30rpx;
	color: #888;
	line-height: 2.2;
}
.rzli {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 0;
	border-bottom: 1px solid #ededed;

	text {
		width: 30%;
	}
	text:last-child {
		color: #333;
		text-align: right;
	}
	input,
	uni-input {
		color: #333;
		width: 70%;
		text-align: right;
		font-size: 30rpx;
	}
}
.rzli2 {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30rpx 0;
	border-bottom: 1px solid #ededed;

	input,
	uni-input {
		color: #333;
		width: 40%;
		text-align: right;
		font-size: 30rpx;
	}
	.yzmi {
		font-size: 26rpx;
		text-align: center;
		padding: 20rpx 20rpx;
		border: 1px solid #fe5f5e;
		color: #fe5f5e;
		background: none;
		border-radius: 10rpx;
		line-height: 1;
	}
	.disable {
		border: 1px solid #ccc;
		background: #ddd;
		color: #999;
	}
	
}
//协议
.agrcd {
	width: 100%;
	padding: 0 26rpx;
	font-size: 28rpx;
	color: #888;
	margin: 50rpx 0;
	text:last-child {
		color: #33b048;
		margin-left: 10rpx;
	}
	.checkbox {
		margin-right: 0px;
	}
	
}
button.surerz,
uni-button.surerz {
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
	box-shadow: 0 0 20rpx 5rpx rgba(45, 255, 80, 0.2);
	border-radius: 100rpx;
	margin: 0 auto;
}
</style>
