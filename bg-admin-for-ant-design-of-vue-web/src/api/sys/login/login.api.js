import {fetch} from '../../base';

// 实现用户登录
export const login = params => {
  return fetch('/user/login',params);
};
