<template>
	<view class="container carstyle">
		<view class="carsch">
			<input placeholder="输入您想要的车型" confirm-type="search" />
			<text @click="carother">其他车型</text>
		</view>
		<view class="cark disflex4" v-for="t in 5" @click="carchos">
			<view class="w-35"><image src="../../static/image/car2.png" mode="widthFix"></image></view>
			<view>
				<view class="carbig">奥迪A8新能源（进口）</view>
				<view>油电混合 | 纯电续航 --km</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isshow: true
		};
	},
	onLoad() {},
	methods: {
		// 其他车型
		carother(){
			uni.navigateTo({
				url:'./Carother'
			})
		},
		
		// 车型下探选择
		carchos() {
			uni.navigateTo({
				url: './Carchos'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.carsch {
	padding: 20rpx 3% 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 28rpx;
	color: #555;
	background: #fff;
	margin-bottom: 30rpx;
	input,
	uni-input {
		width: 80%;
		color: #888;
		background: #eee;
		border-radius: 100rpx;
		padding: 0rpx 30rpx;
		line-height: 80rpx;
		height: 80rpx;
	}
}
.cark {
	width: 100%;
	margin: 0 auto;
	padding: 30rpx 3%;
	background: #fff;
	border-bottom: 1px solid #eee;
	font-size: 28rpx;
	color: #999;
	line-height: 1.6;
	.carbig {
		font-size: 34rpx;
		color: #333;
		font-weight: 500;
	}
	.w-35 {
		width: 32%;
		margin-right: 3%;
	}
	image {
		width: 100%;
		height: auto;
	}
}
</style>
