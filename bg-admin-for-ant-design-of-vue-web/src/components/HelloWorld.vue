<template>
  <div class="hello">
    <button @click="changeLocale('en-US')" v-show="localeval=='zh-CN'">English</button>
    <button @click="changeLocale('zh-CN')" v-show="localeval=='en-US'">中文</button>
  </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'HelloWorld',
        data() {
            return {
                localeval: 'zh-CN'
            }
        },
        methods: {
            ...mapActions([
                'setUserLanguage'
            ]),
            changeLocale(localeval) {
                this.$i18n.locale = localeval
                this.localeval = localeval
                localStorage.setItem('lang', localeval)
                this.setUserLanguage({userLang: localeval})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
