export default {
  onReady() {
    // #ifdef MP-ALIPAY
    if (my.canIUse('hideBackHome')) {
      my.hideBackHome();
    }
    // #endif
  }
}