<template>
  <view class="container">
    <view class="botitle">发票详情</view>
    <view class="pd24">
      <view class="boitem">
        <text>发票金额</text>
        <text class="boprice">{{ amount }}元</text>
      </view>
      <view class="boitem">
        <text>发票类型</text>
        <picker
          range-key="name"
          :value="invoiceCategory"
          :range="invoiceCategorys"
          :disabled="true"
          @change="bindPickerChange"
        >
          <view class="uni-input">
            {{ invoiceCategorys[invoiceCategory].name }}
          </view>
        </picker>
      </view>
      <view class="boitem">
        <text>抬头类型</text>
        <radio-group class="ckgroup" @change="radioChange">
          <label>
            <radio
              value="0"
              :checked="isEnterpriseType"
              :disabled="isSpecialInvoice"
              style="transform:scale(0.7)"
            />
            企业单位
          </label>
          <label>
            <radio
              value="1"
              :checked="!isEnterpriseType"
              :disabled="isSpecialInvoice"
              style="transform:scale(0.7)"
            />
            个人/非企业单位
          </label>
        </radio-group>
      </view>
      <view class="boitem">
        <text>
          发票抬头
          <text class="required-text">*</text>
        </text>
        <input v-model="invoiceTitle" placeholder="输入抬头名称" />
      </view>
      <template v-if="isEnterpriseType">
        <view class="boitem">
          <text>
            纳税号码
            <text class="required-text">*</text>
          </text>
          <input v-model="invoiceTaxNo" placeholder="输入纳税号码" />
        </view>
        <view class="boitem">
          <text>
            电话号码
            <text v-if="isSpecialInvoice" class="required-text">*</text>
          </text>
          <input
            v-model="vatTelphone"
            type="number"
            placeholder="输入电话号码"
          />
        </view>
        <view class="boitem">
          <text>
            单位地址
            <text v-if="isSpecialInvoice" class="required-text">*</text>
          </text>
          <input v-model="vatCompanyAddress" placeholder="输入单位地址" />
        </view>
        <view class="boitem">
          <text>
            开户银行
            <text v-if="isSpecialInvoice" class="required-text">*</text>
          </text>
          <input v-model="vatBankName" placeholder="输入开户银行" />
        </view>
        <view class="boitem">
          <text>
            银行账号
            <text v-if="isSpecialInvoice" class="required-text">*</text>
          </text>
          <input
            v-model="vatBankAccount"
            type="number"
            placeholder="输入银行账号"
          />
        </view>
      </template>
      <view class="boitem">
        <text>备注信息</text>
        <input v-model="invoiceRemark" placeholder="输入备注信息" />
      </view>
    </view>
    <template v-if="!isSpecialInvoice">
      <view class="botitle">接收方式</view>
      <view class="pd24">
        <view class="boitem">
          <text>电子邮件</text>
          <input v-model="email" placeholder="输入电子邮件" />
        </view>
      </view>
    </template>
    <view class="clearw"></view>
    <view class="wfoot">
      <button
        class="combutton"
        :disabled="disabled"
        :loading="disabled"
        @click="handleSubmit"
      >
        提交
      </button>
    </view>
  </view>
</template>

<script>
import { saveMemberInvoice } from '@/api/member.js';
import { throttle, validateForm } from '@/common/util.js';

export default {
  data() {
    return {
      id: '',
      amount: '',
      departId: '',
      invoiceCategorys: [
        {
          name: '增值税普通发票',
          value: 0
        },
        {
          name: '增值税专用发票',
          value: 1
        },
        {
          name: '增值税电子普通发票',
          value: 2
        }
      ],
      invoiceCategory: 2,
      invoiceType: '0',
      invoiceTitle: '',
      invoiceTaxNo: '',
      vatTelphone: '',
      vatCompanyAddress: '',
      vatBankName: '',
      vatBankAccount: '',
      invoiceRemark: '',
      email: '',
      disabled: false,
      handleSubmit: throttle(this.submit)
    };
  },
  computed: {
    isEnterpriseType() {
      return this.invoiceType === '0';
    },
    isSpecialInvoice() {
      return this.invoiceCategory === 1;
    }
  },
  onLoad({ id, amount, departId, hasInvoiceCategory }) {
    this.id = id;
    this.amount = amount;
    this.departId = departId;
    this.invoiceCategory = +hasInvoiceCategory;
    if (this.invoiceCategory === 1) {
      this.invoiceType = '0';
      return;
    }
  },
  methods: {
    bindPickerChange({ detail }) {
      this.invoiceCategory = detail.value;
    },
    // 抬头类型选择
    radioChange({ detail }) {
      this.invoiceType = detail.value;
    },
    submit() {
      const validates = [
        {
          value: this.invoiceTitle,
          message: '请输入发票抬头'
        }
      ];
      if (this.isEnterpriseType) {
        validates.push({
          value: this.invoiceTaxNo,
          message: '请输入纳税号码'
        });
      }
      if (this.isSpecialInvoice) {
        validates.push({
          value: this.vatTelphone,
          message: '请输入电话号码'
        },{
          value: this.vatCompanyAddress,
          message: '请输入单位地址'
        },{
          value: this.vatBankName,
          message: '请输入开户银行'
        },{
          value: this.vatBankAccount,
          message: '请输入银行账号'
        });
      } else {
        validates.push({
          value: this.email,
          message: '请输入电子邮件'
        });
      }
      validateForm(validates).then(() => {
        this.saveMemberInvoice();
      });
    },
    saveMemberInvoice() {
      this.disabled = true;
      const params = {
        departId: this.departId,
        orderIds: this.id,
        invoiceAmount: +this.amount,
        invoiceCategory: this.invoiceCategory,
        invoiceType: this.invoiceType,
        invoiceTitle: this.invoiceTitle,
        email: this.email
      };
      if (this.isEnterpriseType) {
        Object.assign(params, {
          invoiceTaxNo: this.invoiceTaxNo,
          vatTelphone: this.vatTelphone,
          vatCompanyAddress: this.vatCompanyAddress,
          vatBankName: this.vatBankName,
          vatBankAccount: this.vatBankAccount,
          invoiceRemark: this.invoiceRemark
        });
      }
      saveMemberInvoice(params)
        .then(() => {
          this.$tip.success('提交成功');
          uni.navigateBack({
            delta: 3
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
.botitle {
  display: block;
  color: #555;
  font-size: 30rpx;
  font-weight: 500;
  padding: 0 24rpx;
  line-height: 80rpx;
}
.pd24 {
  background: #fff;
  display: block;
  padding: 0rpx 24rpx;
}
.boitem {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30rpx;
  color: #999;
  padding: 24rpx 0;
  border-bottom: 1px solid #eaeaea;
  line-height: 60rpx;

  .boprice {
    color: #555;
    font-weight: 500;
    text-align: right;
  }
  .ckgroup {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #555;
    font-weight: 500;

    label {
      margin-left: 20rpx;
    }
  }
  uni-input,
  input {
    width: 75%;
    height: 30rpx;
    color: #555;
    font-weight: 500;
    text-align: right;
    line-height: 30rpx;
    font-size: 30rpx;
  }
  .uni-input-placeholder {
    color: #999;
    font-weight: normal;
  }
}
.boitem:last-child {
  border-bottom: none;
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
.required-text {
  margin-left: 6rpx;
  font-size: 28rpx;
  color: #dd524d;
}
</style>
