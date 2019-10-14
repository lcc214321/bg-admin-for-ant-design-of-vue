import {getLoginMenuList} from '../../libs/utils'
import router from "../../router/router";

export default {
  state: {
    access: localStorage.getItem('access') ? localStorage.getItem('access') : '',// 登录成功以后，当前用户拥有的权限的数据
    menuList: []// 右侧的显示的菜单栏的数据
  },
  getters: {
    menuList(state, getters, rootState) {
      return getLoginMenuList(router, rootState.user.access);
    }
  },
  mutations: {},
  actions: {}
}
