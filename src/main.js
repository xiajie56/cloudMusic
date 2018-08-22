import Vue from 'vue'
import App from './App'
import store from './store'
import {getHttp} from './utils/index.js'

Vue.prototype.$http = getHttp
Vue.config.productionTip = false
Vue.prototype.$store = store;
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 
    'pages/artistList/main',
    'pages/musicDetails/main',
    'pages/me/main',
    'pages/search/main',
    'pages/commentList/main',
    'pages/mv/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '音乐',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh:true,
      backgroundTextStyle:'dark'
    },
    "tabBar": {
      "color": '#bfbfbf',
      "selectedColor": "#d4237a",
      "backgroundColor": "#FFFFFF",
      "list": [{
        "pagePath": "pages/index/main",
        "text": "音乐",
        "iconPath": '/static/tab_home.png',
        "selectedIconPath": '/static/tab_home_pre.png'
      }, {
        "pagePath": "pages/mv/main",
        "text": "MV",
        "iconPath": '/static/MV_b.png',
        "selectedIconPath": '/static/MV.png'
      }]
    }
  }
}
