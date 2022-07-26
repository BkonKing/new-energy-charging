<template>
	<view class="container">
		<view class="empty" v-if="isshow">
			<text>您还未绑定车辆</text>
			<text>请点击下方按钮进行操作吧~</text>
		</view>
		<view class="carlist" v-else v-for="t in 3">
			<view class="caryrz">已认证</view>
			<view class="disflex3"><image class="carimg" src="../../static/image/car2.png" mode="widthFix"></image></view>
			<view>北京EU5</view>
			<view class="carsm">闽AD59155</view>
			<image class="cardel" src="../../static/image/ico_11.png" mode="widthFix" @click="cardel()"></image>
		</view>
		<view class="clearw"></view>
		<view class="wfoot"><button class="combutton" @click="carbind">添加爱车</button></view>
		<!-- 确认解绑弹框 -->
		<z-modal :show="modalShow" :btnGroup="btnGroup" :contentType="1" :contentText="contentText" :titleText="titleText" @cancle="cancle" @sure="sure"></z-modal>
	</view>
</template>

<script>
import zModal from '@/components/z-modal/z-modal.vue'; //modal弹框
export default {
	components: {
		zModal
	},
	data() {
		return {
			isshow: false,
			// 确认弹框
			modalShow: false,
			btnGroup: [
				{
					text: '取消',
					color: '#999',
					bgColor: '#dadada',
					width: '45%',
					height: '80rpx',
					shape: 'fillet',
					eventName: 'cancle'
				},
				{
					text: '确认',
					color: '#FFFFFF',
					bgColor: '#33b048',
					width: '45%',
					height: '80rpx',
					shape: 'fillet',
					eventName: 'sure'
				}
			],
			titleText: '',
			contentText: '确认解绑此车辆'
		};
	},
	onLoad() {},
	methods: {
		// 绑定爱车
		carbind(){
			uni.navigateTo({
				url:'./Carbind'
			})
		},
		//确认弹框
		cardel() {
			this.modalShow = !this.modalShow;
		},
		cancle(e) {
			this.modalShow = false;
		},
		sure(e) {}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 30rpx;
}
.carlist {
	position: relative;
	width: 94%;
	margin: 0 auto 30rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
	border-radius: 14rpx;
	color: #555;
	line-height: 1.6;
	font-weight: 500;
	font-size: 32rpx;
	padding: 20rpx 30rpx;

	.carimg {
		width: 80%;
		height: auto;
		margin-bottom: 30rpx;
	}
	.carsm {
		font-size: 28rpx;
		color: #999;
	}
	.cardel {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		right: 30rpx;
		bottom: 44rpx;
		z-index: 1;
	}
	.caryrz {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		background: #ffeede;
		color: #f98416;
		font-size: 22rpx;
		padding: 8rpx 10rpx;
		border-radius: 14rpx 0 14rpx 0;
	}
}
// 暂无记录
.empty {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 450rpx 0 0;
	text-align: center;
	line-height: 1.6;
	color: #999;
	font-size: 28rpx;
	background: url('@/static/image/empty.png') center top 100rpx no-repeat;
	background-size: 340rpx auto;
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
}
.clearw {
	height: 180rpx;
	display: block;
}
</style>
