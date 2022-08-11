<template>
  <view class="example">
    <z-paging
      v-model="terminalList"
      ref="paging"
      :fixed="true"
      @query="queryList"
      @onRefresh="onRefresh"
    >
      <view
        v-for="(item, index) in terminalList"
        :key="index"
        class="ter_ul"
        :class="type"
      >
        <view
          v-if="item.connectorStatus === 1"
          class="ter_go"
          @click="noteshow(item)"
        >
          去充电
        </view>
        <view class="ter_cmd">
          <cCircle
            :size="70"
            :percent="socPercent(item)"
            :animation="true"
            :animationSpeed="5"
            :circleColor="getCircleColor(item)"
          >
            <span slot="content" class="cmdtx">
              <!-- <text>空闲</text> -->
              <!-- <text>已插枪</text> -->
              <!-- <text>故障</text> -->
              <template v-if="item.connectorStatus === 3">
                <text>{{ item.soc }}%</text>
                <text>充电中</text>
              </template>
              <text v-else>
                {{ item.connectorStatus | connectorStatusText }}
              </text>
            </span>
          </cCircle>
          <view class="needt">还需00:30</view>
          <!--  -->
        </view>
        <view class="ter_in">
          <view>
            <text>桩编号</text>
            <text>{{ item.connectorNum }}</text>
            <image
              src="/static/image/ico_10.png"
              mode="widthFix"
              @click="setClipboardData(item)"
            ></image>
          </view>
          <view>
            <text>电流</text>
            <text>最大{{ item.currentUpperLimits }}A</text>
          </view>
          <view>
            <text>电压</text>
            <text>50V-{{ item.voltageUpperLimits }}V</text>
          </view>
          <view>
            <text>最高SOC</text>
            <text>98%</text>
          </view>
          <view class="ter_nr">
            <text>{{ item.equipmentType | electricityType }}</text>
            <text>| 最大功率{{ item.powerUpperLimits }}KW</text>
            <text v-if="item.nationalStandard">
              | {{ item.nationalStandard }}
            </text>
          </view>
        </view>
      </view>
    </z-paging>
    <!-- 去充电时显示确认弹框 -->
    <z-modal
      :show="modalShow"
      :btnGroup="btnGroup"
      :contentType="1"
      :contentText="contentText"
      :titleText="titleText"
      @sure="sure"
      @cancle="cancle"
    ></z-modal>
  </view>
</template>

<script>
import { findConnectorBySiteId } from '@/api/site.js';
import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue'; //加载
import cCircle from '@/components/cCircle/cCircle.vue'; //进度环
import zModal from '@/components/z-modal/z-modal.vue'; //modal弹框

const circleColor = {
  fast: {
    1: '#f6d1bf',
    2: '#f49663',
    3: '#f49663',
    4: '#f49663',
    5: '#e9e9e9'
  },
  slow: {
    1: '#d7e3fb',
    2: '#86a5e9',
    3: '#86a5e9',
    4: '#86a5e9',
    5: '#e9e9e9'
  }
};
const equipmentAction = {
  fast: 1,
  slow: 2
};
const equipmentType = {
  1: '直流快充',
  2: '交流慢充'
};
const connectorStatus = {
  1: '空闲',
  2: '已插枪',
  3: '充电中',
  4: '充电结束',
  5: '故障'
};
export default {
  components: {
    hrPullLoad,
    cCircle,
    zModal
  },
  props: {
    type: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['fast', 'slow'].includes(value);
      },
      default: 'fast'
    },
    siteId: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      terminalList: [],
      currentPage: 1,
      activeTerminal: null,
      // 确认弹框
      modalShow: false,
      btnGroup: [
        {
          text: '取消',
          color: '#999',
          bgColor: '#dadada',
          width: '45%',
          height: '80rpx',
          shape: 'fillet',
          eventName: 'cancle'
        },
        {
          text: '确认',
          color: '#FFFFFF',
          bgColor: '#33b048',
          width: '45%',
          height: '80rpx',
          shape: 'fillet',
          eventName: 'sure'
        }
      ],
      titleText: ''
    };
  },
  filters: {
    electricityType(key) {
      return equipmentType[key];
    },
    connectorStatusText(key) {
      return connectorStatus[key];
    }
  },
  computed: {
    contentText() {
      return `请确保您的车和${this.name}站的终端（${
        this.activeTerminal?.connectorNum
      }）已连接，点击确认，进入支付选择页面`;
    }
  },
  methods: {
    queryList(pageNo, pageSize) {
      findConnectorBySiteId({
        siteId: this.siteId,
        equipmentAction: equipmentAction[this.type],
        pageNo,
        pageSize
      }).then(({ result }) => {
        const records = result?.connector?.records || [];
        if (records.length > 0) {
          this.$refs.paging.complete(records);
        } else {
          this.$refs.paging.complete([]);
        }
      });
    },
    // 空闲时：percent=100；已插枪：percent=100；充电中：percent=实时；故障：percent=0；
    socPercent(data) {
      // connectorStatus: 1：空闲；2：准备充电；3：充电中；4 ：充电结束；5： 故障
      const { soc, connectorStatus } = data;
      const percent = {
        1: 100,
        2: 100,
        3: soc,
        4: soc,
        5: 0
      };
      return percent[connectorStatus] || 0;
    },
    // 快： 空闲时：#f6d1bf；已插枪：#f49663；充电中：#f49663；故障：#e9e9e9；
    // 慢： 空闲时：#d7e3fb；已插枪：#86a5e9；充电中：#86a5e9；故障：#e9e9e9；
    getCircleColor(data) {
      const { soc, connectorStatus } = data;
      return circleColor[this.type][connectorStatus] || 0;
    },
    setClipboardData({ connectorNum }) {
      uni.setClipboardData({
        data: connectorNum
      });
    },
    onRefresh() {
      this.$emit('refresh')
    },
    //确认弹框
    noteshow(data) {
      const { connectorNum } = data;
      this.activeTerminal = data;
      this.modalShow = !this.modalShow;
    },
    sure(e) {
      uni.navigateTo({
        url: `/pages/Charge/Paychos?connectorNum=${
          this.activeTerminal.connectorNum
        }`
      });
    },
    cancle(e) {
      this.modalShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$fastColor: #ff7134;
$slowColor: #5b84ed;
.example {
  width: 100%;
  height: 100%;
}
.ter_ul {
  position: relative;
  width: 94%;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
  border-radius: 14rpx;
  font-size: 26rpx;
  padding: 30rpx 30rpx 30rpx;
  margin: 30rpx auto 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  line-height: 2;
  .ter_go {
    background: #ff7134;
    color: #fff;
    font-size: 24rpx;
    padding: 0rpx 16rpx;
    border-radius: 100rpx;
    position: absolute;
    right: 30rpx;
    bottom: 120rpx;
    z-index: 8;
  }
}
.ter_cmd {
  width: 160rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .cmdtx {
    position: absolute;
    width: 140rpx;
    margin-top: -15rpx;
    // height: 160rpx;
    left: -10rpx;
    // top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 26rpx;
    color: #555;
    line-height: 1.4;
  }
  .needt {
    line-height: 1;
    margin-left: -10rpx;
    color: #777;
  }
}

.ter_in {
  width: calc(100% - 160rpx);
  padding-left: 20rpx;
  view {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #555;
    font-weight: 500;

    text:nth-child(1) {
      width: 30%;
      color: #888;
      font-weight: normal;
    }
    image {
      width: 30rpx;
      height: 30rpx;
      margin-left: 16rpx;
    }
  }
  .ter_nr {
    color: #888;
    font-weight: normal;
    text {
      margin-right: 10rpx;
    }
    text:first-child {
      width: auto;
      color: #ff7134;
      font-weight: 500;
    }
  }
}
.fast {
  .ter_go {
    background: $fastColor;
  }
  .ter_nr {
    text:first-child {
      color: $fastColor;
    }
  }
}
.slow {
  .ter_go {
    background: $slowColor;
  }
  .ter_nr {
    text:first-child {
      color: $slowColor;
    }
  }
}
// 暂无数据
.nodata {
  display: block;
  font-size: 28rpx;
  color: #999;
  line-height: 200rpx;
  text-align: center;
}
</style>
