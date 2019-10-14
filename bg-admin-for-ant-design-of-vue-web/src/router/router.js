import main from '../views/main/main.vue';

export default [
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
    path: '/sys',
    name: 'sys',
    component: main,
    meta: {
      icon: 'setting',
      title: '系统管理',
      code: 'system-manage',
      requireAuth: true //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
    },
    children: [
      {
        path: 'dictList',
        name: 'dictList',
        meta: {
          icon: 'book',
          title: '字典维护',
          code: 'system-manage-dict',
          requireAuth: true //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
        },
        component: resolve => {
          require(['../views/sys/dict/dictList.vue'], resolve);
        }

      },
      {
        path: 'roleList',
        name: 'roleList',
        meta: {
          icon: 'solution',
          title: '角色管理',
          code: 'system-manage-role',
          requireAuth: true //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
        },
        component: resolve => {
          require(['../views/sys/role/roleList.vue'], resolve);
        }
      },
      {
        path: 'treeList',
        name: 'treeList',
        meta: {
          icon: 'thunderbolt',
          title: '菜单管理',
          code: 'system-manage-tree',
          requireAuth: true //表示当前响应的请求是否需要进行登录拦截验证【true：需要；false：不需要】
        }
      }
    ]
  }
]
