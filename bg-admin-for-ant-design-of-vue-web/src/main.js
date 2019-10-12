// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import antDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import i18n from './local'
import store from './store'

Vue.use(antDesignVue)

// 表示当前是使用mock模式来进行异步处理数据的
if (process.env.NODE_ENV === 'mock') {
  require('./api/mock/mock.js')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store: store,
  components: {App},
  template: '<App/>'
})
