<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
      <a-pagination showSizeChanger :defaultCurrent="3" :total="500"/>
      {{$t('dict.title')}}
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
                locale: zhCN,
                localeval: 'zh-CN',
                lang: 'zh-CN'
            }
        },
        watch: {
            userLang(newVal, oldVal) {
                const lang = newVal.replace('-','_')
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
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
