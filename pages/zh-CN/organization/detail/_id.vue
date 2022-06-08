<template>
  <div class="container">
    <div class="page-content limit-width user-detail">
      <div v-if="Users"
        class="user-detail-title">
        <span class="cover-left">
          <img :src="Users.headImage" />
        </span>
        <div class="cover-info-center">
          <span class="cover-title">{{ getFullName(Users.fullName) }}</span>
          <!-- <span class="cover-subtit">{{ getData('职位') }}</span> -->
          <span class="cover-line"></span>
          <!-- <span class="cover-about">教育背景：{{ getData('学历') }}</span>
          <span class="cover-about">擅长领域：{{ getData('优势') }}</span> -->

          <span v-for="(item,index) in Users.properties"
            :key="index"
            class="cover-about">{{ item.propertyName + '：' + item.values.join(' ') }}</span>
        </div>
        <div class="cover-info-right">
          <span class="cover-tel">
            <i class="fas fa-phone-alt"></i>{{ Users.phoneNumber }}
          </span>
          <span class="cover-email">
            <i class="fas fa-envelope"></i>{{ Users.emailAddress }}
          </span>
        </div>
      </div>
      <div class="news-detail">
        <div v-html="Users.introduction"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// import tools from '../../../../utiltools/tools'

export default {
  data() {
    return {
      picInfo: false,
      isloaded: false
      // swiperOption: {
      //   pagination: {
      //     el: '.swiper-pagination'
      //   },
      //   navigation: {
      //     nextEl: '.swiper-next',
      //     prevEl: '.swiper-prev'
      //   },
      //   autoHeight: true,
      //   on: {
      //     slideChange() {},
      //     tap() {}
      //   }
      // }
    }
  },
  computed: {
    ...mapState({
      culture: state => state.app.culture,
      currentPath: state => state.app.currentPath,
      companyInfo: state => state.app.companyInfo
    })
  },
  head() {
    return {
      title: this.getFullName(this.Users.fullName) + ' - ' + this.companyInfo.appName + '-' + this.companyInfo.seoKeyWords
    }
  },
  async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const id = route.params.id

    const Users = await store.dispatch('app/getUsersId', { params: { id } })
    let path = `/${store.app.culture}/Organization`
    // path += 'team/' + Users.catalogGroup.id

    return { Users, path }
  },
  created() {
    // this.$store.dispatch('app/setcurrentPath', {
    //   path: this.path,
    //   grandId: this.Users.catalogGroup.id
    // })
    this.$store.dispatch('app/setcurrentPath', {
      path: this.path
    })
  },
  mounted() {
    // this.mySwiper.slideTo(3, 1000, false)
  },
  methods: {
    // formatDate(val) {
    //   return tools.date(val)
    // }
    getData(str) {
      if (this.Users && this.Users.properties && this.Users.properties.length) {
        for (let i = 0; i < this.Users.properties.length; i++) {
          if (this.Users.properties[i].propertyName === str) {
            return this.Users.properties[i].values.join(' ')
          }
        }
      }
      return ''
    },
    getFullName(fullName) {
      if (typeof (fullName) !== 'string') return ''
      const t = fullName.split(' ')
      return (t[1] ? t[1] : '') + (t[0] ? t[0] : '')
    }
  }
}
</script>
