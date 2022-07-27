<template>
	<view class="container">
		<view class="coutA">
			<view class="outitem">
				<view>提现金额</view>
				<view class="outip disflex4">
					<text>￥</text>
					<input v-model="outMoney" placeholder="0.00" type="digit" />
				</view>
			</view>
			<view class="cotip">
				<text>可提现金额：￥{{allMoney}}</text>
				<text class="alltx" @click="cashOutAll">全部提现</text>
			</view>
			<button class="suretx" @click="$refs.popA.show()">2小时内到账，确定提现</button>
		</view>
		<view class="cotts">
			<view>温馨提示</view>
			<view>1、存在未结束订单时无法进行提现操作。</view>
			<view>2、充值金额涉及充值优惠，退款时扣除相应的优惠金额。</view>
			<view>3、6个月订单原路退回。</view>
		</view>
		<!-- 弹框 -->
		<pop ref="popA" direction="below" :is_close="true" :is_mask="true" :width="100" height="fit-content" :maskFun="true" @watchOpen="watchOpen" @watchClose="watchClose">
			<view class="tcwarp">
				<view class="taxtA">
					<view>余额提现</view>
					<view class="taxnum">{{outMoney}}</view>
				</view>
				<scroll-view scroll-y="true" class="Dview">
					<!-- 原路返回 -->
					<block v-if="!isshow">
						<view class="txmin disflex" v-for="t in 2">
							<view>
								<view>支付宝充值</view>
								<view class="gray">2022.06.16 14:40</view>
							</view>
							<view>￥10.00</view>
						</view>
					</block>
					<!-- 提现至 -->
					<view class="taxfor" @click="$refs.popB.show()" v-else>
						<text>提现至</text>
						<view class="txfid">
							<image src="" mode="widthFix"></image>
							<text>农业银行（1234）</text>
						</view>
					</view>
				</scroll-view>
				<button class="sureco">确认提现</button>
			</view>
		</pop>

		<!-- 弹框 提现至-->
		<pop ref="popB" direction="below" :is_close="true" :is_mask="true" :width="100" height="fit-content" :maskFun="true" @watchOpen="watchOpen" @watchClose="watchClose">
			<view class="tcwarp">
				<view class="tctitle">请选择</view>
				<scroll-view scroll-y="true" class="radiowp">
					<radio-group @change="radioChange">
						<label class="radioli">
							<view class="radname">
								<image src="" mode="widthFix"></image>
								<text>建设银行（1234）</text>
							</view>
							<radio value="1" color="#33b048" checked="" />
						</label>
						<label class="radioli">
							<view class="radname">
								<image src="" mode="widthFix"></image>
								<text>农业银行（1234）</text>
							</view>
							<radio value="2" color="#33b048" />
						</label>
					</radio-group>
				</scroll-view>
				<view class="glcard" @click="renzcard">管理银行卡</view>
			</view>
		</pop>
	</view>
</template>

<script>
import pop from '@/components/ming-pop/ming-pop.vue'; //弹框
export default {
	components: {
		pop
	},
	data() {
		return {
			isshow: true,
      allMoney: 20.01,
      outMoney: undefined
		};
	},
	onLoad() {},
	methods: {
    cashOutAll() {
      this.outMoney = this.allMoney
    },
		watchOpen() {},
		watchClose() {},

		// 弹框支付方式单选
		radioChange() {
			this.$refs.popB.close();
		},
		// 前往银行卡
		renzcard() {
			uni.navigateTo({
				url: '../Renz/Renzcard'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 30rpx;
}

.coutA {
	position: relative;
	width: 94%;
	margin: 0 auto 30rpx;
	padding: 0 30rpx 10rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
	border-radius: 14rpx;
	font-size: 30rpx;
	color: #555;

	.couchos {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
		background: url('@/static/image/arrow_01.png') right center no-repeat;
		background-size: 30rpx 30rpx;

		.couid {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-weight: 500;
			margin-right: 40rpx;
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
		}
	}
	.outitem {
		border-top: 1px solid #ededed;
		border-bottom: 1px solid #ededed;
		padding: 30rpx 0 0;

		.outip {
			font-size: 40rpx;
			color: #333;
			font-weight: 500;
			padding: 30rpx 0;

			input,
			uni-input {
				color: #333;
				width: 80%;
				font-size: 52rpx;
				padding: 0rpx 0;
			}
			.uni-input-placeholder {
				color: #333;
			}
		}
	}
	.cotip {
		font-size: 28rpx;
		color: #999;
		padding: 30rpx 0;

		.alltx {
			color: #33b048;
			margin-left: 20rpx;
		}
	}
	button.suretx,
	uni-button.suretx {
		line-height: 90rpx;
		font-size: 34rpx;
		width: 100%;
		background: #33b048;
		color: #fff;
		font-weight: 500;
		border: 1px solid #33b048;
		box-shadow: 0 0 20rpx 0rpx rgba(45, 255, 80, 0.2);
		border-radius: 100rpx;
		margin: 40rpx auto;
	}
}
/* 温馨提示 */
.cotts {
	width: 93%;
	font-size: 28rpx;
	line-height: 1.8;
	color: #888;
	font-weight: 500;
	margin: 50rpx auto;
}

.cotts view {
	margin-bottom: 10rpx;
}

.cotts view:first-child {
	margin-bottom: 20rpx;
	font-size: 32rpx;
	color: #33b048;
}
// 弹框
.tcwarp {
	background: #fff;
	padding-bottom: 150rpx;
	// 提现金额
	.taxtA {
		padding: 50rpx 0;
		line-height: 1.6;
		font-size: 32rpx;
		color: #333;
		font-weight: 550;
		text-align: center;
		.taxnum {
			color: #33b048;
			font-size: 74rpx;
		}
	}
	.Dview {
		width: 100%;
		max-height: 50vh;
		// overflow-y: scroll;
		margin: 0 auto;
	}
	// 原路返回 明细
	.txmin {
		width: 90%;
		padding-bottom: 20rpx;
		border-bottom: 1px dashed #dedede;
		color: #333;
		line-height: 1.6;
		margin: 0 auto 30rpx;
		.gray {
			font-size: 24rpx;
			font-weight: normal;
			color: #999;
		}
	}
	// 提现至银行卡
	.taxfor {
		width: 90%;
		margin: 0 auto 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40rpx 0 40rpx;
		background: url('@/static/image/arrow_01.png') right center no-repeat;
		background-size: 30rpx 30rpx;
		font-size: 30rpx;
		color: #555;
		.txfid {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-weight: 500;
			color: #333;
			font-size: 32rpx;
			margin-right: 30rpx;
			image {
				width: 50rpx;
				height: 50rpx;
				background: #f1f1f1;
				border-radius: 100%;
				margin-right: 20rpx;
			}
		}
	}

	.tctitle {
		width: 100%;
		background: #eee;
		font-size: 34rpx;
		font-weight: 500;
		color: #333;
		line-height: 100rpx;
		text-align: center;
	}
	.radiowp {
		width: 92%;
		min-height: 320rpx;
		max-height: 50vh;
		// overflow-y: scroll;
		margin: 0 auto;
		font-size: 30rpx;
		color: #555;
		padding: 30rpx 0 0;
		.radioli {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 0;
			border-bottom: 1px solid #ededed;
			.radname {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
					background: #f1f1f1;
					border-radius: 100%;
				}
			}
		}
	}
	.glcard {
		position: fixed;
		left: 3%;
		bottom: 30rpx;
		z-index: 11;
		width: 94%;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #fe5f5e;
		border-radius: 100rpx;
		border: 1px solid #fe5f5e;
		text-align: center;
	}
	button.sureco,
	uni-button.sureco {
		position: fixed;
		left: 3%;
		bottom: 30rpx;
		z-index: 11;
		width: 94%;
		line-height: 80rpx;
		font-size: 34rpx;
		background: #33b048;
		color: #fff;
		font-weight: 500;
		border: 1px solid #33b048;
		border-radius: 100rpx;
		margin: 0rpx auto;
	}
}
</style>
