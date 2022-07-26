<template>
	<view class="container" @touchmove.stop.prevent="moveHandle">
		<view class="bcosul">
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
				<checkbox-group @change="checkboxChange">
					<label v-for="(item, index) in bcosInfo" :key="index" class="bcosli">
						<checkbox :checked="bcositem.checked" class="checkbox" style="transform:scale(0.9)" />
						<view class="bcosnr">
							<view class="disflex mbt">
								<text>{{ bcositem.bid }}</text>
								<text class="bcrpice">￥{{ bcositem.bprice }}</text>
							</view>
							<view class="disflex">
								<text class="bcname">{{ bcositem.bname }}</text>
								<text class="bctime">{{ bcositem.btime }}</text>
							</view>
						</view>
					</label>
				</checkbox-group>
			</hr-pull-load>
		</view>
		<!-- 底部 -->
		<view class="bcofoot">
			<view>
				<view class="bcoftnr">
					<text>3</text>
					个订单，共
					<text>123.69</text>
					元
				</view>
				<checkbox-group>
					<label>
						<checkbox class="checkbox" style="transform:scale(0.8)" />
						本页全选
					</label>
				</checkbox-group>
			</view>
			<button @click="billopen">下一步</button>
		</view>
	</view>
</template>

<script>
import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue'; //加载
export default {
	data() {
		return {
			bcosInfo: [],
			bcositem: { bid: 'SSQD9839918821982121281', btime: '2022-04-06 12:23:33', bname: '用电', bprice: '300', checked: false },
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
						this.bcosInfo = data;
					} else if (type == 2) {
						this.bcosInfo = this.bcosInfo.concat(data);
					}
					/* 这里的5是每次调用后台接口返回的最大数据条数，可以自定义 */
					if (this.bcosInfo.length < 5) {
						this.bottomTips = 'nomore';
					} else {
						this.bottomTips = 'more';
					}
				} else {
					if (type == 1) {
						this.bcosInfo = [];
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

		// 复选框
		checkboxChange: function(e) {
			console.log(this.bcositem);
		},
		// 禁止外壳页面手指上下滑动
		moveHandle: function() {
			return false;
		},
		// 下一步，前往开具发票
		billopen: function() {
			uni.navigateTo({
				url: './Billopen'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	// padding-top: 30rpx;
}
// 列表
.bcosul {
	width: 100%;
	height: calc(100% - 160rpx);
	background: #fff;
	border-top: 1px solid #eaeaea;
}
.bcosli {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	box-sizing: border-box;
	padding: 24rpx 3%;
	border-bottom: 1px solid #eaeaea;
	font-size: 28rpx;
	color: #555;
}
uni-checkbox .uni-checkbox-input,
.checkbox {
	margin-right: 5px;
}

.bcosnr {
	width: calc(100% - 30px);
}
.bcrpice {
	color: #fe5f5e;
	font-size: 34rpx;
	font-weight: 500;
}
.bcname {
	font-size: 30rpx;
	font-weight: 500;
	color: #555;
}
.bctime {
	font-size: 24rpx;
	color: #aaa;
}
.mbt {
	margin-bottom: 5rpx;
}
// 底部按钮
.bcofoot {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 10;
	width: 100%;
	padding: 20rpx 3%;
	background: #fff;
	height: 130rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 30rpx;
	color: #555;

	.bcoftnr {
		font-size: 24rpx;
		color: #555;
		margin-bottom: 20rpx;
		text {
			font-weight: bold;
			color: #fe5f5e;
			font-size: 26rpx;
			padding: 0 5rpx;
		}
	}

	button,
	uni-button {
		line-height: 90rpx;
		font-size: 34rpx;
		width: 45%;
		background: #33b048;
		color: #fff;
		font-weight: 500;
		border: 1px solid #33b048;
		border-radius: 100rpx;
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
