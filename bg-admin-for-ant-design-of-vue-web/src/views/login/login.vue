<template>
  <div class="container">
    <div class="top">
      <div class="header">
        <a href="/">
          <img src="../../assets/info.svg" alt="logo" class="logo">
          <span class="title">Ant Design</span>
        </a>
      </div>
      <div class="desc">
        Ant Design 是西湖区最具影响力的 Web 设计规范
      </div>
    </div>
    <div class="main">
      <a-form
        id="formLogin"
        class="user-layout-login"
        ref="formLogin"
        :form="form"
        @submit="handleSubmit"
      >
        <a-tabs
          :activeKey="customActiveKey"
          :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
          @change="handleTabClick"
        >
          <a-tab-pane key="tab1" tab="账号密码登录">
            <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误"/>
            <a-form-item>
              <a-input
                size="large"
                type="text"
                placeholder="请输入帐户名或邮箱地址"
                v-decorator="[
                'loginAccount',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
              >
                <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input
                size="large"
                type="password"
                autocomplete="false"
                placeholder="请输入密码"
                v-decorator="[
                'loginPassword',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
              >
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="tab2" tab="手机号登录">
            <a-form-item>
              <a-input size="large" type="text" placeholder="手机号"
                       v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
                <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>

            <a-row :gutter="16">
              <a-col class="gutter-row" :span="16">
                <a-form-item>
                  <a-input size="large" type="text" placeholder="验证码"
                           v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                    <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="8">
                <a-button
                  class="getCaptcha"
                  tabindex="-1"
                  :disabled="state.smsSendBtn"
                  @click.stop.prevent="getCaptcha"
                  v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
                ></a-button>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
        <a-form-item>
          <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
          <router-link
            :to="{ name: 'forgetPassword', params: { user: 'aaa'} }"
            class="forge-password"
            style="float: right;"
          >忘记密码
          </router-link>
        </a-form-item>

        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >确定
          </a-button>
        </a-form-item>

        <div class="user-login-other">
          <span>其他登录方式</span>
          <a>
            <a-icon class="item-icon" type="alipay-circle"></a-icon>
          </a>
          <a>
            <a-icon class="item-icon" type="taobao-circle"></a-icon>
          </a>
          <a>
            <a-icon class="item-icon" type="weibo-circle"></a-icon>
          </a>
          <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
        </div>
      </a-form>
    </div>
    <div class="footer">
      <div class="links">
        <a href="_self">帮助</a>
        <a href="_self">隐私</a>
        <a href="_self">条款</a>
      </div>
      <div class="copyright">
        Copyright © 2018 白鹭学园技术组出品
      </div>
    </div>
  </div>
</template>
<script>

    import { login } from '../../api/sys/login/login.api';

    export default {
        name: 'login',
        data() {
            return {
                customActiveKey: 'tab1',
                isLoginError: false,
                form: this.$form.createForm(this),
                state: {
                    time: 60,
                    loginBtn: false,
                    loginType: 0,
                    smsSendBtn: false
                }
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()

                const {
                    form: {validateFields},
                    state,
                    customActiveKey,
                    Login
                } = this

                state.loginBtn = true

                // 确定当前的登录方式来决定需要验证那几个字段
                const validateFieldsKey = customActiveKey === 'tab1' ? ['loginAccount', 'loginPassword'] : ['mobile', 'captcha']

                /// 验证当前用户是否输入了账号和密码
                validateFields(validateFieldsKey, {force: true}, (err, values) => {
                    if (!err) {
                        const loginParams = {...values}
                        // 采用账号密码登录
                        if (customActiveKey === 'tab1') {
                            console.log("账号密码登录")
                            login(loginParams).then(res => {
                                if (res.code == 200) {
                                   console.log('====>' + JSON.stringify(res))
                                }
                            })
                        } else {
                            console.log("手机号码登录")
                        }
                        state.loginBtn = false
                    } else {
                        setTimeout(() => {
                            state.loginBtn = false
                        }, 600)
                    }
                })
            },
            handleTabClick(key) {
                this.customActiveKey = key
            },
            getCaptcha(e) {
                e.preventDefault()
                const {form: {validateFields}, state} = this
                validateFields(['mobile'], {force: true}, (err, values) => {
                    if (!err) {
                        state.smsSendBtn = true
                        const interval = window.setInterval(() => {
                            if (state.time-- <= 0) {
                                state.time = 60
                                state.smsSendBtn = false
                                window.clearInterval(interval)
                            }
                        }, 1000)
                        const hide = this.$message.loading('验证码发送中..', 0)

                        setTimeout(hide, 2500)
                        this.$notification['success']({
                            message: '提示',
                            description: '验证码获取成功，您的验证码为：4659',
                            duration: 8
                        })
                    }
                })
            },
            // 判断当前用户输入的账号是邮箱还是账号
            handleUsernameOrEmail(rule, value, callback) {
                const {state} = this
                const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
                if (regex.test(value)) {
                    state.loginType = 0
                } else {
                    state.loginType = 1
                }
                callback()
            }
        }
    }
</script>
<style lang="less" scoped>
  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(../../assets/login.svg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, .85);
          font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }

      }

      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, .45);
        margin-top: 12px;
        margin-bottom: 40px;
      }

    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;

      .user-layout-login {
        label {
          font-size: 14px;
        }

        .getCaptcha {
          display: block;
          width: 100%;
          height: 40px;
        }

        .forge-password {
          font-size: 14px;
        }

        button.login-button {
          padding: 0 15px;
          font-size: 16px;
          height: 40px;
          width: 100%;
        }

        .user-login-other {
          text-align: left;
          margin-top: 24px;
          line-height: 22px;

          .item-icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
              color: #1890ff;
            }
          }

          .register {
            float: right;
          }
        }
      }

    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
      }

      .copyright {
        color: rgba(0, 0, 0, .45);
        font-size: 14px;
      }

    }
  }


</style>
