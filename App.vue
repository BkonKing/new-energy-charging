<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '~@/static/style/app.scss';
view,
scroll-view,
text,
image,
textarea,
button,
input {
	box-sizing: border-box !important;
}
/* 按钮 */
button {
	/* 清除苹果自带button样式 */
	outline: 0px;
	-webkit-appearance: none;
}
button::after {
	border: none;
}
/* checkbox按钮样式颜色修改-全局 */
/* uni-checkbox .uni-checkbox-input,
.checkbox {
	border-radius: 50%;
} */

uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before,
.checkbox:before {
	font-size: 22px;
	background: #33b048;
	color: #fff;
	padding: 10rpx;
	border: 1px solid #33b048;
}

/* 联系客服-折叠面板样式 */
.contact .uni-collapse {
	margin-bottom: 20rpx;
}
.contact .uni-collapse-item__title-img {
	height: 50rpx !important;
	width: 50rpx !important;
	margin-right: 5px !important;
	opacity: 0.7;
}
.contact .uni-collapse-item__title-text {
	font-size: 32rpx !important;
	color: #555 !important;
	font-weight: 500 !important;
}
/* 车型索引 */
.carstyle .uni-indexed-list {
	top: 120rpx !important;
}
button[disabled] ,
uni-button[disabled]  {
  opacity: 0.6;
}
</style>
