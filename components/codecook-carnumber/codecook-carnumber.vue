<template>
	<view class="car-number">
		<view class="new-energy">新能源</view>
		<view class="wrap" @tap="focusHandler">
			<view
				:class="['cell', { last: index === length - 1 }, { 'no-border': index === length - 1 || index === length - 2 }, { active: index === current }]"
				v-for="(val, index) in fill"
				:key="index"
				@tap.stop="focusHandler(index)"
			>
				<view class="val">{{ val }}</view>
				<view class="border"></view>
			</view>
		</view>

		<key-board v-if="focus" :type="kType" @on-delete="keyDeleteHandler" @on-input="keyInputHandler" @on-hide="keyHideHandler"></key-board>
	</view>
</template>

<script>
import KeyBoard from '../codecook-keyboard/codecook-keyboard.vue';

export default {
	name: 'CarNumber',
	components: {
		KeyBoard
	},
	props: {
		value: {
			type: String,
			default: ''
		},
		length: {
			type: Number,
			default: 8
		}
	},
	data() {
		return {
			focus: false,
			current: 0,
			fill: new Array(this.length).fill('')
		};
	},
	computed: {
		kType() {
			return this.current === 0 ? 'provinces' : 'areas';
		}
	},
	watch: {
		fill(val) {
			this.$emit('input', val.join(''));
			this.$emit('change', val);
		}
	},
	methods: {
		focusHandler(index = 0) {
			this.focus = true;

			this.current = index;
			console.log(this.current);
		},
		keyDeleteHandler() {
			this.$set(this.fill, this.current, '');

			if (this.current <= 0) {
				return;
			}

			this.current -= 1;
		},
		keyInputHandler(key) {
			this.$set(this.fill, this.current, key);

			if (this.current >= this.length - 1) {
				return;
			}

			this.current += 1;
		},
		keyHideHandler() {
			this.focus = false;
		}
	},
	beforeMount() {
		if (this.value) {
			this.value.split('').forEach((key, index) => {
				if (index >= this.length) {
					return;
				}
				this.$set(this.fill, index, key);
			});

			this.current = Math.min(this.value.length, this.length - 1);
		}
	},
	mounted() {
		this.focus = true;
	}
};
</script>

<style scoped lang="less">
.car-number {
	position: relative;
	width: 100%;

	.wrap {
		width: 100%;
		height: 100%;
		background: #f7f7f7;
		display: flex;
		justify-content: space-between;
		border: 1rpx solid #979797;
		box-sizing: border-box;
		border-radius: 14rpx;
		box-shadow: 0rpx 0rpx 10rpx 10rpx rgba(128, 128, 128, 0.05);
		padding: 30rpx 10rpx;
	}

	.new-energy {
		font-size: 26rpx;
		color: #33b048;
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: row-reverse;
		padding-right: 16rpx;
	}

	.cell {
		box-sizing: border-box;
		padding: 20rpx 0;
		flex: 1;
		color: #333;
		font-size: 36rpx;
		font-weight: 500;
		border-right: 1rpx solid #555;
		text-align: center;
		border-bottom: 1rpx solid transparent;
		box-sizing: border-box;
		padding: 0 15rpx;
		display: flex;
		flex-direction: column;
		position: relative;
		height: 80rpx;

		.val {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.border {
			flex-shrink: 0;
			flex-grow: 0;
			height: 4rpx;
			background: transparent;
			width: 100%;
		}

		&.active {
			.border {
				background: #ff7134;
			}
		}
		&.no-border {
			border-right: none;
		}

		&.last:after {
			content: '';
			width: 100%;
			border: 2px solid #33b048;
			border-radius: 8rpx;
			margin: -18rpx 0;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			box-sizing: border-box;
		}
	}
}
</style>
