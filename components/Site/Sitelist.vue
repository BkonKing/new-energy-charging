<template>
	<view class="example">
		<hr-pull-load
			@refresh="refresh"
			@loadMore="loadMore"
			:height="-1"
			:pullHeight="50"
			:maxHeight="100"
			:lowerThreshold="20"
			:bottomTips="bottomTips"
			:isAllowPull="true"
			:isTab="true"
			ref="hrPullLoad"
		>
			<!-- 插入自己的数据-->
			<view class="dep_ul" v-for="(item, index) in exampleInfo" :key="index">
				<view @click="sitedetail">
					<view class="fav_ico">收藏</view>
					<view class="fcname">
						<image src="../../static/image/logo2.png" mode="heightFix"></image>
						<view class="ellipsis">福州市规划设计研究院充电桩福州市规划设计研究院充电桩</view>
					</view>
					<view class="fctips fpd20">
						<!-- <text class="xying">歇业中</text> -->
						<text>00:00-24:00</text>
						<text>对外开放</text>
						<text>互联互通</text>
					</view>
					<view class="fcprice fpd20">
						￥
						<text>1.0246</text>
					</view>
					<view class="fpd20"><view class="fcpark ellipsis">停车收费：半小时内免费，4小时内5元，超过4小时后，每小时加0.1元</view></view>
				</view>
				<view class="fcsta">
					<view>
						<text>快</text>
						<text class="colx">闲2</text>
						<text class="gray">/4</text>
						<text class="pl-30">慢</text>
						<text class="colm">闲2</text>
						<text class="gray">/4</text>
					</view>
					<view class="dwei">910m</view>
				</view>
			</view>
		</hr-pull-load>
	</view>
</template>

<script>
import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue'; //加载
export default {
	data() {
		return {
			exampleInfo: [],
			bottomTips: '',
			currentPage: 1
		};
	},
	components: {
		hrPullLoad
	},
	created() {
		this.getExampleData(1);
	},
	methods: {
		getExampleData(type) {
			/* type 1代表下拉刷新 2代表加载更多 */
			setTimeout(() => {
				/* 接口获取到的数据 */
				let data = [1, 2, 3, 4, 5];
				/* 拿到数据后的处理 */
				if (data.length > 0) {
					if (type == 1) {
						this.exampleInfo = data;
					} else if (type == 2) {
						this.exampleInfo = this.exampleInfo.concat(data);
					}
					/* 这里的5是每次调用后台接口返回的最大数据条数，可以自定义 */
					if (this.exampleInfo.length < 5) {
						this.bottomTips = 'nomore';
					} else {
						this.bottomTips = 'more';
					}
				} else {
					if (type == 1) {
						this.exampleInfo = [];
					} else if (type == 2) {
						this.currentPage--;
					}
					this.bottomTips = 'nomore';
				}
				/* 这里300毫秒的延时，主要是为了优化视觉效果 */
				setTimeout(() => {
					this.$refs.hrPullLoad.reSet();
				}, 300);
			}, 500);
		},
		//自定义上拉加载更多
		loadMore() {
			this.currentPage++;
			this.bottomTips = 'loading';
			this.getExampleData(2);
		},
		//自定义下拉刷新
		refresh() {
			this.currentPage = 1;
			this.getExampleData(1);
		},
		// 前往电站详情
		sitedetail() {
			uni.navigateTo({
				url: '../../pages/Site/Sitedetail'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.example {
	width: 100%;
	height: 100%;
}
.dep_ul {
	position: relative;
	width: 94%;
	background: #fff;
	box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
	border-radius: 14rpx;
	font-size: 22rpx;
	color: #999;
	margin: 30rpx auto 0;

	.fcname {
		width: 90%;
		padding: 34rpx 20rpx 24rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-size: 32rpx;
		color: #333;
		font-weight: 500;
		image {
			width: auto;
			height: 40rpx;
			margin-right: 10rpx;
		}
		view {
			width: calc(100% - 80rpx);
			height: 40rpx;
			line-height: 40rpx;
		}
	}
	.fctips {
		margin-bottom: 10rpx;
		font-size: 22rpx;
		color: #999;
		text {
			display: inline-block;
			padding: 6rpx 10rpx;
			margin-right: 20rpx;
			background: #f1f1f1;
			border-radius: 6rpx;
			margin-bottom: 10rpx;
		}
		.xying {
			background: #999;
			color: #fff;
		}
	}
	.fcprice {
		font-size: 30rpx;
		font-weight: 500;
		color: #333;
		text {
			font-size: 50rpx;
			font-weight: bold;
		}
	}
	.fpd20 {
		padding: 0 20rpx;
	}
	.fcpark {
		width: 100%;
		background: url(../../static/image/ico_03.png) left center no-repeat;
		background-size: 30rpx 30rpx;
		padding-left: 36rpx;
		font-size: 22rpx;
		color: #999;
		margin: 10rpx 0rpx 20rpx;
		height: 40rpx;
		line-height: 40rpx;
	}
	.fcsta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-size: 24rpx;
		color: #333;
		font-weight: 500;
		background: #f9f9f9;
		border-radius: 0 0 14rpx 14rpx;
		padding: 10rpx 20rpx;
		.colx {
			color: #f37c2c;
			padding-left: 20rpx;
			letter-spacing: 2px;
		}
		.colm {
			color: #5581ff;
			padding-left: 20rpx;
			letter-spacing: 2px;
		}
		.gray {
			color: #999;
			font-weight: normal;
		}
		.dwei {
			background: url(../../static/image/ico_04.png) right center no-repeat;
			background-size: 25rpx 25rpx;
			padding-right: 30rpx;
		}
	}
	.fav_ico {
		font-size: 22rpx;
		color: #fff;
		padding: 6rpx 14rpx;
		background-image: linear-gradient(to right bottom, #ff696a, #fa4655, #f42542);
		border-radius: 0 14rpx 0 14rpx;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 2;
	}
}
</style>
