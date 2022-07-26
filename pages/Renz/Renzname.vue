<template>
	<view class="container">
		<view class="rztitle">请仔细核对并填写正确的信息</view>
		<view class="rzul">
			<view class="rzli">
				<text>姓名</text>
				<input placeholder="请填写您的姓名"/>
			</view>
			<view class="rzli">
				<text>身份证号</text>
				<input placeholder="请填写您的身份证号码"/>
			</view>
		</view>
		<button class="surerz">确认无误</button>
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
	color: #333;
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
	
	input,
	uni-input {
		width: 70%;
		text-align: right;
		font-size: 30rpx;
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
	box-shadow: 0 0 20rpx 10rpx rgba(45, 255, 80, 0.2);
	border-radius: 100rpx;
	margin: 0 auto;
}
</style>
