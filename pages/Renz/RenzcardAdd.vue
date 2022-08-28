<template>
  <view class="container">
    <view class="rztitle">请输入您的银行卡信息</view>
    <view class="rzul">
      <view class="rzli">
        <text>姓名</text>
        <input :value="userInfo.trueName" :disabled="true" value="姓名" />
      </view>
      <view class="rzli">
        <text>身份证号</text>
        <input :value="userInfo.idCardNo" :disabled="true" />
      </view>
      <view class="rzli">
        <text>银行卡号</text>
        <input v-model="cardNo" placeholder="输入您的银行账号" />
      </view>
      <!-- <view class="rzli">
        <text>卡类型</text>
        <text>工商银行</text>
      </view> -->
      <!-- <view class="rzli">
				<text>手机号码</text>
				<input type="number" placeholder="输入银行预留手机号" />
			</view> -->
      <!-- <view class="rzli2">
				<text>验证码</text>
				<input type="number" placeholder="输入验证码" />
				<button class="yzmi">获取验证码</button>
			</view> -->
    </view>
    <view class="agrcd disflex4">
      <checkbox-group @change="changeCheck">
        <label>
          <checkbox :checked="isCheck" class="checkbox" style="transform:scale(0.7)" />
          <text>我已阅读并同意签署</text>
          <text>《逸充新能源支付协议》</text>
        </label>
      </checkbox-group>
    </view>
    <button class="surerz" :disabled="disabled" :loading="disabled" @click="handleSubmit">立即绑定</button>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import { addMemberBank } from '@/api/member.js';
import { validateForm, throttle } from '@/common/util.js';

export default {
  data() {
    return {
      bankName: '',
      cardNo: '',
      isCheck: true,
      disabled: false,
      handleSubmit: throttle(this.submit)
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  onLoad() {
    this.$store.dispatch('getUserInfo');
  },
  methods: {
    changeCheck({ detail }) {
      this.isCheck = !!detail.value.length;
    },
    submit() {
      if (!this.isCheck) {
        this.$tip.toast('请阅读并同意支付协议');
        return;
      }
      const validator = [
        // {
        //   value: this.bankName,
        //   message: '请输入'
        // }
        {
          value: this.cardNo,
          message: '请输入银行卡号'
        }
      ];
      validateForm(validator).then(() => {
        this.addMemberBank();
      });
    },
    addMemberBank() {
      this.disabled = true;
      addMemberBank({
        bankHolder: this.userInfo.trueName,
        bankName: this.bankName,
        cardNo: this.cardNo
      })
        .then(() => {
          this.$tip.success('添加成功').then(() => {
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
    height: 30rpx;
    line-height: 30rpx;
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
    height: 30rpx;
    line-height: 30rpx;
    text-align: right;
    font-size: 30rpx;
  }
  .yzmi {
    font-size: 26rpx;
    text-align: center;
    padding: 20rpx 20rpx;
    border: 1px solid #fe5f5e;
    color: #fe5f5e;
    background: none;
    border-radius: 10rpx;
    line-height: 1;
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
  &[disabled] {
    opacity: 0.6;
  }
}
</style>
