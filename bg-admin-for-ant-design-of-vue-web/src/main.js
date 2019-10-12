// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import antDesignVue  from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import i18n from './local'
import store from './store'

Vue.use(antDesignVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store: store,
  components: { App },
  template: '<App/>'
})
