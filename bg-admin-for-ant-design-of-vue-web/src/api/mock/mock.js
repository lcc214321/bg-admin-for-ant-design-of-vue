// 引入mockjs
const Mock = require('mockjs');

import userLogin from './login/user.login';

Mock.mock('/user/login', 'post', userLogin);
