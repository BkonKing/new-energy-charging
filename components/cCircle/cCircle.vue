<template>
  <view class="c-circle" :style="cBox">
    <view class="circle-content" :style="slotStyle">
      <slot name="content">{{ animationPercent }}%</slot>
    </view>
    <view class="clip-box" :style="faStyle">
      <view class="left-box" :style="leftStyle"></view>
      <view class="right-box" :style="rightStyle"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      animationPercent: 0,
      timer: null
    };
  },
  mounted() {
    if (this.animation) {
      this.loadAnimation();
    } else {
      this.animationPercent = this.percent;
    }
  },
  destroyed() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    //动画加载方法
    loadAnimation() {
      this.animationPercent = 0;
      this.timer = setInterval(() => {
        if (this.animationPercent >= this.percent) {
          clearInterval(this.timer);
          this.$emit('onComplete');
        } else {
          this.animationPercent += 1;
          this.$emit('animationPercent', this.animationPercent);
        }
      }, this.animationSpeed);
    }
  },
  props: {
    //大小
    size: {
      type: Number,
      default: 60
    },
    //进度条颜色
    circleColor: {
      type: String,
      default: '#33b048'
    },
    //圆环背景色
    defaultColor: {
      type: String,
      default: '#e9e9e9'
    },
    //圆环宽度
    circleWidth: {
      type: Number,
      default: 5
    },
    //百分比
    percent: {
      type: Number,
      default: 0
    },
    //动画效果
    animation: {
      type: Boolean,
      default: false
    },
    //帧动画间隔
    animationSpeed: {
      type: Number,
      default: 1
    },
    //动画方向
    clockwise: {
      type: Boolean,
      default: true
    },
    //自定义起点位置
    direction: {
      type: Number,
      default: 0
    }
  },
  computed: {
    cBox() {
      return `
						height:${this.size}px;
						width:${this.size}px;
            background-color: ${this.defaultColor};
					`;
    },
    slotStyle() {
      const slotWidth = this.size - 2 * this.circleWidth;
      return `
						height:${slotWidth}px;
						width:${slotWidth}px;
					`;
    },
    faStyle() {
      const size = this.size;
      const circleWidth = this.circleWidth;
      const defaultColor = this.defaultColor;
      const direction = this.direction;
      const clockwise = this.clockwise;
      const percent = this.animation ? this.animationPercent : this.percent;
      const clip =
        percent > 50 && percent <= 100
          ? `clip: auto;`
          : `clip: rect(0, ${size}px, ${size}px, ${size /
              2}px);`;
      return `width: ${size}px;
            height: ${size}px;
            border: ${circleWidth}px solid ${this.defaultColor};
            ${clip}
            transform:rotate(${direction}deg) rotateX(${
              clockwise ? 180 : 0
            }deg) rotateY(${
              clockwise ? 180 : 0
            }deg)`;
    },
    leftStyle() {
      const size = this.size;
      const circleColor = this.circleColor;
      const circleWidth = this.circleWidth;
      const percent = this.animation ? this.animationPercent : this.percent;
      return `width: ${size}px;
            height: ${size}px;
            border: ${circleWidth}px solid ${circleColor};
            clip: rect(0 ${size / 2}px ${size}px 0);
            top: -${circleWidth}px;
            left: -${circleWidth}px;
            transform:rotate(${(percent / 100) * 360}deg);`;
    },
    rightStyle() {
      const size = this.size;
      const circleColor = this.circleColor;
      const circleWidth = this.circleWidth;
      const percent = this.animation ? this.animationPercent : this.percent
      const width = percent > 100 || percent <= 50 ? 0 : size;
      return `width: ${width}px;
            height: ${size}px;
            border: ${circleWidth}px solid ${circleColor};
            clip: rect(0 ${size}px ${size}px ${size /
        2}px);
            top: -${circleWidth}px;
            left: -${circleWidth}px;`;
    }
  }
};
</script>

<style lang="scss" scoped>
.c-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
}
.circle-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  background: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  // font-size: 32px;
}
.clip-box {
  position: absolute;
  border-radius: 50%;
}
.left-box {
  position: absolute;
  border-radius: 50%;
}
.right-box {
  position: absolute;
  border-radius: 50%;
}
</style>
