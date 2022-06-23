<template>
  <section class="container">
    <h3><i class="far fa-grin mr-3"></i>正在根据您的系统语言，进行网站重定向……</h3>
  </section>
</template>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
i {
  font-size: 6rem;
}
</style>
<script>
import axios from 'axios'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Logo from '~/components/Logo.vue'
export default {
  // head() {
  //   return {
  //     title: this.companyInfo.appName + '-' + this.companyInfo.seoKeyWords,
  //     meta: [
  //       { hid: 'keywords', name: 'keywords', content: this.companyInfo.seoKeyWords },
  //       { hid: 'description', name: 'description', content: this.companyInfo.description }
  //     ],
  //     link: [{ rel: 'icon', type: 'image/x-icon', href: this.companyInfo.icon }]
  //   }
  // },
  fetch(context) {
    // const ip = (await axios.get('http://icanhazip.com')).data
    // context.store.dispatch('setIp', ip)
    let abp = context.store.state.abp
    // let temp = abp.setting.values['Abp.Localization.LanguageDefineByBrower']
    // let isLanguageDefineByBrower = temp.toLowerCase() === 'true'
    // if (!isLanguageDefineByBrower) {
    let langs = abp.localization.languages
    let defaultLang = context.app.$cookies.get(context.store.state.app.headerName)
    if (defaultLang === undefined) {
      defaultLang = 'zh-CN'
      langs.forEach(x => {
        if (x.isDefault) defaultLang = x.name
      })
    }
    context.store.dispatch('app/setCookie', defaultLang)
    // await context.store.dispatch('app/getCompanyInfo')
    context.redirect(`/${defaultLang}/home`)
    // }
    // The fetch method is used to fill the store before rendering the page
  },
  computed: {
    ...mapState({
      abp: state => state.abp
      // companyInfo: state => state.app.companyInfo
    })
  },
  mounted() {
    let navigatorLanguage = navigator.language
    let langs = this.abp.localization.languages

    // if (langs.find(x => x.name === navigatorLanguage) !== undefined) {
    //   this.$router.replace(`/${navigatorLanguage}/home`)
    // } else {
    //   this.$router.replace(`/${'zh-CN'}/home`)
    // }
  }
}
</script>
