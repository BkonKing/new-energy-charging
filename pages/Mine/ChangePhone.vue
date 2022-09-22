<template>
  <view class="container">
    <view class="rztitle">请输入您的要更换的手机号码</view>
    <view class="rzul">
      <view class="rzli">
        <text>手机号码</text>
        <input
          v-model="phoneNo"
          type="number"
          maxlength="11"
          placeholder="输入手机号"
        />
      </view>
      <view class="rzli2">
        <text>验证码</text>
        <input v-model="code" type="number" placeholder="输入验证码" />
        <!-- hy:倒计时样式加载 disable -->
        <button
          class="yzmi"
          :class="{ disable: smsDisabled }"
          :disabled="smsDisabled"
          @click="handleSend"
        >
          <template v-if="smsDisabled">{{seconds}}S</template>
          <template v-else>获取验证码</template>
        </button>
      </view>
    </view>
    <!-- <view class="agrcd disflex4">
      <checkbox-group @change="changeCheck">
        <label>
          <checkbox :checked="isCheck" class="checkbox" style="transform:scale(0.7)" />
          <text>我已阅读并同意签署</text>
          <text>《逸充新能源使用协议》</text>
        </label>
      </checkbox-group>
    </view> -->
    <button
      class="surerz"
      :disabled="disabled"
      :loading="disabled"
      @click="handleSubmit"
    >
      确定更改
    </button>
  </view>
</template>

<script>
import { sendSms, updatePhone } from '@/api/member.js';
import { validateForm, throttle } from '@/common/util.js';

export default {
  data() {
    return {
      phoneNo: '',
      code: '',
      timer: null,
      seconds: 60,
      isCheck: false,
      smsDisabled: false,
      disabled: false,
      handleSend: throttle(this.sendSms),
      handleSubmit: throttle(this.submit),
    };
  },
  onLoad() {},
  onUnload() {
    this.timer && clearTimeout(this.timer)
  },
  methods: {
    changeCheck({ detail }) {
      this.isCheck = !!detail.value.length;
    },
    countDown() {
      if (this.seconds === 0) {
        this.smsDisabled = false;
        return
      }
      this.seconds--
      this.timer = setTimeout(() => {
      	this.countDown()
      }, 1000)
    },
    sendSms() {
      if (this.phoneNo.length !== 11) {
        this.$tip.toast('请输入正确的手机号');
        return;
      }
      sendSms({
        phoneNo: this.phoneNo
      }).then(() => {
        this.smsDisabled = true;
        this.countDown()
      });
    },
    submit() {
      // if (!this.isCheck) {
      //   this.$tip.toast('请阅读并同意使用协议');
      //   return;
      // }
      const validator = [
        {
          value: this.phoneNo,
          message: '请输入手机号'
        },
        {
          value: this.code,
          message: '请输入验证码'
        }
      ];
      validateForm(validator).then(() => {
        this.updatePhone();
      });
    },
    updatePhone() {
      this.disabled = true;
      updatePhone({
        phoneNo: this.phoneNo,
        code: this.code
      })
        .then(() => {
          this.$tip.success('更换成功').then(() => {
            uni.navigateBack({
              delta: 1
            });
          });
        })
        .finally(() => {
          this.disabled = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
}
.rztitle {
  background: #f1f1f1;
  width: 100%;
  padding: 20rpx 26rpx;
  font-size: 28rpx;
  color: #555;
}
.rzul {
  width: 100%;
  padding: 0 26rpx;
  font-size: 30rpx;
  color: #888;
  line-height: 2.2;
}
.rzli {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 0;
  border-bottom: 1px solid #ededed;

  text {
    width: 30%;
  }
  text:last-child {
    color: #333;
    text-align: right;
  }
  input,
  uni-input {
    color: #333;
    width: 70%;
    text-align: right;
    font-size: 30rpx;
  }
}
.rzli2 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 0;
  border-bottom: 1px solid #ededed;

  input,
  uni-input {
    color: #333;
    width: 40%;
    text-align: right;
    font-size: 30rpx;
  }
  .yzmi {
    width: 174rpx;
    padding: 20rpx;
    font-size: 26rpx;
    text-align: center;
    border: 1px solid #fe5f5e;
    color: #fe5f5e;
    background: none;
    border-radius: 10rpx;
    line-height: 1;
  }
  .disable {
    border: 1px solid #ccc;
    background: #ddd;
    color: #999;
  }
}
//协议
.agrcd {
  width: 100%;
  padding: 0 26rpx;
  font-size: 28rpx;
  color: #888;
  margin: 50rpx 0;
  text:last-child {
    color: #33b048;
    margin-left: 10rpx;
  }
  .checkbox {
    margin-right: 0px;
  }
}
button.surerz,
uni-button.surerz {
  position: fixed;
  left: 3%;
  bottom: 60rpx;
  z-index: 5;
  line-height: 90rpx;
  font-size: 34rpx;
  width: 94%;
  background: #33b048;
  color: #fff;
  font-weight: 500;
  border: 1px solid #33b048;
  box-shadow: 0 0 20rpx 5rpx rgba(45, 255, 80, 0.2);
  border-radius: 100rpx;
  margin: 0 auto;
}
</style>
