<template>
  <view class="container">
    <view class="uchart">
      <view class="uctitle">功率(kw)</view>
      <qiun-data-charts
        type="area"
        :opts="optsA"
        :ontouch="true"
        :chartData="chartDataA"
      />
    </view>
    <view class="uchart">
      <view class="uctitle">电压(V)</view>
      <qiun-data-charts
        type="area"
        :opts="optsB"
        :ontouch="true"
        :chartData="chartDataB"
      />
    </view>
    <view class="uchart">
      <view class="uctitle">电流(A)</view>
      <qiun-data-charts
        type="area"
        :opts="optsC"
        :ontouch="true"
        :chartData="chartDataC"
      />
    </view>
  </view>
</template>

<script>
import { findChargeOrder } from '@/api/member.js';
export default {
  components: {},
  data() {
    return {
      chartDataA: {},
      chartDataB: {},
      chartDataC: {},

      optsA: {
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
          scrollColor: '#DEE7F7', //默认为 #A6A6A6}
          format: 'xAxisTime'
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
      optsB: {
        color: ['#FAC858', '#EE6666'],
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
          scrollColor: '#DEE7F7', //默认为 #A6A6A6}
          format: 'xAxisTime'
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
      optsC: {
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
          scrollColor: '#DEE7F7', //默认为 #A6A6A6}
          format: 'xAxisTime'
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
      }
    };
  },
  onLoad({ orderId }) {
    this.orderId = orderId;
    this.findChargeOrder();
  },
  methods: {
    findChargeOrder() {
      findChargeOrder({
        orderId: this.orderId
      }).then(({ result }) => {
        const { electricEnergyTrend } = result;
        this.setChartsData(electricEnergyTrend);
      });
    },
    // 数据图表
    setChartsData(data) {
      const categories = [];
      const outputVoltageArray = [];
      const outputElectricityArray = [];
      const outputPowerArray = [];
      data.forEach(item => {
        const { outputVoltage, outputElectricity, outputPower, ts } = item;
        outputVoltageArray.push(outputVoltage || 0);
        outputElectricityArray.push(outputElectricity || 0);
        outputPowerArray.push(outputPower || 0);
        categories.push(ts);
      });
      let resDY = {
        categories,
        series: [
          {
            name: '输出电压',
            data: outputVoltageArray
          }
        ]
      };
      let resGL = {
        categories,
        series: [
          {
            name: '输出功率',
            data: outputPowerArray
          }
        ]
      };
      let resDL = {
        categories,
        series: [
          {
            name: '输出电流',
            data: outputElectricityArray
          }
        ]
      };
      this.chartDataB = JSON.parse(JSON.stringify(resDY));
      this.chartDataA = JSON.parse(JSON.stringify(resGL));
      this.chartDataC = JSON.parse(JSON.stringify(resDL));
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background: #fff;
  overflow-x: hidden;
}
.uchart {
  width: 100%;
  height: auto;
  margin-bottom: 30rpx;
  .uctitle {
    padding: 30rpx 0 0;
    font-size: 32rpx;
    text-align: center;
    color: #555;
    font-weight: 500;
  }
}
</style>
