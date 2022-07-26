<template>
	<view class="dylist">
		<view class="leader">
			<view class="ltitle">
				<view @tap="changeShowType(1)" :class="showType == 1 ? 'activeContentA' : ''"><view>快充（空闲6 | 共24）</view></view>
				<view @tap="changeShowType(2)" :class="showType == 2 ? 'activeContentB' : ''"><view>慢充（空闲3 | 共10）</view></view>
			</view>
		</view>
		<!-- 多个tab切换的时候，注意插件的isTab属性， 它可以用来防止两个tab之间用手滑动时造成的误操作-->
		<swiper :current="showType - 1" @change="onChange">
			<swiper-item><TerminalK ref="TerminalK"></TerminalK></swiper-item>
			<swiper-item><TerminalM ref="TerminalM"></TerminalM></swiper-item>
		</swiper>
	</view>
</template>

<script>
import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue'; //加载
import TerminalK from '../../components/Site/TerminalK.vue'; //快充
import TerminalM from '../../components/Site/TerminalM.vue'; //慢充
export default {
	components: {
		hrPullLoad,
		TerminalK,
		TerminalM
	},
	data() {
		return {
			showType: 1
		};
	},
	onLoad() {},
	methods: {
		/* 切换显示内容 */
		changeShowType(type) {
			this.showType = type;
		},
		/* 手动滑动swiper触发的事件 */
		onChange(e) {
			this.showType = e.detail.current + 1;
		}
	}
};
</script>

<style lang="scss" scoped>
.dylist {
	width: 100%;
	.leader {
		width: 100%;
		height: 91rpx;
		border-top: 1px solid #eee;
		.ltitle {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			> view {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text-align: center;
				line-height: 85rpx;
				background: #fff;
				border-bottom: 6rpx solid #fff;
				color: #888;
				font-size: 28rpx;
			}
			.activeContentA {
				font-size: 30rpx;
				font-weight: 500;
				background: #fff;
				border-bottom: 6rpx solid #f18b70;
				color: #f18b70;
			}
			.activeContentB {
				font-size: 30rpx;
				font-weight: 500;
				background: #fff;
				border-bottom: 6rpx solid #86a5e9;
				color: #86a5e9;
			}
		}
	}
	swiper {
		width: 100%;
		/* #ifdef H5 */
		height: calc(100vh - 100rpx - 44px);
		/* #endif */

		/* #ifdef APP-PLUS */
		height: calc(100vh - 100rpx);
		/* #endif */

		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 100rpx);
		/* #endif */
		// background: #000;
	}
	swiper-item {
		width: 100%;
		height: 100%;
	}

}
</style>
