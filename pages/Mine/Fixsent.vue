<template>
  <view class="container">
    <!-- 联系人 -->
    <view class="fixA disflex4">
      <text>联系人手机号</text>
      <input v-model="mobile" type="number" disabled maxlength="11" />
    </view>
    <!-- 关联终端 -->
    <view class="fixB">
      <view class="fixBtitle">关联终端（任选其一）</view>
      <view class="fixitem">
        <view>
          <view>扫描终端二维码</view>
          <view class="fixsm">{{ terminationID || '终端ID' }}</view>
        </view>
        <view class="fixcb" @click="handleScan">扫码关联</view>
      </view>
      <view class="fixitem">
        <view>
          <view>选择近期订单</view>
          <view class="fixsm">{{ terminationID || '订单ID' }}</view>
        </view>
        <view class="fixcb" @click="goSelectOrder">选择订单</view>
      </view>
    </view>
    <!--异常原因 -->
    <view class="fixB">
      <view class="fixBtitle">选择异常原因</view>
      <checkbox-group class="ycreson" @change="checkboxChange">
        <label
          v-for="item in repairReasonOptions"
          :key="item.value"
          class="yclabel"
        >
          <checkbox
            :checked="item.checked"
            :value="item.value"
            style="transform:scale(0.7)"
          />
          <text>{{ item.name }}</text>
        </label>
      </checkbox-group>
      <!-- auto-height="true" -->
      <textarea
        v-model="repairDesc"
        placeholder="补充更多信息,以便我们诊断问题"
        class="ycbuc"
        maxlength="100"
      />
    </view>
    <view class="clearw"></view>
    <view class="wfoot">
      <button class="combutton" @click="submit">提交</button>
    </view>
  </view>
</template>

<script>
import { submitMemberRepair } from '@/api/member.js';
import { validateForm } from '@/common/util.js';
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      mobile: '',
      repairReasons: [],
      repairDesc: '',
      terminationID: '',
      repairType: '',
      // 异常原因
      repairReasonOptions: [
        {
          name: '位置描述不准确',
          value: 1
        },
        {
          name: '停车费信息不属实',
          value: 2
        },
        {
          name: '二维码无法识别',
          value: 3
        },
        {
          name: '无法拔枪',
          value: 4
        },
        {
          name: '电源指示灯不亮',
          value: 5
        },
        {
          name: '故障灯常亮',
          value: 6
        },
        {
          name: '充电异常断电',
          value: 7
        },
        {
          name: '枪头损坏',
          value: 8
        },
        {
          name: '程序无法启动',
          value: 9
        },
        {
          name: '程序无法停止',
          value: 10
        },
        {
          name: '其他',
          value: 11
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  onLoad() {
    uni.$on('selectOrder', this.handleSelectOrder);
    console.log(this.userInfo);
    this.mobile = this.userInfo.mobileNo
  },
  onUnload() {
    uni.$off('selectOrder', this.handleSelectOrder);
  },
  methods: {
    // 异常原因多选
    checkboxChange(e) {
      console.log(e.detail.value);
      this.repairReasons = e.detail.value;
    },
    // 前往我的订单 - 选择
    goSelectOrder() {
      uni.navigateTo({
        url: '/pages/Order/Orderlist?type=select'
      });
    },
    handleSelectOrder({ id }) {
      this.repairType = '2';
      this.terminationID = id;
    },
    handleScan() {
      uni.scanCode({
        success: res => {
          console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
          this.repairType = '1';
          this.terminationID = res.result;
        }
      });
    },
    submit() {
      const requiredArray = [
        {
          value: this.mobile,
          message: '请输入联系人手机号'
        },
        {
          value: this.terminationID,
          message: '请关联终端'
        },
        {
          value: this.repairReasons,
          message: '请选择异常原因'
        }
      ];
      validateForm(requiredArray).then(() => {
        this.submitMemberRepair();
      });
    },
    submitMemberRepair() {
      const params = {
        mobile: this.mobile,
        repairReasons: this.repairReasons.join(','),
        repairDesc: this.repairDesc,
        repairType: this.repairType
      };
      submitMemberRepair(params).then(() => {
        this.$tip.success('提交成功');
        uni.navigateBack({
          delta: 1
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30rpx;
}
// 联系人
.fixA {
  position: relative;
  width: 94%;
  margin: 0 auto 30rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  color: #555;
  line-height: 1.6;
  font-size: 30rpx;
  padding: 20rpx 30rpx;
  input,
  uni-input {
    width: 60%;
    margin-left: 30rpx;
  }
}
// 关联终端
.fixB {
  width: 94%;
  margin: 0 auto 30rpx;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.02);
  border-radius: 14rpx;
  color: #555;
  line-height: 1.6;
  font-size: 30rpx;
  padding: 0rpx 30rpx 30rpx;
  .fixBtitle {
    font-size: 32rpx;
    font-weight: 550;
    color: #333;
    padding: 30rpx 0 10rpx;
  }
  .fixitem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28rpx 0;
    border-bottom: 1px solid #eee;
    .fixcb {
      height: 60rpx;
      padding: 10rpx 20rpx;
      color: #fff;
      font-size: 26rpx;
      line-height: 40rpx;
      background: #33b048;
      border-radius: 100rpx;
    }
    .fixsm {
      font-size: 24rpx;
      color: #999;
    }
  }
  // 异常原因
  .ycreson {
    width: 100%;
    padding: 30rpx 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 28rpx;
    .yclabel {
      width: 50%;
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
  .ycbuc {
    width: 100%;
    font-size: 28rpx;
    border-radius: 14rpx;
    background: #f1f1f1;
    padding: 30rpx;
    margin: 0rpx 0;
  }
}
// 底部按钮
.wfoot {
  width: 100%;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.05);
  background: #fff;
  padding: 30rpx 3%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.clearw {
  height: 180rpx;
  display: block;
}
</style>
