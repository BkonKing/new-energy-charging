<template>
	<view class="container">
		<checkbox-group @change="checkboxChange">
			<label class="bcosli" v-for="t in 3">
				<checkbox :checked="bcositem.checked" class="checkbox" style="transform:scale(0.9)" />
				<view class="bcosnr">
					<view class="bcname ellipsis">福州市规划设计研究院充电桩</view>
					<view class="bctag">
						普通发票
						<text>|</text>
						增值税专用发票
						<text>|</text>
						纸质发票
						<text>|</text>
						电子发票
						<text>|</text>
						快递到付
					</view>
					<view class="bcrpice">
						￥
						<text>21.06</text>
					</view>
				</view>
			</label>
		</checkbox-group>
		<!-- 底部 -->
		<view class="clearw"></view>
		<view class="wfoot"><button class="combutton" @click="billopen">下一步</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bcositem: { checked: false }
		};
	},
	components: {},
	created() {},
	methods: {
		// 复选框
		checkboxChange: function(e) {
			console.log(this.bcositem);
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
	padding-top: 30rpx;
}
// 列表
.bcosli {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	width: 94%;
	background: #fff;
	box-shadow: 0rpx 0rpx 15rpx rgba(60, 122, 255, 0.1);
	border-radius: 14rpx;
	padding: 20rpx 24rpx 20rpx;
	margin: 0rpx auto 30rpx;
	line-height: 1;
}
uni-checkbox .uni-checkbox-input,
.checkbox {
	margin-right: 5px;
}

.bcosnr {
	width: calc(100% - 30px);
}
.bcname {
	width: 100%;
	font-size: 32rpx;
	color: #555;
	font-weight: 550;
	line-height: 60rpx;
	height: 60rpx;
}
.bctag {
	font-size: 26rpx;
	color: #999;
	line-height: 1.4;
	text {
		padding: 0 10rpx;
	}
}
.bcrpice {
	color: #fe5f5e;
	font-size: 30rpx;
	font-weight: 550;
	margin-top: 14rpx;
	text {
		font-size: 34rpx;
	}
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
