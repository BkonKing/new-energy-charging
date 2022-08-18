<template>
	<view class="container">
		<view class="cark disflex4" v-for="t in 10" @click="carchos">
			<view class="w-35"><image src="../../static/image/car3.png" mode="widthFix"></image></view>
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
		return {};
	},
	onLoad() {},
	methods: {
		// 车型下探选择
		carchos(){
			uni.navigateTo({
				url:'./Carchos'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.container {
	background: #fff;
}
.cark {
	width: 94%;
	margin: 0 auto;
	padding: 30rpx 0;
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
