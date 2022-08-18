<template>
  <view class="container">
    <bank-card
      v-for="item in bankList"
      :key="item.id"
      :data="item"
      @click="goCardDel"
    >
    </bank-card>
    <view class="cardadd disflex3" @click="goCardAdd">
      <image src="/static/image/add.png" mode="widthFix"></image>
      <text class="addit">添加银行卡</text>
      <text>添加银行卡·安全 便捷 优惠</text>
    </view>
  </view>
</template>

<script>
import { findMemberBanks } from '@/api/member.js';
import { mapGetters } from 'vuex'
import BankCard from './components/BankCard.vue'
export default {
  components: {
    BankCard
  },
  data() {
    return {
      bankList: []
    };
  },
  computed: {
    ...mapGetters(['hasCertification'])
  },
  onShow() {
    this.findMemberBanks();
  },
  methods: {
    findMemberBanks() {
      findMemberBanks().then(({ result }) => {
        this.bankList = result || [];
      });
    },
    // 前往银行卡解绑
    goCardDel(data) {
      const { id } = data
      this.$store.commit('SET_BANKINFO', data)
      uni.navigateTo({
        url: `/pages/Renz/RenzcardDel?id=${id}`
      });
    },
    // 前往绑定银行卡
    goCardAdd() {
      if (!this.hasCertification) {
        this.$tip.confirm('请先完成实名认证，是否前往？').then(() => {
          uni.navigateTo({
            url: '/pages/Renz/Renzname'
          })
        })
        return
      }
      uni.navigateTo({
        url: '/pages/Renz/RenzcardAdd'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30rpx;
}
.cardadd {
  width: 94%;
  background: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.04);
  border-radius: 20rpx;
  color: #999;
  font-size: 28rpx;
  margin: 0rpx auto 34rpx;
  padding: 50rpx 0 50rpx;
  image {
    width: 90rpx;
    height: 90rpx;
    margin: 0rpx auto 20rpx;
  }
  .addit {
    font-size: 36rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 20rpx;
  }
}
</style>
