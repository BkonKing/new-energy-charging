<template>
	<view class="container">
		<view class="myul">
			<!-- A -->
			<view class="myliA disflex3">
				<image src="../../static/image/logo.jpg" mode="widthFix" class="myico"></image>
				<view class="myname" @click="login" v-if="!isshow">请登录</view>
				<view class="myname" v-else>昵称昵称</view>
				<view class="yritem">
					<view class="w-40">
						<view class="yrtag">可用余额（元）</view>
						<view>
							￥
							<text class="yrnum">0.5648</text>
						</view>
					</view>
					<button class="ytx" @click="cashout">提现</button>
					<button class="ycz" @click="cashin">充值</button>
				</view>
			</view>
		</view>
		<!-- B -->
		<view class="myliB">
			<view @click="wallet">
				<image src="../../static/image/my_01.png" mode="widthFix"></image>
				<text>我的钱包</text>
			</view>
			<!-- <view @click="mycar">
				<image src="../../static/image/my_08.png" mode="widthFix"></image>
				<text>我的爱车</text>
			</view> -->
			<view @click="order">
				<image src="../../static/image/my_02.png" mode="widthFix"></image>
				<text>我的订单</text>
			</view>
			<view @click="sitefav">
				<image src="../../static/image/my_06.png" mode="widthFix"></image>
				<text>收藏电站</text>
			</view>
		</view>
		<!-- C -->
		<view class="myliB">
			<view @click="renzname">
				<image src="../../static/image/my_04.png" mode="widthFix"></image>
				<text>实名认证</text>
				<text class="ztpos">已认证</text>
			</view>
			<view @click="renzcard">
				<image src="../../static/image/my_05.png" mode="widthFix"></image>
				<text>我的银行卡</text>
			</view>
			<view @click="billitem">
				<image src="../../static/image/my_03.png" mode="widthFix"></image>
				<text>发票报销</text>
			</view>
			<view @click="fixsent">
				<image src="../../static/image/my_07.png" mode="widthFix"></image>
				<text>故障报修</text>
			</view>
		</view>
		<!-- C -->
		<view class="myliB">
			<view @click="changephone">
				<image src="../../static/image/my_10.png" mode="widthFix"></image>
				<text>更改手机号</text>
			</view>
			<view @click="aboutus">
				<image src="../../static/image/my_11.png" mode="widthFix"></image>
				<text>关于我们</text>
			</view>
			<view @click="contact">
				<image src="../../static/image/my_09.png" mode="widthFix"></image>
				<text>联系客服</text>
			</view>
		</view>
		<view class="loginout">账号登出</view>
		<view class="cleard"></view>
		<!-- 头部底图色 -->
		<view class="myimg"></view>
		<!-- 底部自定义tabBar -->
		<view class="tmenu">
			<view class="tm40">
				<view @click="index">
					<image src="../../static/image/bar_01.png" mode="widthFix"></image>
					<text>首页</text>
				</view>
				<view @click="sitelist">
					<image src="../../static/image/bar_02.png" mode="widthFix"></image>
					<text>站点</text>
				</view>
			</view>
			<view class="tmscan" @click="scango"><image src="../../static/image/scan.png" mode="widthFix"></image></view>
			<view class="tm40">
				<view @click="wait">
					<image src="../../static/image/bar_03.png" mode="widthFix"></image>
					<text>商城</text>
				</view>
				<view>
					<image src="../../static/image/bar_04a.png" mode="widthFix"></image>
					<text>我的</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isshow: false
		};
	},
	onLoad() {},
	methods: {
		// 前往首页
		index() {
			uni.navigateTo({
				url: '../Index/Index'
			});
		},
		// 前往站点
		sitelist() {
			uni.navigateTo({
				url: '../Site/Sitelist'
			});
		},
		// 前往登录
		login() {
			uni.navigateTo({
				url: '../Login/Login'
			});
		},
		// 前往我的钱包
		wallet() {
			uni.navigateTo({
				url: '../Wallet/Wallet'
			});
		},
		// 前往我的爱车
		mycar() {
			uni.navigateTo({
				url: '../Car/Carlist'
			});
		},
		// 前往我的订单
		order() {
			uni.navigateTo({
				url: '../Order/Orderlist'
			});
		},
		// 前往实名认证
		renzname() {
			uni.navigateTo({
				url: '../Renz/Renzname'
			});
		},
		// 前往银行卡
		renzcard() {
			uni.navigateTo({
				url: '../Renz/Renzcard'
			});
		},
		// 收藏电站
		sitefav() {
			uni.navigateTo({
				url: '../Site/Sitefav'
			});
		},
		// 前往提现
		cashout() {
			uni.navigateTo({
				url: '../Wallet/Cashout'
			});
		},
		// 前往充值
		cashin() {
			uni.navigateTo({
				url: '../Wallet/Cashin'
			});
		},
		// 扫码前往
		scango() {
			uni.navigateTo({
				url: '../Charge/Paychos'
			});
		},
		// 前往故障报修
		fixsent() {
			uni.navigateTo({
				url: './Fixsent'
			});
		},
		// 联系客服
		contact() {
			uni.navigateTo({
				url: './Contact'
			});
		},
		// 前往发票报销
		billitem() {
			uni.navigateTo({
				url: '../Bill/Billitem'
			});
		},
		// 前往开发中页面
		wait() {
		 uni.navigateTo({
				url: '../Other/Wait'
			});
		},
		//前往更改手机号
		changephone() {
			uni.navigateTo({
				url: './ChangePhone'
			});
		},
		// 前往关于我们
		aboutus() {
			uni.navigateTo({
				url: './Aboutus'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	z-index: 0;
	width: 100%;
}
.myimg {
	width: 100%;
	background: #33b048;
	height: 300rpx;
	overflow: hidden;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
}
// 主体
.myul {
	width: 100%;
	padding: 80px 0 0;
}
// A
.myliA {
	width: 94%;
	margin: 0 auto 30rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
	border-radius: 14rpx;
	font-size: 22rpx;
	color: #999;

	.myico {
		width: 160rpx;
		height: 160rpx;
		margin: -80rpx auto 20rpx;
		border-radius: 500rpx;
		background: #efefef;
	}
	.myname {
		font-size: 30rpx;
		color: #555;
		font-weight: 500;
		margin-bottom: 30rpx;
	}
	.yritem {
		width: 100%;
		padding: 30rpx;
		border-top: 2px dashed #f5f5f5;
		font-size: 30rpx;
		color: #333;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.yrnum {
			font-size: 44rpx;
			font-weight: bold;
		}
		.yrtag {
			font-size: 22rpx;
			color: #999;
			font-weight: normal;
			margin-bottom: 10rpx;
		}
		button.ycz,
		uni-button.ycz {
			width: 25%;
			line-height: 70rpx;
			font-size: 30rpx;
			background: #33b048;
			color: #fff;
			font-weight: 500;
			border: 1px solid #33b048;
			border-radius: 100rpx;
		}
		button.ytx,
		uni-button.ytx {
			width: 25%;
			line-height: 70rpx;
			font-size: 30rpx;
			background: #fff;
			color: #33b048;
			font-weight: 500;
			border: 1px solid #33b048;
			border-radius: 100rpx;
		}
	}
}
// B
.myliB {
	width: 94%;
	margin: 0 auto 30rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
	border-radius: 14rpx;
	font-size: 30rpx;
	color: #555;
	font-weight: 500;
	padding: 0 30rpx;

	view {
		position: relative;
		background: url(../../static/image/arrow_02.png) right center no-repeat;
		background-size: 20rpx 20rpx;
		padding: 30rpx 0;
		border-bottom: 1px solid #f1f1f1;
		display: flex;
		align-items: center;
		justify-content: flex-start;

		image {
			width: 40rpx;
			height: 40rpx;
			margin-right: 20rpx;
		}
		.ztpos {
			color: red;
			font-size: 26rpx;
			font-weight: normal;
			position: absolute;
			right: 30rpx;
			top: 36rpx;
			z-index: 1;
		}
	}
}
// 登出
.loginout {
	text-align: center;
	line-height: 3;
	font-size: 28rpx;
	color: #33b048;
}
// 底部tabbar
.tmenu {
	width: 100%;
	background: #fff;
	padding: 0rpx 0;
	line-height: 30rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
	.tm40 {
		width: 38%;
		display: flex;
		align-items: center;
		justify-content: center;
		view {
			width: 50%;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 20rpx 0;
			font-size: 22rpx;
			color: #555;
			image {
				width: 46rpx;
				height: 46rpx;
			}
		}
	}
	.tmscan {
		width: 24%;
		display: flex;
		align-items: center;
		justify-content: center;
		image {
			width: 170rpx;
			height: 170rpx;
			margin-top: -60rpx;
		}
	}
}
.cleard {
	clear: both;
	display: block;
	height: 200rpx;
}
</style>
