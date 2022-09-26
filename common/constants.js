export const ACCESS_TOKEN = 'Access-Token'
export const USER_NAME = 'login_username'
export const USER_INFO = 'UserInfo'
export const OPENID = 'openid'

export const WHITELIST = [
  '/pages/tabbar/index',
  '/pages/tabbar/sitelist',
  '/pages/tabbar/wait',
  '/pages/tabbar/mine',
  '/pages/Login/Login',
  '/pages/Other/AgreeYs',
  '/pages/Other/AgreeUse',
]

export const qqScaleObj = {
  3: 1000 * 1000 * 10,
  4: 500 * 1000 * 10,
  5: 200 * 1000 * 10,
  6: 100 * 1000 * 10,
  7: 50 * 1000 * 10,
  8: 50 * 1000 * 10,
  9: 20 * 1000 * 10,
  10: 10 * 1000 * 10,
  11: 5 * 1000 * 10,
  12: 2 * 1000 * 10,
  13: 1 * 1000 * 10,
  14: 500 * 10,
  15: 200 * 10,
  16: 100 * 10,
  17: 50 * 10,
  18: 50 * 10,
  19: 20 * 10,
  20: 10 * 10
};

export const InvoiceTypeDict = {
  0: '增值税普通发票',
  1: '增值税专用发票',
  2: '增值税电子普通发票',
  3: '所有'
};
export const InvoiceStatusDict = {
  1: '已开票',
  0: '开票失败',
  2: '开票中',
};

export const chargeStatusDict = {
  '-1': '充电失败',
  0: '充电中',
  1: '充电结束',
  2: '等待充电'
};

export const operateTypeDict = {
  1: '直营',
  2: '联营',
  3: '互联互通',
  4: '他营'
};

export const stopReasonDict = {
  0: '充满停止充电',
  1: 'APP远程停止充电',
  2: '余额不足停止充电',
  3: '触控屏手动停止充电',
  4: '手动刷卡停止充电',
  5: 'APP账号停止充电',
  6: '连接器断开停止充电',
  7: '充电过程中拔枪停止充电',
  8: '后台停止充电',

  9: '满足设定时间停止充电',
  10: '满足设定电量停止充电',
  11: '满足设定金额停止充电',
  12: '满足设定SOC停止充电',
  13: '无有效电流停止充电',
  14: '充电桩达到终止条件停止',
  15: 'BMS 停止充电',

  16: 'BMS异常停止充电',
  17: '设备故障停止充电',
  18: '电源故障停止充电',
  19: '车辆故障停止充电',

  20: '急停按钮已被按下'
};

export const equipmentTypeDict = {
  1: '直流快充',
  2: '交流慢充'
};

export const connectorStatusDict = {
  0: '空闲',
  1: '已插枪',
  2: '充电中',
  3: '充电结束',
  4: '故障'
};

export const refundStatusDict = {
  0: '提现失败',
  1: '提现成功',
  2: '提现中',
  3: '到账中',
  4: '部分成功'
};

export const payChannelDict = {
  1: '钱包',
  2: '微信',
  3: '支付宝',
  5: '云闪付'
};

export const withdrawChannelDict = {
  1: '银行卡',
  2: '微信钱包',
  3: '支付宝',
  4: '原路返回'
}

export const payStatusDict = {
  0: '已取消',
  1: '已支付',
  2: '待支付',
  3: '执行中'
};

export const payTypeDict = {
  1: '充值',
  2: '提现',
  3: '消费',
  4: '退款',
  5: '提现退回'
}


