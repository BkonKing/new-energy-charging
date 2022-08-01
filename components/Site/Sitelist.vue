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
				<site-card :data="item" :storeType="2"></site-card>
			</view>
		</hr-pull-load>
	</view>
</template>

<script>
import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue'; //加载
import SiteCard from '@/modules/SiteCard.vue';
export default {
  options: { styleIsolation: 'shared' },
  components: {
  	hrPullLoad,
    SiteCard
  },
	data() {
		return {
			exampleInfo: [],
			bottomTips: '',
			currentPage: 1
		};
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

	::v-deep .site-card {
	  .site-content {
	    padding-left: 20rpx;
	  }
	  .fcname {
	    width: 80%;
	    padding: 34rpx 20rpx 24rpx 0;
	  }
	  .fcsta {
	    border-radius: 0 0 14rpx 14rpx;
	    padding: 10rpx 20rpx;
	  }
	}
}
</style>
