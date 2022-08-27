<template>
  <view class="cardlist" :class="data.bankAbbr" @click="handleClick">
    <view class="cardA">
      <image :src="`../../static/bank/${data.logo}`" mode="widthFix"></image>
      <view>
        <view>{{ data.bankName }}</view>
        <view class="ctag">储蓄卡</view>
      </view>
    </view>
    <view class="cardB">
      <text v-for="(str, index) in cardNoArray" :key="index">{{ str }}</text>
    </view>
  </view>
</template>

<script>
/* 
  中国银行 BOC
  中国建设银行 CCB
  中国工商银行 ICBC
  中国农业银行 ABC
  招商银行 CMB
  中国邮政储蓄银行 PSBC
  广发银行 CGB
  交通银行 BCM
  中国平安银行 SPABANK
  中信银行 CNCB
  浦发银行 SPDB
  中国民生银行 CMBC
  中国光大银行 CEB
  兴业银行 CIB
*/
export default {
  name: 'BankCard',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      key: 'value'
    };
  },
  computed: {
    cardNoArray() {
      const value = this.data.cardNo;
      if (!value) {
        return [];
      }
      const arr = ['****', '****', '****'];
      arr.push(value.slice(-3));
      return arr;
    }
  },
  methods: {
    handleClick() {
      this.$emit('click', this.data);
    },
    jiequ(str, n) {
      var strArr = [];
      for (var i = 0, l = str.length; i < l / n; i++) {
        var a = str.slice(n * i, n * (i + 1));
        strArr.push(a);
      }
      return strAr;
    }
  }
};
</script>

<style lang="scss" scoped>
.cardlist {
  width: 94%;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
  border-radius: 20rpx;
  color: #222;
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
      opacity: 1;
    }
  }
}
/* ------------------------银行卡对应背景------------------------------ */
/* 中国银行 */
.BOC {
  background-image: linear-gradient(
    to right bottom,
    #df4243,
    #c32f3c,
    #9e1f31
  ) !important;
  color: #fff;
}
/* 中国工商银行 */
.ICBC {
  background-image: linear-gradient(
    to right bottom,
    #c91d27,
    #c41d27,
    #c6000b
  ) !important;
  color: #fff;
}
/* 建设银行 */
.CCB {
  background-image: linear-gradient(
    to right bottom,
    #055fb7,
    #0e6ac3,
    #004f9c
  ) !important;
  color: #fff;
}
/* 农业银行 */
.ABC {
  background-image: linear-gradient(
    to right bottom,
    #16c59c,
    #05a983,
    #008566
  ) !important;
  color: #fff;
}
/* 邮政储蓄 */
.PSBC {
  background-image: linear-gradient(
    to right bottom,
    #10af4b,
    #0bab47,
    #108c3e
  ) !important;
  color: #fff;
}
/* 兴业银行 */
.CIB {
  background-image: linear-gradient(
    to right bottom,
    #0577f1,
    #0665cc,
    #025ab8
  ) !important;
  color: #fff;
}
/* 广发银行 */
.CGB {
  background-image: linear-gradient(
    to right bottom,
    #e5001f,
    #bd0016,
    #7c0606
  ) !important;
  color: #fff;
}
/* 中信银行 */
.CNCB {
  background-image: linear-gradient(
    to right bottom,
    #e5001f,
    #de051e,
    #d7000f
  ) !important;
  color: #fff;
}
/* 招商银行 */
.CMB {
  background-image: linear-gradient(
    to right bottom,
    #df1826,
    #b30a0f,
    #a61f23
  ) !important;
  color: #fff;
}
/* 交通银行 */
.BCM {
  background-image: linear-gradient(
    to right bottom,
    #0256c1,
    #054699,
    #00367a
  ) !important;
  color: #fff;
}
/* 平安银行 */
.SPABANK {
  background-image: linear-gradient(
    to right bottom,
    #fc6208,
    #eb5e0c,
    #ec681b
  ) !important;
  color: #fff;
}
/* 浦发银行 */
.SPDB {
  background-image: linear-gradient(
    to right bottom,
    #0546ca,
    #0c42b0,
    #14377e
  ) !important;
  color: #fff;
}
/* 民生银行 */
.CMBC {
  background-image: linear-gradient(
    to right bottom,
    #3a3ed2,
    #3b30cd,
    #2428bb
  ) !important;
  color: #fff;
}
/* 光大银行 */
.CEB {
  background-image: linear-gradient(
    to right bottom,
    #900db7,
    #8d09b5,
    #6d1687
  ) !important;
  color: #fff;
}
/* 北京银行 */
.b_beijing {
  background-image: linear-gradient(
    to right bottom,
    #f8353a,
    #e21b20,
    #e8252a
  ) !important;
  color: #fff;
}
/* 上海银行 */
.b_shanghai {
  background-image: linear-gradient(
    to right bottom,
    #4163e2,
    #3350b9,
    #314693
  ) !important;
  color: #fff;
}
/* 青岛银行 */
.b_qingdao {
  background-image: linear-gradient(
    to right bottom,
    #f6343b,
    #e6333a,
    #d8353b
  ) !important;
  color: #fff;
}
</style>
