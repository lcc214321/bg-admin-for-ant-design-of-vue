<template>
  <a-layout class="bg-main">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      width=256
    >
      <div class="logo">
        <a href="/login">
          <img src="../../assets/info.svg" alt="logo">
          <span>Ant Design Pro</span>
        </a>
      </div>
      <a-menu theme="dark" mode="inline" @click="handleClick">
        <template v-for="item in menuList">
          <a-sub-menu :key=item.name>
            <span slot="title">
              <a-icon :type=item.meta.icon />
              <span>{{item.meta.title}}</span>
            </span>
            <template v-for="childrenItem in item.children">
              <a-menu-item :key=childrenItem.name>
                <a-icon :type=childrenItem.meta.icon />
                <span>{{childrenItem.meta.title}}</span>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;line-height: 64px;vertical-align: middle;">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <div style="display: inline-block;float: right;margin-right: 20px;">
          <!--          <div style="height: 40px;display: inline-block;width:48px;height: 64px;">-->
          <!--            <a-badge :count="10" :offset="[6,0]" >-->
          <!--              <a-icon type="bell" style="font-size: 16px;"/>-->
          <!--            </a-badge>-->
          <!--          </div>-->

          <a-dropdown>
            <div style="height: 62px;margin-right: 20px;display: inline-block;">
              <a-avatar size="small">
                <img src="../../assets/avatar2.jpg" height="24ps" width="24px"/>
              </a-avatar>
              <span style="display: inline-block;margin-left: 5px;">天野远子</span>
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="1">个人中心</a-menu-item>
              <a-menu-item key="2">账户设置</a-menu-item>
            </a-menu>
          </a-dropdown>

          <a-dropdown style="font-size: 16px;">
            <div style="height: 62px;display: inline-block;">
              <a-icon type="global"/>
            </div>
            <a-menu slot="overlay" @click="handleLanguageChange">
              <a-menu-item key="zh-CN">简体中文</a-menu-item>
              <a-menu-item key="en-US">英文</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>
            <a-icon type="home"/>
            首页
          </a-breadcrumb-item>
          <template v-for="item in breadCrumbList">
            <a-breadcrumb-item>
              <a-icon :type=item.icon />
              <span>{{showBreadcrumbItem(item)}}</span>
            </a-breadcrumb-item>
          </template>
        </a-breadcrumb>
        <a-layout-content :style="{   background: '#fff', minHeight: '280px' }">
          <router-view/>
        </a-layout-content>
      </a-layout>

    </a-layout>
  </a-layout>
</template>
<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    data() {
      return {
        collapsed: false,
      }
    },
    methods: {
      ...mapActions([
        'setUserLanguage'
      ]),
      ...mapMutations([
        'setBreadCrumb'
      ]),
      handleLanguageChange(e) {
        this.$i18n.locale = e.key
        localStorage.setItem('lang', e.key)
        this.setUserLanguage({userLang: e.key})
      },
      showBreadcrumbItem(item) {
        return (item.meta && item.meta.title) || item.name
      },
      handleClick(e) {
        this.$router.push({
          name: e.key
        }).catch(err => {
          err
        })
      }
    },
    watch: {
      '$route'(newRoute) {
        this.setBreadCrumb(newRoute.matched)
      }
    },
    computed: {
      breadCrumbList() {
        return this.$store.state.app.breadCrumbList
      },
      menuList() {
        return this.$store.getters.menuList;
      }
    }
  }
</script>
<style>
  .bg-main {
    min-height: calc(100vh);
  }

  .bg-main .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }

  .bg-main .trigger:hover {
    color: #1890ff;
  }

  .bg-main .logo {
    position: relative;
    height: 64px;
    padding-left: 24px;
    overflow: hidden;
    line-height: 64px;
    background: #002140;
    -webkit-transition: all .3s;
    transition: all .3s;
    display: block;
  }

  .bg-main .logo img {
    height: 32px;
    width: 32px;
    display: inline-block;
    vertical-align: middle;
  }

  .bg-main .logo sapn {
    color: #fff;
    font-size: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
    vertical-align: middle;
  }

</style>
