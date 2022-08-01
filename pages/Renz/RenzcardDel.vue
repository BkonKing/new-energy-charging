<template>
  <view class="container">
    <bank-card :data="bankData">
    </bank-card>
    <button class="suredel" @click="unbound">解绑银行卡</button>
  </view>
</template>

<script>
import BankCard from './components/BankCard.vue'
import { removeMemberBank } from '@/api/member.js';
export default {
  components: {
    BankCard
  },
  data() {
    return {
      id: '',
      bankData: {}
    };
  },
  onLoad({ id }) {
    this.id = id;
  },
  methods: {
    unbound() {
      this.$tip.confirm('是否解除当前银行卡').then(() => {
        this.removeMemberBank();
      });
    },
    removeMemberBank() {
      removeMemberBank({
        id: this.id
      }).then(() => {
        this.$tip.success('解绑成功');
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          });
        }, 1500);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30rpx;
}
.cardlist {
  width: 94%;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
  border-radius: 20rpx;
  color: #fff;
  margin: 0rpx auto 34rpx;
  padding: 30rpx 30rpx;

  .cardA {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 40rpx;
    font-size: 38rpx;
    font-weight: 500;

    image {
      width: 90rpx;
      height: 90rpx;
      background: #fff;
      border-radius: 100%;
      margin-right: 20rpx;
      border: 1px solid #fff;
    }
    .ctag {
      font-size: 28rpx;
      font-weight: normal;
      opacity: 0.7;
      margin-top: 4rpx;
    }
  }
  .cardB {
    width: 100%;
    overflow: hidden;
    font-weight: bold;
    text {
      float: left;
      font-size: 70rpx;
      width: 25%;
      text-align: center;
      opacity: 0.5;
    }
    text:last-child {
      font-size: 50rpx;
      font-weight: 500;
      opacity: 0.8;
    }
  }
}
button.suredel,
uni-button.suredel {
  position: fixed;
  left: 3%;
  bottom: 60rpx;
  z-index: 5;
  line-height: 90rpx;
  font-size: 34rpx;
  width: 94%;
  background: #555;
  color: #fff;
  font-weight: 500;
  border: 1px solid #555;
  box-shadow: 0 0 20rpx 5rpx rgba(0, 0, 0, 0.1);
  border-radius: 100rpx;
  margin: 0 auto;
}
/* 银行卡颜色 左上到右下 */
.blue {
  background-image: linear-gradient(to right bottom, #07b7fe, #2d7efc, #4858ff);
}
.red {
  background-image: linear-gradient(to right bottom, #ff696a, #fa4655, #f42542);
}
.green {
  background-image: linear-gradient(to right bottom, #00cfa2, #00bd94, #00b089);
}
.orange {
  background-image: linear-gradient(to right bottom, #fea94d, #f1893f, #e86b30);
}
</style>
