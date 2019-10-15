<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
    import enUs from 'ant-design-vue/lib/locale-provider/en_US'

    export default {
        name: 'App',
        data() {
            return {
                locale: zhCN
            }
        },
        watch: {
            userLang(newVal, oldVal) {
                if (newVal === 'zh-CN') {
                    this.locale = zhCN
                } else {
                    this.locale = enUs
                }
            }
        },
        computed: {
            userLang() {
                return this.$store.getters.userLang
            }
        },
      mounted() {
        if (localStorage.getItem('lang') === 'zh-CN') {
          this.locale = zhCN
        } else {
          this.locale = enUs
        }
      }
    }
</script>

<style>
  #app {
    height: 100%;
  }
</style>
