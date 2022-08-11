import {
  findConnectorByNum
} from '@/api/site.js'

export default {
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
      }).then(({
        result
      }) => {
        if (result?.id) {
          uni.navigateTo({
            url: `/pages/Charge/Paychos?connectorNum=${connectorNum}`
          })
        } else {
          this.$tip.toast('查找不到该充电桩编码')
        }
      })
    }
  }
}
