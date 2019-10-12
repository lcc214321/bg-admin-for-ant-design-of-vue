import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        icon: 'ios-settings',
        hideInMenu: true,
        title: '登陆页',
        requireAuth: false //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
      },
      component: resolve => {
        require(['../views/login/login.vue'], resolve);
      }
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      meta: {
        icon: 'ios-settings',
        hideInMenu: true,
        title: '忘记密码页',
        requireAuth: false //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
      },
      component: resolve => {
        require(['../views/login/forgetPassword.vue'], resolve);
      }
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        icon: 'ios-settings',
        hideInMenu: true,
        title: '注册页',
        requireAuth: false //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
      },
      component: resolve => {
        require(['../views/login/register.vue'], resolve);
      }
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
