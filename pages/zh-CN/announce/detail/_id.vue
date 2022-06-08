<template>
  <section class="container">
    <div class="page-news-detail-container">
      <div class="page-news-detail-content">
        <h4 class="page-detail-title">
          <span>{{ announce.title }}</span>
        </h4>
        <h6 class="page-sub-title">
          <span>发布时间：{{ formatDate(announce.creationTime) }}</span>
        </h6>
        <hr class="page-sub-hr">
        <div class="news-detail" v-html="announce.content"></div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import tools from '../../../../utiltools/tools'
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoHeight: true,
        on: {
          slideChange() {},
          tap() {}
        }
      }
    }
  },
  computed: {
    ...mapState({
      culture: state => state.app.culture
    })
  },
  async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const id = route.params.id
    const announce = await store.dispatch('app/getAnounce', { params: { id } })
    const announcesParams = {
      params: {
        SkipCount: 0,
        MaxResultCount: 10
      }
    }
    const announces = (await store.dispatch('app/getAnounces', announcesParams)).items
    return { announce, announces }
  },
  created() {
    this.$store.dispatch('app/setcurrentPath', {
      path: `/${this.culture}/home`
    })
  },
  methods: {
    target(id) {
      window.open(`/${this.culture}/announce/detail/` + String(id, '_blank'))
    },
    formatDate(val) {
      return tools.date(val)
    }
  }
}
</script>
