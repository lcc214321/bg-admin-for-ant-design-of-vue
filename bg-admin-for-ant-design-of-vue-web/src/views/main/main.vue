<template>
    <a-layout class="bg-main">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
        width=256
      >
        <div class="logo">
          <a href="/login" >
            <img src="../../assets/info.svg" alt="logo" >
            <span>Ant Design Pro</span>
          </a>
        </div>
        <a-menu theme="dark" mode="inline"  @click="handleClick">
          <template v-for="item in menuList">
            <a-sub-menu :key=item.meta.code>
            <span slot="title">
              <a-icon :type=item.meta.icon />
              <span>{{item.meta.title}}</span>
            </span>
              <template v-for="childrenItem in item.children">
                <a-menu-item :key=childrenItem.meta.code>
                  <a-icon :type=childrenItem.meta.icon />
                  <span>{{childrenItem.meta.title}}</span>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
          Content
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>
<script>
    export default {
        data() {
            return {
                collapsed: false,
            }
        },
        methods: {
            handleClick(e){
                console.log('click', e)
                console.log('----' + JSON.stringify(this.menuList))
            }
        },
        computed: {
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

  .bg-main .logo img{
    height: 32px;
    width: 32px;
    display: inline-block;
    vertical-align: middle;
  }

  .bg-main .logo sapn{
    color: #fff;
    font-size: 20px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    font-weight: 600;
    vertical-align: middle;
  }

</style>
