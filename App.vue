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

<style>
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
/* ------------------------银行卡对应背景------------------------------ */
/* 中国银行 */
.b_zhongguo {
	background-image: linear-gradient(to right bottom, #df4243, #c32f3c, #9e1f31) !important;
}
/* 中国工商银行 */
.b_gongshang {
	background-image: linear-gradient(to right bottom, #c91d27, #c41d27, #c6000b) !important;
}
/* 建设银行 */
.b_jianshe {
	background-image: linear-gradient(to right bottom, #055fb7, #0e6ac3, #004f9c) !important;
}
/* 农业银行 */
.b_nongye {
	background-image: linear-gradient(to right bottom, #16c59c, #05a983, #008566) !important;
}
/* 邮政储蓄 */
.b_youzheng {
	background-image: linear-gradient(to right bottom, #10af4b, #0bab47, #108c3e) !important;
}
/* 兴业银行 */
.b_xingye {
	background-image: linear-gradient(to right bottom, #0577f1, #0665cc, #025ab8) !important;
}
/* 广发银行 */
.b_guangfa {
	background-image: linear-gradient(to right bottom, #e5001f, #bd0016, #7c0606) !important;
}
/* 中信银行 */
.b_zhongxin {
	background-image: linear-gradient(to right bottom, #e5001f, #de051e, #d7000f) !important;
}
/* 招商银行 */
.b_zhaoshang {
	background-image: linear-gradient(to right bottom, #df1826, #b30a0f, #a61f23) !important;
}
/* 交通银行 */
.b_jiaotong {
	background-image: linear-gradient(to right bottom, #0256c1, #054699, #00367a) !important;
}
/* 平安银行 */
.b_pingan {
	background-image: linear-gradient(to right bottom, #fc6208, #eb5e0c, #ec681b) !important;
}
/* 浦发银行 */
.b_pufa {
	background-image: linear-gradient(to right bottom, #0546ca, #0c42b0, #14377e) !important;
}
/* 民生银行 */
.b_minsheng {
	background-image: linear-gradient(to right bottom, #3a3ed2, #3b30cd, #2428bb) !important;
}
/* 光大银行 */
.b_guangda {
	background-image: linear-gradient(to right bottom, #900db7, #8d09b5, #6d1687) !important;
}
/* 北京银行 */
.b_beijing {
	background-image: linear-gradient(to right bottom, #f8353a, #e21b20, #e8252a) !important;
}
/* 上海银行 */
.b_shanghai {
	background-image: linear-gradient(to right bottom, #4163e2, #3350b9, #314693) !important;
}
/* 青岛银行 */
.b_qingdao {
	background-image: linear-gradient(to right bottom, #f6343b, #e6333a, #d8353b) !important;
}
</style>
