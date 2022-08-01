import {RouterMount,createRouter} from 'uni-simple-router';
import { WHITELIST } from '@/common/constants.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
  next()
	// let token=uni.getStorageSync(ACCESS_TOKEN);
	// if(token){
	// 		next();
	// }else{
	// 	if (whiteList.indexOf(to.path) !== -1) {
	// 			next()
	// 	}else{
      // uni.showToast({
      //   title: '请前往登录'
      // })
	// 		next({ path: '/pages/login/login'})
	// 	}
	// }
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
	router,
	RouterMount
}