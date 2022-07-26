<template>
	<view class="container">
		<view class="cntxt">请正确填写车牌号</view>
		<view class="number-wrap"><car-number v-model="carNumber"></car-number></view>
		<view class="wfoot"><button class="combutton">确定</button></view>
	</view>
</template>

<script>
import CarNumber from '@/components/codecook-carnumber/codecook-carnumber.vue';//车辆键盘
export default {
	components: { CarNumber },
	data() {
		return { carNumber: '闽' };
	},
	onLoad() {},
	watch: {
		carNumber(num) {
			console.log(num);
		}
	},
	methods: {},
	beforeMount() {}
};
</script>

<style lang="scss" scoped>
.container {
	background: #fff;
	position: relative;
	padding-top: 50rpx;
}
.cntxt {
	position: absolute;
	left: 3%;
	top: 50rpx;
	z-index: 1;
	font-size: 28rpx;
	color: #999;
	line-height: 1.6;
	text-align: center;
}
.number-wrap {
	width: 94%;
	margin: 0 auto;
}
// 底部按钮
.wfoot {
	width: 100%;
	padding: 100rpx 3%;
	.wfnote {
		font-size: 26rpx;
		color: #888;
		line-height: 40rpx;
		margin-top: 20rpx;
		text-align: center;
	}
}
</style>
