<template>
	<view class="container carstyle">
		<view class="carsch">
			<view class="CarSch" @click="CarSch()">输入您想要的车型</view> 
			<text @click="carother">其他车型</text>
		</view>
		<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
	</view>
</template>

<script>
import carlist from '@/common/carlist.js'; //车库
export default {
	data() {
		return {
			isshow:true,
			list: carlist.list
		};
	},
	onLoad() {},
	methods: {
		// 前往搜索车型
		CarSch(){
			uni.navigateTo({
				url:'./CarstyleSch'
			})
		},
		// 其他车型
		carother(){
			uni.navigateTo({
				url:'./Carother'
			})
		},
		// 前往该系列
		bindClick(e) {
			console.log('点击item，返回数据' + JSON.stringify(e));
			uni.navigateTo({
				url:'./Carkind'
			})
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
	.CarSch {
		width: 80%;
		color: #888;
		background: #eee;
		border-radius: 100rpx;
		padding: 0rpx 30rpx;
		line-height: 80rpx;
		height: 80rpx;
	}
}
</style>
