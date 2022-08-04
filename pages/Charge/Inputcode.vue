<template>
  <view class="container">
    <input
      v-model="connectorNum"
      class="icode"
      type="number"
      placeholder="请输入充电桩编码"
    />
    <button class="bcode" @click="findConnectorByNum(connectorNum)">确定</button>
    <view class="scan disflex5">
      <image
        src="/static/image/scan.png"
        mode="widthFix"
        @click="handleScan"
      ></image>
    </view>
  </view>
</template>

<script>
import { findConnectorByNum } from '@/api/site.js'

export default {
  data() {
    return {
      connectorNum: ''
    };
  },
  onLoad() {},
  methods: {
    handleScan() {
      uni.scanCode({
        success: res => {
          console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
          this.findConnectorByNum(res.result)
        }
      });
    },
    findConnectorByNum(connectorNum) {
      console.log('connectorNum', connectorNum);
      if (!connectorNum) {
        this.$tip.toast('充电桩编码不能为空')
        return
      }
      findConnectorByNum({
        connectorNum
      }).then(({result}) => {
        if (result.siteId) {
          uni.navigateTo({
            url: `/pages/Charge/Paychos?connectorNum=${connectorNum}`
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
input.icode {
  width: 84%;
  line-height: 100rpx;
  height: 100rpx;
  font-size: 34rpx;
  font-weight: bold;
  color: #000;
  background: #fff;
  border-radius: 100rpx;
  text-align: center;
  margin: 30% auto 60rpx;
}
button.bcode,
uni-button.bcode {
  width: 84%;
  line-height: 90rpx;
  font-size: 34rpx;
  background: #33b048;
  color: #fff;
  font-weight: 500;
  border: 1px solid #33b048;
  border-radius: 100rpx;
}
.scan {
  position: fixed;
  bottom: 100rpx;
  left: 0;
  width: 100%;
  z-index: 10;

  image {
    width: 190rpx;
    height: 190rpx;
  }
}
</style>
