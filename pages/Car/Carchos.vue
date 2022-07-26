<template>
	<view class="container">
		<view>
			<view class="lix">2015</view>
			<view class="carxe">奥迪A3新能源（进口）2015款 Sportbanc e-tron 运动型</view>
			<view class="carxe">奥迪A3新能源（进口）2015款 Sportbanc e-tron 舒适型</view>
		</view>
		<view>
			<view class="lix">2016</view>
			<view class="carxe">奥迪A3新能源（进口）2017款 Sportbanc e-tron 运动型</view>
		</view>
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
page,
.container {
	background: #fff;
}
.lix {
	background: #eff0f1;
	color: #888;
	font-size: 28rpx;
	padding: 20rpx 3%;
}
.carxe {
	width: 94%;
	margin: 0 auto;
	padding: 30rpx 0;
	border-bottom: 1px solid #eee;
	font-size: 30rpx;
	color: #555;
	line-height: 1.6;
}
</style>
