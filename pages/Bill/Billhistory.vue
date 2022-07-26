<template>
	<view class="container">
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
			<!-- 暂无记录 显示 -->
			<view class="nolist" style="display: none;">-暂无订单记录-</view>
			<!-- 插入自己的数据-->
			<view class="dep_ul" v-for="(item, index) in bhistory" :key="index" @click="billdetail">
				<view class="dep_title">
					<text>2022-04-06 12:23:33</text>
					<text>已开票</text>
				</view>
				<view class="dep_nr">
					<text>电子发票</text>
					<text>￥300.00</text>
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
			bhistory: [],
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
						this.bhistory = data;
					} else if (type == 2) {
						this.bhistory = this.bhistory.concat(data);
					}
					/* 这里的5是每次调用后台接口返回的最大数据条数，可以自定义 */
					if (this.bhistory.length < 5) {
						this.bottomTips = 'nomore';
					} else {
						this.bottomTips = 'more';
					}
				} else {
					if (type == 1) {
						this.bhistory = [];
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
		// 下一步，前往发票详情
		billdetail: function() {
			uni.navigateTo({
				url: './Billdetail'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.dep_ul {
	width: 94%;
	background: #fff;
	box-shadow: 0rpx 0rpx 15rpx rgba(60, 122, 255, 0.1);
	border-radius: 14rpx;
	padding: 0rpx 24rpx 0rpx;
	margin: 30rpx auto 0;
	line-height: 1;
}
.dep_title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 35rpx 24rpx 0;
	font-size: 28rpx;
	color: #999;
	border-bottom: 1px solid #eaeaea;
	background: url(../../static/image/arrow_01.png) right center no-repeat;
	background-size: 30rpx 30rpx;

	text:last-child {
		color: 28rpx;
	}
}
.dep_nr {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30rpx 0;
	font-size: 30rpx;
	color: #555;
	line-height: 1.5;

	text:first-child {
		width: 70%;
	}
	text:last-child {
		font-weight: 500;
		font-size: 30rpx;
	}
}
// 暂无记录
.nolist {
	width: 100%;
	font-size: 30rpx;
	color: #999;
	line-height: 160rpx;
	text-align: center;
}
</style>
