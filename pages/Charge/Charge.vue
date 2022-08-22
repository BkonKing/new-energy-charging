<template>
  <view class="container">
    <!-- 加载动画 -->
    <view v-if="loadshwo">
      <view class="loaditem" @touchmove.stop.prevent="moveHandle">
        <image
          class="loading-image"
          src="@/static/image/loading_1.gif"
          mode=""
        ></image>
        <view>请稍等，正在加载中……</view>
      </view>
    </view>
    <template>
      <!-- 充电汽车切换 -->
      <view class="carul disflex5">
        <text @click="$refs.pop.show()">
          设备编码：{{ dataInfo.connectorNum || '--' }}
        </text>
        <image
          src="/static/image/arrow_03.png"
          mode="widthFix"
          class="arrimg"
        ></image>
      </view>
      <!-- 充电汽车切换 弹框 -->
      <pop
        ref="pop"
        direction="up"
        :is_close="true"
        :is_mask="true"
        :width="100"
        height="fit-content"
        :maskFun="true"
        @watchOpen="watchOpen"
        @watchClose="watchClose"
      >
        <view class="tcwarp">
          <view class="caritem" v-for="item in orderList" @click="popchose(item)">
            <text>设备编码：{{ item.connectorNum || '--' }}</text>
            <text class="carstatu">{{item.chargeStatus | chargeStatusText}}</text>
          </view>
        </view>
      </pop>
      <!-- 传感器 -->
      <best-gauge :config="gaugeOption1"></best-gauge>
      <!-- 汽车图片 -->
      <view class="carshow">
        <image
          src="/static/image/car3.png"
          mode="widthFix"
          :class="{ 'scale-car': scaleCardShow }"
        ></image>
      </view>
      <!-- 充电计时 -->
      <view class="Timesul">
        <div class="cTimes">
          <uni-countdown
            :show-day="false"
            :font-size="40"
            :hour="0"
            :minute="12"
            :second="12"
          />
        </div>
        <view class="sTimes disflex5">
          <text>正在充电中，已充电</text>
          <bing-countup :font-size="16" color="#999" />
        </view>
      </view>
      <!-- 费用 -->
      <view class="cFeiy disflex">
        <view>
          <text>实时费用</text>
          <text class="wonum">{{ dataInfo.electricAmount || '--' }}</text>
        </view>
        <view @click="goCashin">
          <text>账户余额</text>
          <text class="wonum">{{ balances }}</text>
          <text class="cmin">充值</text>
        </view>
      </view>
      <!-- 数据 -->
      <view class="cShu disflex">
        <view>
          <text>电压</text>
          <text class="wonum">
            10
            <text class="snum">v /421v</text>
          </text>
        </view>
        <view>
          <text>功率</text>
          <text class="wonum">
            19
            <text class="snum">kW /27kW</text>
          </text>
        </view>
        <view>
          <text>电流</text>
          <text class="wonum">
            12
            <text class="snum">A /65A</text>
          </text>
        </view>
      </view>
      <!-- 终端信息 -->
      <view class="cDuan disflex">
        <text>
          设备编号：{{ dataInfo.connectorNum || '--' }}
          <text class="cdcopy">复制</text>
        </text>
        <text>终端时间 16:24:36</text>
      </view>
      <!-- 数据图表 -->
      <view class="dylist">
        <view class="leader">
          <view class="ltitle">
            <view
              @tap="changeShowType(1)"
              :class="showType == 1 ? 'activeContentA' : ''"
            >
              <view>电压</view>
            </view>
            <view
              @tap="changeShowType(2)"
              :class="showType == 2 ? 'activeContentA' : ''"
            >
              <view>功率</view>
            </view>
            <view
              @tap="changeShowType(3)"
              :class="showType == 3 ? 'activeContentA' : ''"
            >
              <view>电流</view>
            </view>
          </view>
        </view>
        <view class="uchart" v-if="showType == 1">
          <view class="uctitle">
            <view>
              <text>实际输出电压</text>
              <text>392.90V</text>
            </view>
            <view>
              <text>所需电压</text>
              <text>421V</text>
            </view>
          </view>
          <qiun-data-charts
            type="area"
            :canvas2d="true"
            :opts="optsDY"
            :ontouch="true"
            :chartData="chartDataDY"
          />
        </view>
        <view class="uchart" v-if="showType == 2">
          <view class="uctitle">
            <view>
              <text>实际输出功率</text>
              <text>0kW</text>
            </view>
            <view>
              <text>所需功率</text>
              <text>0kW</text>
            </view>
          </view>
          <qiun-data-charts
            type="area"
            :canvas2d="true"
            :opts="optsGL"
            :ontouch="true"
            :chartData="chartDataGL"
          />
        </view>
        <view class="uchart" v-if="showType == 3">
          <view class="uctitle">
            <view>
              <text>实际输出电流</text>
              <text>10A</text>
            </view>
            <view>
              <text>所需电流</text>
              <text>10A</text>
            </view>
          </view>
          <qiun-data-charts
            type="area"
            :canvas2d="true"
            :opts="optsDL"
            :ontouch="true"
            :chartData="chartDataDL"
          />
        </view>
      </view>
      <view class="clearw"></view>
      <!-- 底部按钮 -->
      <view class="sitefoot">
        <view class="sfico" @click="goFixsent">
          <image src="/static/image/ico_09.png" mode="widthFix"></image>
          <text>故障报修</text>
        </view>
        <view class="sfico" @click="goContact">
          <image src="/static/image/ico_16.png" mode="widthFix"></image>
          <text>联系客服</text>
        </view>
        <button class="sfbt" @click="stopCharge()">停止充电</button>
      </view>
    </template>
  </view>
</template>

<script>
import {
  findMemberByWallet,
  stopCharge,
  findChargeOrder,
  findOrderByMemberId
} from '@/api/member.js';
import pop from '@/components/ming-pop/ming-pop.vue'; //弹框
import bestGauge from '../../components/best-gauge/best-gauge.vue'; //环形传感器

const chargeStatusDict = {
  '-1': '充电失败',
  0: '充电中',
  1: '充电结束',
  2: '等待充电',
}

export default {
  components: { pop, bestGauge },
  data() {
    let _width = uni.upx2px(480); //传感器宽度350
    return {
      connectorNum: '',
      orderId: '',
      balances: 0,
      pollTimer: null,
      dataInfo: {},
      orderList: [],
      // 加载动画显示
      loadshwo: true,
      // 传感器chart数据
      gaugeOption1: {
        id: 'gaugeId1',
        bgColor: 'rgba(255,255,255,1)',
        startAngle: 0.75,
        endAngle: 0.25,
        width: _width,
        // status: 1, //设备是否在线 0 离线 1在线
        padding: 10,
        min: 0,
        max: 100,
        value: 75.8,
        unit: '%',
        name: '已充0.00度',
        detail: {
          //数值单位设置
          title: {
            //name字体位置设置
            color: '#333',
            fontSize: uni.upx2px(30),
            fontWeight: '500',
            offsetCenter: [0, uni.upx2px(10)],
            textAlign: 'center'
          },
          value: {
            color: '#000',
            fontSize: uni.upx2px(90),
            fontWeight: 'bold',
            offsetCenter: [0, uni.upx2px(-55)], //距离圆心直径偏移
            textAlign: 'center'
          },
          unit: {
            color: '#000',
            fontSize: uni.upx2px(30),
            fontWeight: 'bold',
            offsetCenter: [0, uni.upx2px(-55)], //距离圆心直径偏移
            textAlign: 'center'
          }
        },
        axisTick: [
          //轴刻度线
          {
            width: uni.upx2px(30), //轴长
            number: 10, //轴数量（相当于几等分）
            color: '#33b048,#dddddd', //轴颜色(第一个值--指针之前的颜色，之后的颜色)
            subNumber: 10, //一个大刻度分成几个小刻度
            subHeight: 1.8,
            subWidth: uni.upx2px(30),
            padding: uni.upx2px(10) //刻度距离边距
          },
          {
            width: uni.upx2px(20), //轴长
            number: 10, //轴数量（相当于几等分）
            color: '#d5d5d5', //轴颜色(第一个值--指针之前的颜色，之后的颜色)
            subNumber: 10, //一个大刻度分成几个小刻度
            subHeight: 1,
            subWidth: uni.upx2px(10),
            padding: uni.upx2px(25) //刻度距离边距
          }
        ]
      },
      // 数据图标tab页面
      showType: 1,
      chartDataDY: {}, //电压
      optsDY: {
        color: ['#FAC858', '#EE6666'],
        padding: [0, 10, 0, 0],
        legend: {
          show: true,
          position: 'top',
          float: 'right',
          itemGap: 10,
          padding: 5,
          lineHeight: 0
        }, //小标题
        dataLabel: false, //点位上的数据
        enableScroll: true, //开启图表拖拽功能
        // x轴显示的内容
        xAxis: {
          type: 'grid',
          gridColor: '#eee',
          gridType: 'soild',
          disableGrid: true,
          dashLength: 8,
          boundaryGap: 'false', //两端不留白配置,center居中
          itemCount: 5, //x轴单屏显示数据的数量，默认为5个
          scrollShow: true, //新增是否显示滚动条，默认false
          scrollAlign: 'left', //滚动条初始位置
          scrollBackgroundColor: '#F7F7FF', //默认为 #EFEBEF
          scrollColor: '#DEE7F7' //默认为 #A6A6A6}
        },
        // y轴显示的内容
        yAxis: {
          title: 'df',
          gridType: 'dash',
          gridColor: '#eee',
          dashLength: 2,
          splitNumber: 6,
          min: 0,
          max: 500,
          format: val => {
            return val.toFixed(0) + 'KW';
          }
        },
        extra: {
          area: {
            type: 'curve',
            opacity: 0.5,
            addLine: true,
            width: 2,
            gradient: true
          }
        }
      },
      chartDataGL: {}, //功率
      optsGL: {
        color: ['#1890FF', '#91CB74'],
        padding: [0, 10, 10, 10],
        legend: {
          show: true,
          position: 'top',
          float: 'right',
          itemGap: 10,
          padding: 5,
          lineHeight: 0
        }, //小标题
        dataLabel: false, //点位上的数据
        enableScroll: true, //开启图表拖拽功能
        // x轴显示的内容
        xAxis: {
          type: 'grid',
          gridColor: '#eee',
          gridType: 'soild',
          disableGrid: true,
          dashLength: 8,
          boundaryGap: 'false', //两端不留白配置,center居中
          itemCount: 5, //x轴单屏显示数据的数量，默认为5个
          scrollShow: true, //新增是否显示滚动条，默认false
          scrollAlign: 'left', //滚动条初始位置
          scrollBackgroundColor: '#F7F7FF', //默认为 #EFEBEF
          scrollColor: '#DEE7F7' //默认为 #A6A6A6}
        },
        // y轴显示的内容
        yAxis: {
          title: 'df',
          gridType: 'dash',
          gridColor: '#eee',
          dashLength: 2,
          splitNumber: 6,
          min: -5,
          max: 40,
          format: val => {
            return val.toFixed(0) + 'KW';
          }
        },
        extra: {
          area: {
            type: 'curve',
            opacity: 0.5,
            addLine: true,
            width: 2,
            gradient: true
          }
        }
      },
      chartDataDL: {}, //电流
      optsDL: {
        color: ['#73C0DE', '#9A60B4'],
        padding: [0, 10, 10, 10],
        legend: {
          show: true,
          position: 'top',
          float: 'right',
          itemGap: 10,
          padding: 5,
          lineHeight: 0
        }, //小标题
        dataLabel: false, //点位上的数据
        enableScroll: true, //开启图表拖拽功能
        // x轴显示的内容
        xAxis: {
          type: 'grid',
          gridColor: '#eee',
          gridType: 'soild',
          disableGrid: true,
          dashLength: 8,
          boundaryGap: 'false', //两端不留白配置,center居中
          itemCount: 5, //x轴单屏显示数据的数量，默认为5个
          scrollShow: true, //新增是否显示滚动条，默认false
          scrollAlign: 'left', //滚动条初始位置
          scrollBackgroundColor: '#F7F7FF', //默认为 #EFEBEF
          scrollColor: '#DEE7F7' //默认为 #A6A6A6}
        },
        // y轴显示的内容
        yAxis: {
          title: 'df',
          gridType: 'dash',
          gridColor: '#eee',
          dashLength: 2,
          splitNumber: 6,
          min: 0,
          max: 100,
          format: val => {
            return val.toFixed(0) + 'KW';
          }
        },
        extra: {
          area: {
            type: 'curve',
            opacity: 0.5,
            addLine: true,
            width: 2,
            gradient: true
          }
        }
      },
      scaleCardShow: false
    };
  },
  filters: {
    chargeStatusText(value) {
      return chargeStatusDict[value] || '--'
    }
  },
  onLoad({ connectorNum, orderId }) {
    this.connectorNum = connectorNum;
    this.orderId = orderId;
  },
  onShow() {
    this.findMemberByWallet();
    this.pollOrder();
  },
  onUnload() {
    this.pollTimer && clearTimeout(this.pollTimer);
  },
  methods: {
    pollOrder() {
      this.pollTimer = setTimeout(() => {
        this.findChargeOrder()
          .then(() => {
            this.pollOrder();
          })
        this.getServerData();
      }, 10000);
    },
    findMemberByWallet() {
      findMemberByWallet().then(({ result }) => {
        this.balances = result.balances || 0;
      });
    },
    findChargeOrder() {
      return findChargeOrder({
        orderId: this.orderId
      }).then(({ result }) => {
        this.dataInfo = result || {};
        if (!this.scaleCardShow) {
          this.scaleCardShow = true
          this.findOrderByMemberId();
        }
        this.loadshwo = false;
      });
    },
    findOrderByMemberId() {
      findOrderByMemberId({
        findType: 1, // 0:全部订单，1:充电中和等待充电
        pageSize: 10,
        pageNo: 1
      }).then(({ result }) => {
        this.orderList = result.orderInfo?.records || [];
      });
    },
    stopCharge() {
      stopCharge({
        orderId: this.orderId
      }).then(() => {
        this.$tip.success('充电已停止');
      });
    },
    popchose(data) {
      this.orderId = data.id
      this.findChargeOrder();
      this.getServerData();
      this.$refs.pop.close();
    },
    // 切换显示内容
    changeShowType(type) {
      this.showType = type;
    },
    // 数据图表
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        let resDY = {
          categories: ['16:50', '16:51', '16:52', '16:53', '16:54', '16:55'],
          series: [
            {
              name: '输出电压',
              data: [100, 233, 436, 312, 423, 221]
            },
            {
              name: '需求电压',
              data: [102, 314, 217, 311, 378, 424]
            }
          ]
        };
        let resGL = {
          categories: ['16:50', '16:51', '16:52', '16:53', '16:54', '16:55'],
          series: [
            {
              name: '输出功率',
              data: [1, 3, 6, 12, 23, 21]
            },
            {
              name: '需求功率',
              data: [2, 4, 7, 11, 8, 24]
            }
          ]
        };
        let resDL = {
          categories: ['16:50', '16:51', '16:52', '16:53', '16:54', '16:55'],
          series: [
            {
              name: '输出电流',
              data: [31, 63, 86, 42, 63, 41]
            },
            {
              name: '需求电流',
              data: [42, 64, 57, 61, 58, 44]
            }
          ]
        };
        this.chartDataDY = JSON.parse(JSON.stringify(resDY));
        this.chartDataGL = JSON.parse(JSON.stringify(resGL));
        this.chartDataDL = JSON.parse(JSON.stringify(resDL));
      }, 500);
    },
    // 充电汽车切换-弹框
    watchOpen() {},
    watchClose() {},
    // 前往充值
    goCashin() {
      uni.navigateTo({
        url: '/pages/Wallet/Cashin'
      });
    },
    // 前往故障报修
    goFixsent() {
      uni.navigateTo({
        url: '/pages/Mine/Fixsent'
      });
    },
    // 前往联系客服
    goContact() {
      uni.navigateTo({
        url: '/pages/Mine/Contact'
      });
    },
    // 禁止外壳页面手指上下滑动
    moveHandle() {
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  height: auto;
}
// 充电汽车切换
.carul {
  margin: 0 auto;
  padding: 0rpx 0 40rpx;
  font-size: 34rpx;
  color: #333;
  .carimg {
    width: 50rpx;
    height: 50rpx;
    margin-right: 10rpx;
  }
  .arrimg {
    width: 30rpx;
    height: 30rpx;
    margin-left: 10rpx;
  }
}
// 充电汽车切换 弹框
.tcwarp {
  background: #fff;
  padding-top: 40rpx;
  .caritem {
    width: 94%;
    max-height: 60vh;
    margin: 0 auto;
    font-size: 30rpx;
    padding: 30rpx 0;
    color: #333;
    font-weight: 500;
    line-height: 1.6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    image {
      width: 80rpx;
      height: 80rpx;
      margin-right: 20rpx;
    }
    .carcode {
      font-size: 26rpx;
      color: #888;
      font-weight: normal;
    }
    .carstatu {
      color: #33b048;
      font-size: 26rpx;
    }
  }
}
// 汽车图片
.carshow {
  // width: 80%;
  // margin: -250rpx auto 0;
  width: 60%;
  margin: -250rpx auto -30rpx;
  position: relative;
  z-index: 2;
  image {
    width: 100%;
    height: auto;
    transform: scale(0.5);
    transition: transform 2s;
  }
  .scale-car {
    transform: scale(1.3);
  }
}
// 充电计时
.Timesul {
  display: flex;
  flex-direction: column;
  margin: 20rpx auto 60rpx;
  .cTimes {
    margin: 20rpx auto 0;
  }
  .sTimes {
    color: #999;
    font-size: 26rpx;
    margin: 0 auto 0rpx;
  }
}
// 费用
.cFeiy {
  position: relative;
  width: 94%;
  margin: 0rpx auto 30rpx;
  padding: 30rpx 0;
  background: #fff;
  box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.05);
  border-radius: 14rpx;
  font-size: 26rpx;
  color: #999;
  line-height: 1.4;
  text-align: center;
  view {
    width: 50%;
    border-right: 1px solid #ededed;
    display: flex;
    align-items: center;
    flex-direction: column;
    .wonum {
      color: #333;
      font-size: 50rpx;
      font-weight: bold;
    }
  }
  view:last-child {
    border: none;
  }
  .cmin {
    display: inline-block;
    font-size: 22rpx;
    color: #fff;
    background: #ff7134;
    padding: 4rpx 14rpx;
    border-radius: 4rpx;
    position: absolute;
    right: 30rpx;
    top: 30rpx;
    z-index: 1;
  }
}
// 数据
.cShu {
  position: relative;
  width: 94%;
  margin: 0rpx auto 30rpx;
  padding: 30rpx 0;
  background: #fff;
  box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.05);
  border-radius: 14rpx;
  font-size: 26rpx;
  color: #999;
  line-height: 1.4;
  text-align: center;
  view {
    width: 33.33%;
    border-right: 1px solid #ededed;
    display: flex;
    align-items: center;
    flex-direction: column;
    .wonum {
      color: #333;
      font-size: 50rpx;
      font-weight: 500;
    }
  }
  view:last-child {
    border: none;
  }
  .snum {
    font-size: 24rpx;
  }
}
// 终端信息
.cDuan {
  padding: 30rpx 0;
  width: 94%;
  margin: 0 auto;
  font-size: 28rpx;
  color: #888;
  .cdcopy {
    color: #33b048;
    margin-left: 20rpx;
  }
}
// 数据图表chart
.dylist {
  width: 94%;
  margin: 0 auto;
  .leader {
    width: 100%;
    height: 91rpx;
    border-top: 1px solid #eee;
    .ltitle {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > view {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 85rpx;
        background: #fff;
        border-bottom: 6rpx solid #fff;
        color: #888;
        font-size: 28rpx;
      }
      .activeContentA {
        font-size: 30rpx;
        font-weight: 500;
        background: #fff;
        border-bottom: 6rpx solid #33b048;
        color: #33b048;
      }
    }
  }
}
.uchart {
  width: 100%;
  padding: 100rpx 0 30rpx;
  height: auto;
  position: relative;
  .uctitle {
    position: absolute;
    left: 0;
    top: 30rpx;
    z-index: 1;
    font-size: 24rpx;
    text-align: center;
    color: #aaa;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    view {
      margin-right: 30rpx;
      display: flex;
      flex-direction: column;
      line-height: 1.4;

      text:nth-child(2) {
        font-size: 28rpx;
        color: #333;
        font-weight: 500;
      }
    }
  }
}
// 底部按钮
.sitefoot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: calc(112rpx + constant(safe-area-inset-bottom) / 2);
  height: calc(112rpx + env(safe-area-inset-bottom) / 2);
  padding: 20rpx;
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom) / 2);
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom) / 2);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 5;
  background: #fff;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.05);
  font-size: 26rpx;
  color: #333;

  .sfico {
    width: 20%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-right: 2%;
    image {
      width: 50rpx;
      height: 50rpx;
    }
  }
  button.sfbt,
  uni-button.sfbt {
    width: 56%;
    height: 82rpx;
    line-height: 80rpx;
    font-size: 34rpx;
    background: #33b048;
    color: #fff;
    font-weight: 500;
    border: 1px solid #33b048;
    border-radius: 100rpx;
  }
}
//clear
.clearw {
  height: 180rpx;
  display: block;
}
// 加载动画
.loaditem {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 40%;
  z-index: 101;
  view {
    color: #222;
    font-size: 28rpx;
    text-align: center;
    margin-top: 40rpx;
  }
  .loading-image {
    width: 100rpx;
    height: 100rpx;
  }
}
</style>
