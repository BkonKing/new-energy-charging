<template>
	<view class="container">
		<!-- 电站主体 -->
		<view class="siteul">
			<view class="siteA">
				<view class="fsbiao">
					<image src="../../static/image/logo2.png" mode="heightFix"></image>
					<text>逸充新能源</text>
				</view>
				<view class="favBtn" @click="favClick"><image src="../../static/image/ico_08a.png" mode="widthFix" v-show="favshow"></image></view>
				<view class="fcname ellipsis">福州市规划设计研究院充电桩福州市规划设计研究院充电桩</view>
				<view class="fctips fpd20">
					<!-- <text class="xying">歇业中</text> -->
					<text>对外开放</text>
					<text>互联互通</text>
				</view>
				<view class="fpd20"><view class="fctime">营业时间：00:00-24:00</view></view>
				<view class="fpd20"><view class="fclw">最大功率120KW</view></view>
				<view class="fcsta">
					<view class="dadr">福建省福州市台江区设计费两款手机傅雷家书冷冻机房蓝思科技大富科技</view>
					<view class="dwei">910m</view>
				</view>
			</view>
			<!-- 终端入口 -->
			<view class="siteB" @click="terminal">
				<view>
					<text class="Bico">快</text>
					<text>空闲2 | 共50</text>
				</view>
				<view>
					<text class="Bico">慢</text>
					<text>空闲2 | 共21</text>
				</view>
			</view>
			<!-- 价格信息 -->
			<view class="siteC">
				<view class="Ctitle disflex2">
					<text>价格信息</text>
					<text class="clookv" @click="$refs.pop.show()">电价详情 >></text>
				</view>
				<view class="Cul cnow">
					<view class="Cli-a">
						<text class="clitime">19:00-21:00</text>
						<text>当前时段</text>
					</view>
					<view class="Cli-b">
						<view>
							￥
							<text class="clinum">0.9422</text>
						</view>
						<text class="clinote">电价0.5922元/度 | 服务费0.3500元/度</text>
					</view>
				</view>
				<view class="Cul">
					<view class="Cli-a">
						<text class="clitime">19:00-21:00</text>
						<text>下一时段</text>
					</view>
					<view class="Cli-b">
						<view>
							￥
							<text class="clinum">0.9422</text>
						</view>
						<text class="clinote">电价0.5922元/度 | 服务费0.3500元/度</text>
					</view>
				</view>
			</view>
			<!-- 电价详情 弹框 -->
			<pop ref="pop" direction="below" :is_close="true" :is_mask="true" :width="100" height="fit-content" :maskFun="true" @watchOpen="watchOpen" @watchClose="watchClose">
				<view class="tcwarp">
					<view class="tctitle">电价详情</view>
					<scroll-view scroll-y="true" class="Dview">
						<view class="Cul" v-for="t in 8">
							<view class="Cli-a"><text class="clitime">19:00-21:00</text></view>
							<view class="Cli-b">
								<view>
									￥
									<text class="clinum">0.9422</text>
								</view>
								<text class="clinote">电价0.5922元/度 | 服务费0.3500元/度</text>
							</view>
						</view>
						<view class="Cul cnow">
							<view class="Cli-a">
								<text class="clitime">19:00-21:00</text>
								<text>当前时段</text>
							</view>
							<view class="Cli-b">
								<view>
									￥
									<text class="clinum">0.9422</text>
								</view>
								<text class="clinote">电价0.5922元/度 | 服务费0.3500元/度</text>
							</view>
						</view>
						<view class="Cul">
							<view class="Cli-a">
								<text class="clitime">19:00-21:00</text>
								<text>下一时段</text>
							</view>
							<view class="Cli-b">
								<view>
									￥
									<text class="clinum">0.9422</text>
								</view>
								<text class="clinote">电价0.5922元/度 | 服务费0.3500元/度</text>
							</view>
						</view>
					</scroll-view>
				</view>
			</pop>
			<!-- 停车服务 -->
			<view class="siteD">
				<view class="Dtitle">停车服务</view>
				<view class="Dul">
					<text class="Dli-a">停车费用</text>
					<text class="Dli-b">半小时内免费，4小时内5元，超过4小时后，每小时加0.1元</text>
				</view>
			</view>
			<!-- 营业信息 -->
			<view class="siteD">
				<view class="Dtitle">营业信息</view>
				<view class="Eul">
					<text class="Dli-a">开放时间</text>
					<text class="Dli-b">00:00-24:00</text>
				</view>
				<view class="Eul">
					<text class="Dli-a">服务提供</text>
					<text class="Dli-b">逸充新能源</text>
				</view>
				<view class="Eul">
					<text class="Dli-a">发票服务</text>
					<text class="Dli-b">逸充新能源</text>
				</view>
				<view class="Eul">
					<text class="Dli-a">客服电话</text>
					<text class="Dli-b"><text class="callser">4000000000</text></text>
				</view>
			</view>
			<view class="clearh"></view>
		</view>
		<!-- 轮播 -->
		<view class="shopimg"><FatFatMeng-Swiper :swiperStyleClass="[{ height: '350rpx' }]" :SwiperImglist="list"></FatFatMeng-Swiper></view>
		<!-- 底部按钮 -->
		<view class="sitefoot">
			<view class="sfico" @click="fixsent">
				<image src="../../static/image/ico_09.png" mode="widthFix"></image>
				<text>故障报修</text>
			</view>
			<view class="sfico" @click="inputcode">
				<image src="../../static/image/ico_01.png" mode="widthFix"></image>
				<text>编码充电</text>
			</view>
			<button class="sfbt">扫码充电</button>
		</view>
	</view>
</template>

<script>
import pop from '@/components/ming-pop/ming-pop.vue'; //弹框
export default {
	components: { pop },
	data() {
		return {
			favshow: false, //收藏与否
			// 轮播图
			list: [
				{
					image: '../../static/img/01.jpg'
				},
				{
					image: '../../static/img/02.jpg'
				},
				{
					image: '../../static/img/03.jpg'
				}
			]
		};
	},
	onLoad() {},
	methods: {
		// 收藏
		favClick(index) {
			this.favshow = !this.favshow;
		},
		// 前往终端列表
		terminal() {
			uni.navigateTo({
				url: './Terminal'
			});
		},
		// 前往输入充电桩编码
		inputcode() {
			uni.navigateTo({
				url: '../Charge/Inputcode'
			});
		},
		// 前往故障报修
		fixsent(){
			uni.navigateTo({
				url:'../Mine/Fixsent'
			})
		},
		// 电价详情-弹框
		watchOpen() {},
		watchClose() {}
	}
};
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	z-index: 0;
	width: 100%;
}
.shopimg {
	width: 100%;
	height: 350rpx;
	overflow: hidden;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
	image {
		width: 100%;
		height: auto;
	}
}
// 电站主体
.siteul {
	width: 100%;
	padding: 160px 0 0;
}
.siteA {
	position: relative;
	width: 94%;
	margin: 0 auto 30rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
	border-radius: 14rpx;
	font-size: 22rpx;
	color: #999;

	.fsbiao {
		width: 100%;
		padding: 20rpx 20rpx 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-size: 24rpx;
		color: #333;
		image {
			width: auto;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}

	.favBtn {
		position: absolute;
		right: 30rpx;
		top: 48%;
		z-index: 2;
		width: 54rpx;
		height: 54rpx;
		background: url(../../static/image/ico_08.png) no-repeat;
		background-size: 54rpx 54rpx;
		image {
			width: 54rpx;
			height: 54rpx;
		}
	}

	.fcname {
		width: 100%;
		padding: 20rpx 20rpx 20rpx;
		font-size: 34rpx;
		color: #333;
		font-weight: 500;
		line-height: 40rpx;
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
	.fpd20 {
		padding: 0 20rpx;
	}
	.fctime {
		width: 100%;
		background: url(../../static/image/ico_05.png) left center no-repeat;
		background-size: 30rpx 30rpx;
		padding-left: 36rpx;
		font-size: 22rpx;
		color: #999;
		margin: 10rpx 0rpx 10rpx;
		height: 40rpx;
		line-height: 40rpx;
	}
	.fclw {
		width: 100%;
		background: url(../../static/image/ico_06.png) left center no-repeat;
		background-size: 30rpx 30rpx;
		padding-left: 36rpx;
		font-size: 22rpx;
		color: #999;
		margin: 10rpx 0rpx 15rpx;
		height: 40rpx;
		line-height: 40rpx;
	}
	.fcsta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-size: 24rpx;
		font-weight: 500;
		color: #333;
		background: #f9f9f9;
		border-radius: 0 0 14rpx 14rpx;
		padding: 20rpx 20rpx;

		.dadr {
			background: url(../../static/image/ico_07.png) left 3rpx no-repeat;
			background-size: 30rpx 30rpx;
			padding: 0 0 0 40rpx;
			line-height: 1.4;
			width: 70%;
		}
		.dwei {
			background: url(../../static/image/ico_04.png) right center no-repeat;
			background-size: 25rpx 25rpx;
			padding-right: 30rpx;
		}
	}
}
// 终端入口
.siteB {
	width: 94%;
	margin: 0 auto 30rpx;
	background: #fff url(../../static/image/arrow_02.png) right 20rpx center no-repeat;
	background-size: 40rpx 40rpx;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
	border-radius: 14rpx;
	font-size: 28rpx;
	color: #fff;
	padding: 20rpx;
	display: flex;
	align-items: center;
	justify-content: flex-start;

	view {
		width: 43%;
		margin-right: 5%;
		background: #f18b70;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 50rpx;
		letter-spacing: 1px;
		padding: 15rpx 0;
		border-radius: 100rpx;

		.Bico {
			width: 50rpx;
			height: 50rpx;
			font-weight: 500;
			vertical-align: middle;
			text-align: center;
			background: #fff;
			border-radius: 50%;
			color: #f18b70;
			margin-right: 20rpx;
		}
	}
	view:nth-child(2) {
		background-color: #86a5e9;
		.Bico {
			color: #86a5e9 !important;
		}
	}
}
// 价格信息
.siteC {
	width: 94%;
	background: #fff;
	margin: 0 auto 30rpx;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
	border-radius: 14rpx;
	font-size: 22rpx;
	color: #333;
	padding: 0 20rpx 20rpx;

	.Ctitle {
		line-height: 80rpx;
		font-size: #333;
		font-size: 30rpx;
		font-weight: 500;
		border-bottom: 1px solid #dedede;
		.clookv {
			font-size: 24rpx;
			color: #999;
			font-weight: normal;
		}
	}
}
// 电价详情 弹框
.tcwarp {
	background: #fff;
	padding-bottom: 30rpx;
	.tctitle {
		width: 100%;
		background: #eee;
		font-size: 34rpx;
		font-weight: 500;
		color: #333;
		line-height: 100rpx;
		text-align: center;
	}
	.Dview {
		width: 100%;
		max-height: 60vh;
		// overflow-y: scroll;
		margin: 0 auto;
		padding: 0rpx 4% 0rpx;
		font-size: 22rpx;
		color: #333;
	}
}
// 电价细节样式
.Cul {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 30rpx 0 0;
}
.Cli-a {
	width: 28%;
	text-align: center;
	display: flex;
	flex-direction: column;
	.clitime {
		background: #eaeaea;
		padding: 8rpx 20rpx;
		border-radius: 100rpx;
		margin-bottom: 10rpx;
	}
}
.Cli-b {
	padding-left: 40rpx;
	display: flex;
	// align-items: center;
	flex-direction: column;
	font-size: 30rpx;
	font-weight: 500;
	color: #555;
	.clinum {
		font-size: 40rpx;
		font-weight: bold;
	}
	.clinote {
		margin-top: 5rpx;
		font-size: 22rpx;
		color: #888;
		font-weight: normal;
	}
}
.Cul.cnow .clitime {
	background: #ff7134;
	color: #fff;
}
.Cul.cnow .Cli-b {
	color: #ff7134;
}

// 停车服务
.siteD {
	width: 94%;
	background: #fff;
	margin: 0 auto 30rpx;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
	border-radius: 14rpx;
	font-size: 22rpx;
	color: #333;
	padding: 0 20rpx 20rpx;

	.Dtitle {
		line-height: 80rpx;
		font-size: #333;
		font-size: 30rpx;
		font-weight: 500;
		border-bottom: 1px solid #dedede;
	}
	.Dul {
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		padding: 30rpx 0 0;
	}
	.Eul {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 30rpx 0 0;
	}
	.Dli-a {
		width: 28%;
		text-align: center;
		display: flex;
		flex-direction: column;
		background: #eaeaea;
		padding: 8rpx 20rpx;
		border-radius: 100rpx;
	}
	.Dli-b {
		padding-left: 40rpx;
		font-size: 24rpx;
		line-height: 1.4;
		color: #555;
	}
}
.callser {
	color: #6a99ff;
	font-weight: 500;
}
// 底部按钮
.sitefoot {
	width: 100%;
	background: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 5;
	box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.05);
	padding: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 26rpx;
	color: #333;

	.sfico {
		width: 20%;
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-right: 2%;
		image {
			width: 50rpx;
			height: 50rpx;
		}
	}
	button.sfbt,
	uni-button.sfbt {
		width: 56%;
		line-height: 80rpx;
		font-size: 34rpx;
		background: #33b048;
		color: #fff;
		font-weight: 500;
		border: 1px solid #33b048;
		border-radius: 100rpx;
	}
}
</style>
