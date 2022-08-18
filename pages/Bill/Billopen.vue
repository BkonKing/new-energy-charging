<template>
	<view class="container">
		<view class="botitle">发票详情</view>
		<view class="pd24">
			<view class="boitem">
				<text>发票金额</text>
				<text class="boprice">300元</text>
			</view>
			<view class="boitem">
				<text>抬头类型</text>
				<radio-group @change="radioChange" class="ckgroup">
					<label>
						<radio value="r1" checked="true" style="transform:scale(0.7)" />
						企业单位
					</label>
					<label>
						<radio value="r2" style="transform:scale(0.7)" />
						个人/非企业单位
					</label>
				</radio-group>
			</view>
			<view class="boitem">
				<text>发票抬头</text>
				<input placeholder="输入抬头名称" />
			</view>
			<view class="boitem">
				<text>纳税号码</text>
				<input placeholder="输入纳税号码" />
			</view>
			<view class="boitem">
				<text>电话号码</text>
				<input type="number" placeholder="输入电话号码" />
			</view>
			<view class="boitem">
				<text>单位地址</text>
				<input placeholder="输入单位地址" />
			</view>
			<view class="boitem">
				<text>开户银行</text>
				<input placeholder="输入开户银行" />
			</view>
			<view class="boitem">
				<text>银行账号</text>
				<input type="number" placeholder="输入银行账号" />
			</view>
			<view class="boitem">
				<text>备注信息</text>
				<input placeholder="输入备注信息" />
			</view>
		</view>
		<view class="botitle">接收方式</view>
		<view class="pd24">
			<view class="boitem">
				<text>电子邮件</text>
				<input placeholder="输入电子邮件" />
			</view>
		</view>
		<view class="clearw"></view>
		<view class="wfoot"><button class="combutton">提交</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		// 抬头类型选择
		radioChange() {}
	}
};
</script>

<style lang="scss" scoped>
.botitle {
	display: block;
	color: #555;
	font-size: 30rpx;
	font-weight: 500;
	padding: 0 24rpx;
	line-height: 80rpx;
}
.pd24 {
	background: #fff;
	display: block;
	padding: 0rpx 24rpx;
}
.boitem {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 30rpx;
	color: #999;
	padding: 24rpx 0;
	border-bottom: 1px solid #eaeaea;
	line-height: 60rpx;

	.boprice {
		color: #555;
		font-weight: 500;
		text-align: right;
	}
	.ckgroup {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		color: #555;
		font-weight: 500;

		label {
			margin-left: 20rpx;
		}
	}
	uni-input,
	input {
		width: 75%;
    height: 30rpx;
		color: #555;
		font-weight: 500;
		text-align: right;
    line-height: 30rpx;
		font-size: 30rpx;
	}
	.uni-input-placeholder {
		color: #999;
		font-weight: normal;
	}
}
.boitem:last-child {
	border-bottom: none;
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
