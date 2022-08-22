import {
  findConnectorByNum
} from '@/api/site.js'

export default {
  methods: {
    handleScan(isRedirect) {
      uni.scanCode({
        success: res => {
          console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
          this.findConnectorByNum(res.result, isRedirect)
        }
      });
    },
    findConnectorByNum(connectorNum, isRedirect) {
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
        if (!result) {
          this.$tip.toast('查找不到该充电桩编码')
          return
        }
        const {connectorStatus, id, connectorNum} = result
        if (!id || !connectorNum) {
          this.$tip.toast('查找不到该充电桩编码')
          return
        }
        if (connectorStatus === 1) {
          if (isRedirect) {
            uni.redirectTo({
              url: `/pages/Charge/Paychos?connectorNum=${connectorNum}`
            })
            return
          }
          uni.navigateTo({
            url: `/pages/Charge/Paychos?connectorNum=${connectorNum}`
          })
          return
        }
        this.toast(connectorStatus)
      })
    },
    toast(connectorStatus) {
      const text = {
        0: '请先插入充电枪',
        2: '桩已被使用',
        3: '桩已被使用',
        4: '该充电桩出现故障，请更换其他桩',
      }
      this.$tip.toast(text[connectorStatus])
    }
  }
}
