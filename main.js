import Vue from 'vue'
import App from './App'
import {router,RouterMount} from './router/index.js'  //路径换成自己的
import store from './store'
import * as filters from './filters' // 全局filter
import tip from './common/tip.js'

Vue.config.productionTip = false
Vue.prototype.$tip = tip;
App.mpType = 'app'

// 注册全局实用过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(router)

const app = new Vue({
  store,
  ...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
