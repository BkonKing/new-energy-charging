<template>
	<view class="container">
		<!-- 联系人 -->
		<view class="fixA disflex4">
			<text>联系人手机号</text>
			<input type="number" value="13800012345" />
		</view>
		<!-- 关联终端 -->
		<view class="fixB">
			<view class="fixBtitle">关联终端（任选其一）</view>
			<view class="fixitem">
				<view>
					<view>扫描终端二维码</view>
					<view class="fixsm">终端ID</view>
				</view>
				<view class="fixcb">扫码关联</view>
			</view>
			<view class="fixitem">
				<view>
					<view>选择近期订单</view>
					<view class="fixsm">终端ID</view>
				</view>
				<view class="fixcb" @click="myorder">选择订单</view>
			</view>
		</view>
		<!--异常原因 -->
		<view class="fixB">
			<view class="fixBtitle">选择异常原因</view>
			<checkbox-group @change="checkboxChange" class="ycreson">
				<label class="yclabel" v-for="item in ycitems" :key="item.value">
					<checkbox style="transform:scale(0.7)" :checked="item.checked" />
					<text>{{ item.name }}</text>
				</label>
			</checkbox-group>
			<textarea  placeholder="补充更多信息,以便我们诊断问题" class="ycbuc" maxlength='200'/>
		</view>
		<view class="clearw"></view>
		<view class="wfoot"><button class="combutton">提交</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 异常原因
			ycitems: [
				{
					name: '位置描述不准确'
				},
				{
					name: '车位被占用'
				},
				{
					name: '二维码无法识别'
				},
				{
					name: '停车费信息不属实'
				},
				{
					name: '无法拔枪'
				},
				{
					name: '枪头损坏'
				},
				{
					name: '充电异常终端'
				},
				{
					name: '充电慢'
				},
				{
					name: '故障灯常亮'
				},
				{
					name: '电源指示灯不亮'
				},
				{
					name: '程序无法启动'
				},
				{
					name: '程序无法停止'
				}
			]
		};
	},
	onLoad() {},
	methods: {
		// 异常原因多选
		checkboxChange: function(e) {},
		// 前往我的订单
		myorder(){
			uni.navigateTo({
				url:'../Order/Orderlist_fix'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding-top: 30rpx;
}
// 联系人
.fixA {
	position: relative;
	width: 94%;
	margin: 0 auto 30rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
	border-radius: 14rpx;
	color: #555;
	line-height: 1.6;
	font-size: 30rpx;
	padding: 20rpx 30rpx;
	input,
	uni-input {
		width: 60%;
		margin-left: 30rpx;
	}
}
// 关联终端
.fixB {
	width: 94%;
	margin: 0 auto 30rpx;
	background: #fff;
	box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
	border-radius: 14rpx;
	color: #555;
	line-height: 1.6;
	font-size: 30rpx;
	padding: 0rpx 30rpx 30rpx;
	.fixBtitle {
		font-size: 32rpx;
		font-weight: 550;
		color: #333;
		padding: 30rpx 0 10rpx;
	}
	.fixitem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28rpx 0;
		border-bottom: 1px solid #eee;
		.fixcb {
			color: #fff;
			font-size: 26rpx;
			background: #33b048;
			padding: 10rpx 20rpx;
			border-radius: 100rpx;
		}
		.fixsm {
			font-size: 24rpx;
			color: #999;
		}
	}
	// 异常原因
	.ycreson {
		width: 100%;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		font-size: 28rpx;
		.yclabel {
			width: 50%;
			margin-bottom: 30rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
	}
	.ycbuc {
		width: 100%;
		font-size: 28rpx;
		border-radius: 14rpx;
		background: #f1f1f1;
		padding: 30rpx;
		margin: 0rpx 0;
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
