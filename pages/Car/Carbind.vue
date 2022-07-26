<template>
	<view class="container">
		<view class="cbindli">
			<view class="cltitle">车辆信息</view>
			<view class="binitem" @click="carnum">
				<text>
					<text class="red">*</text>
					车牌号：
				</text>
				<text class="gray">请填写</text>
			</view>
			<view class="binitem" @click="carstyle">
				<text>
					<text class="red">*</text>
					车型：
				</text>
				<text class="gray">请选择</text>
			</view>
		</view>
		<view class="clearw"></view>
		<view class="wfoot"><button class="combutton">提交</button>
		 <view class="wfnote">提交代表同意<text class="green">《隐私政策》</text><br/> 您提交的信息我们将根据隐私政策内容严格保密</view>
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
		// 前往填写车牌号
		carnum(){
			uni.navigateTo({
				url:'./Carnum'
			})
		},
		// 前往选择车型
		carstyle(){
			uni.navigateTo({
				url:'./Carstyle'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 30rpx;
}
.cbindli {
	width: 94%;
	margin: 0 auto 30rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
	border-radius: 14rpx;
	color: #555;
	line-height: 1.6;
	font-size: 30rpx;
	padding: 0rpx 30rpx 30rpx;
	.cltitle {
		font-size: 32rpx;
		font-weight: 550;
		color: #333;
		padding: 30rpx 0 10rpx;
	}
	.binitem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: url('@/static/image/arrow_01.png') right center no-repeat;
		background-size: 30rpx 30rpx;
		padding: 26rpx 30rpx 26rpx 0;
		border-bottom: 1px solid #eee;
		font-size: 30rpx;
		font-weight: 500;
		color: #555;
		.red {
			color: red;
			margin-right: 4rpx;
			font-size: 40rpx;
		}
		.gray {
			color: #999;
			font-size: 28rpx;
			font-weight: normal;
		}
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
	
	.wfnote {
		font-size: 26rpx;
		color: #888;
		line-height: 40rpx;
		margin-top: 20rpx;
		text-align: center;
	}
}
.green{
	color: #33b048;
	margin: 0 10rpx;
}
.clearw {
	height: 260rpx;
	display: block;
}
</style>
