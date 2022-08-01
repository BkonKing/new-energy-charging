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
			<!-- 暂无记录 显示 -->
			<view class="nodata" v-show="isshow">- 暂无数据 -</view>
			<!-- 去充电时显示确认弹框 -->
			<z-modal
				:show="modalShow"
				:btnGroup="btnGroup"
				:contentType="1"
				:contentText="contentText"
				:titleText="titleText"
				@cancle="cancle"
				@sure="sure"
			></z-modal>
			
			<!-- 插入自己的数据-->
			<view class="ter_ul" v-for="(item, index) in exampleInfo" :key="index">
				<view class="ter_go" @click="noteshow()">去充电</view>
				<view class="ter_cmd">
					<cCircle :size="70" :percent="percent" :animation="true" :animationSpeed="5" :circleColor="circleColor">
						<span slot="content" class="cmdtx">
							<text>空闲</text>
							<!-- <text>已插枪</text> -->
							<!-- <text>故障</text> -->
							<!-- <block>
								<text>{{ percent }}%</text>
								<text>充电中</text>
							</block> -->
						</span>
					</cCircle>
					<view class="needt">还需00:30</view>
					<!--  -->
				</view>
				<view class="ter_in">
					<view>
						<text>桩编号</text>
						<text>1234564897</text>
						<image src="../../static/image/ico_10.png" mode="widthFix"></image>
					</view>
					<view>
						<text>电流</text>
						<text>最大32A</text>
					</view>
					<view>
						<text>电压</text>
						<text>187V-253V</text>
					</view>
					<view>
						<text>最高SOC</text>
						<text>98%</text>
					</view>
					<view class="ter_nr">
						<text>交流慢充</text>
						<text>| 最大功率7KW</text>
						<text>| 国标2015</text>
					</view>
				</view>
			</view>
		</hr-pull-load>
	</view>
</template>

<script>
import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue'; //加载
import cCircle from '@/components/cCircle/cCircle.vue'; //进度环
import zModal from '@/components/z-modal/z-modal.vue'; //modal弹框
export default {
	data() {
		return {
			isshow:false,
			exampleInfo: [],
			bottomTips: '',
			currentPage: 1,
			percent: 100, //进度圈
			circleColor: '#d7e3fb', //空闲时：#d7e3fb，percent=100；已插枪：#86a5e9，percent=100；充电中：#86a5e9，percent=实时；故障：#e9e9e9，percent=0；
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
			contentText: '请确保您的车和某某某站的终端（11231321）已连接，点击确认，进入支付选择页面'
		};
	},
	components: {
		hrPullLoad,
		cCircle,
		zModal
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
		//确认弹框
		noteshow() {
			this.modalShow = !this.modalShow;
		},
		cancle(e) {
			this.modalShow = false;
		},
		sure(e) {
			console.log(e)
			uni.navigateTo({
				url: '../../pages/Charge/Paychos'
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
.ter_ul {
	position: relative;
	width: 94%;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
	border-radius: 14rpx;
	font-size: 26rpx;
	padding: 30rpx 30rpx 30rpx;
	margin: 30rpx auto 0;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	line-height: 2;
	.ter_go {
		background: #5b84ed;
		color: #fff;
		font-size: 24rpx;
		padding: 0rpx 16rpx;
		border-radius: 100rpx;
		position: absolute;
		right: 30rpx;
		bottom: 120rpx;
		z-index: 8;
	}
}
.ter_cmd {
	width: 160rpx;
	display: flex;
	align-items: center;
	flex-direction: column;
	position: relative;
	overflow: hidden;

	.cmdtx {
		position: absolute;
		width: 140rpx;
		margin-top: -15rpx;
		// height: 160rpx;
		left: -10rpx;
		// top: 0;
		z-index: 2;
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 26rpx;
		color: #555;
		line-height: 1.4;
	}
	.needt {
		line-height: 1;
		margin-left: -10rpx;
		color: #777;
	}
}

.ter_in {
	width: calc(100% - 160rpx);
	padding-left: 20rpx;
	view {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: #555;
		font-weight: 500;

		text:nth-child(1) {
			width: 30%;
			color: #888;
			font-weight: normal;
		}
		image {
			width: 30rpx;
			height: 30rpx;
			margin-left: 16rpx;
		}
	}
	.ter_nr {
		color: #888;
		font-weight: normal;
		text {
			margin-right: 10rpx;
		}
		text:first-child {
			width: auto;
			color: #5b84ed;
			font-weight: 500;
		}
	}
}
// 暂无数据
.nodata {
	display: block;
	font-size: 28rpx;
	color: #999;
	line-height: 200rpx;
	text-align: center;
}
</style>
