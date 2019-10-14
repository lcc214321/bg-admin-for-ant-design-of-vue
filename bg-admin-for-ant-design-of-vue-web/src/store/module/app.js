import {getBreadCrumbList, getHomeRoute} from "../../libs/utils";
import router from '../../router/router';

export default {
  state: {
    breadCrumbList: localStorage.getItem('breadCrumbList') ? JSON.parse(localStorage.getItem('breadCrumbList')) : [],
    homeRoute: getHomeRoute(router),
    userLang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'zh-CN'
  },
  getters: {
    userLang(state, getters, rootState) {
      return rootState.app.userLang;
    },
    breadCrumbList(state, getters, rootState) {
      return rootState.app.breadCrumbList;
    }
  },
  mutations: {
    setUserLang(state, userLang) {
      state.userLang = userLang;
      localStorage.setItem("lang", userLang)
    },
    setBreadCrumb(state, routeMetched) {
      let breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute);
      state.breadCrumbList = breadCrumbList;
      localStorage.setItem('breadCrumbList', JSON.stringify(breadCrumbList));
    }
  },
  actions: {
    setUserLanguage({commit}, {userLang}) {
      commit('setUserLang', userLang);
    }

  }
}
