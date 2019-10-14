import Vue from 'vue'
import Router from 'vue-router'
import routers from './router';
import Utils from '../libs/utils';

Vue.use(Router)

// 路由配置
const RouterConfig = {
  //mode: 'history',
  routes: routers
};

export const router = new Router(RouterConfig);

router.beforeEach((to, from, next) => {
  Utils.title(to.meta.title);
  next();
});
