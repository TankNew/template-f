<template>
  <section class="home">
    <section v-if="group1 && group1.children.length > 0" class="news-block container">
      <div class="news-list">
        <h3 class="block-title">
          <span class="name">{{ group1.title }}</span>
        </h3>
        <dl>
          <dd v-for="item in group1.children" :key="item.id">
            <img class="backimg" :src="item.cover" />
            <div class="content" @click="goNewsGroup(item.id, group1.type)">
              <div class="body">
                <img class="icon" :src="item.icon" />
                <div class="info">
                  <span class="subtitle">English Intro</span>
                  <span class="name">{{ item.displayName }}</span>
                </div>
              </div>
            </div>
          </dd>
        </dl>
      </div>
    </section>
    <section class="white-block"></section>
    <section v-if="companyInfo" class="companyInfo-block container">
      <h3 class="block-title">
        <span class="name">{{ $L('AboutUs') }}</span>
        <!-- <span class="subtitle">123654</span> -->
      </h3>
      <dl class="imgList">
        <dd v-for="(item, index) in htmlImgsList(companyInfo.content)" :key="index">
          <img :src="item" @click="goAbout()" />
        </dd>
      </dl>
      <div class="text" v-html="filter(companyInfo.content, 800)"></div>
    </section>
    <section class="white-block"></section>
    <section v-if="ad1" class="ad-img-block">
      <!-- <h3 class="title">
        <span class="name">{{ ad1.title }}</span>
      </h3> -->
      <a :href="ad1.url ? ad1.url : 'javascript:void(0)'" class="img-url">
        <img :src="ad1.img" />
      </a>
    </section>
    <section class="white-block"></section>
    <section v-if="group2 && group2.items.length > 0" class="picnews-block">
      <section class="container">
        <h3 class="block-title">
          <span class="name">{{ group2.title }}</span>
        </h3>
        <section class="looper">
          <div class="page-news-list">
            <div v-for="item in group2.items" :key="item.id" class="page-news-item">
              <div class="news-cover">
                <img :src="item.cover" />
              </div>
              <div class="news-info">
                <h3 class="news-title" @click="goNewsDetail(item.id, 1)">{{ item.title }}</h3>
                <div class="news-intro" @click="goNewsDetail(item.id, 1)" v-html="filter(item.content, 340)"></div>
                <span class="news-date">
                  {{ formatDate(item.creationTime) }}
                </span>
              </div>
            </div>
            <div class="tomore">
              <a href="javascript:void(0)" @click="goNewsGroup(group2.catalogGroupId, group2.type)"
                >{{ $L('More') }} ></a
              >
            </div>
          </div>
        </section>
      </section>
    </section>

    <section class="white-block"></section>

    <section v-if="ad2" class="ad-img-block">
      <a :href="ad2.url ? ad2.url : 'javascript:void(0)'" class="img-url">
        <img :src="ad2.img" />
      </a>
    </section>

    <section class="white-block"></section>

    <section v-if="group3" class="product-block">
      <section class="container">
        <h3 class="block-title">
          <span class="name">{{ group3.title }}</span>
        </h3>
        <ul>
          <li v-for="item in group3.children" :key="item.id" @click="goNewsGroup(item.id, group3.type)">
            <div class="product-icon-container">
              <div class="product-icon">
                <img :src="item.icon" />
              </div>
              <div class="product-cover">
                <span>
                  <img :src="item.cover" />
                </span>
              </div>
              <div class="product-info">
                <h4>{{ item.displayName }}</h4>
                <p>{{ item.info }}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </section>

    <section class="white-block"></section>
  </section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import tools from '../../utiltools/tools'
import AppConsts from '../../utiltools/appconst'
export default {
  data() {
    return {
      wordIndex: 0,
      observer: null,
      isProductLoading: false
    }
  },
  computed: {
    announceSwiperOption() {
      let that = this
      let option = {
        autoplay: true,
        loop: true,
        on: {
          click() {
            const realIndex = this.clickedSlide.dataset.index
            const group = parseInt(this.clickedSlide.dataset.group)
            that.target(realIndex, group)
          }
        }
      }
      return option
    },
    ...mapState({
      companyInfo: state => state.app.companyInfo,
      currentPath: state => state.app.currentPath,
      culture: state => state.app.culture,
      partners: state => state.app.partners,
      homePage: state => state.app.homePage
    }),
    groups() {
      return this.homePage.groups ? this.homePage.groups.filter(x => x.catalogGroup) : []
    },
    blocks() {
      return this.homePage.blocks ?? []
    },
    ad1() {
      return this.blocks.length > 0 ? this.blocks[0] : null
    },
    ad2() {
      return this.blocks.length > 1 ? this.blocks[1] : null
    },
    group1() {
      let group1 = this.groups.length > 0 ? this.groups[0] : null
      if (group1) {
        if (group1.children) group1.children = group1.children.slice(0, 6)
        else group1.children = []
      }
      return group1
    },
    group2() {
      let group2 = this.groups.length > 1 ? this.groups[1] : null
      if (group2) {
        if (group2.items) group2.items = group2.items.slice(0, 6)
        else group2.items = []
      }
      return group2
    },
    group3() {
      let group3 = this.groups.length > 2 ? this.groups[2] : null
      if (group3) {
        if (group3.items) group3.items = group3.items.slice(0, 6)
        else group3.items = []
      }
      return group3
    }
  },
  async asyncData({ isDev, route, store, env, query, req, res, redirect, error }) {
    let params, announces
    params = {
      params: {
        SkipCount: 0,
        MaxResultCount: 10
      }
    }
    announces = (await store.dispatch('app/getAnounces', params)).items
    return { announces }
  },
  created() {},
  methods: {
    target(id) {
      window.open(`/${this.culture}/announce/detail/` + String(id, '_blank'))
    },
    getImgUrl(val) {
      if (val) return AppConsts.remoteServiceBaseUrl + val
      else return null
    },
    goNewsGroup(id, type) {
      switch (type) {
        case 1:
          this.$router.push(`/${this.culture}/news/` + String(id))
          break
        case 2:
          this.$router.push(`/${this.culture}/photonews/` + String(id))
          break
        case 3:
          this.$router.push(`/${this.culture}/product/` + String(id))
          break
      }
    },
    goNewsDetail(id, type) {
      let typename
      switch (type) {
        case 1:
          typename = 'news/detail'
          break
        case 2:
          typename = 'photonews'
          break
        case 3:
          typename = 'product'
          break
      }
      this.$router.push({ path: `/${this.culture}/` + typename + '/' + String(id) })
    },
    goAbout() {
      this.$router.push({ path: `/${this.culture}/About` })
    },
    filter(val, length) {
      return tools.cutString(tools._filter(val), length) + '<a>' + this.$L('More') + '</a>'
    },
    formatDate(val) {
      return tools.date(val)
    },
    htmlImgsList(str) {
      if (str === null || str === undefined) return []
      //匹配图片（g表示匹配所有结果i表示区分大小写）
      let imgReg = /<img.*?(?:>|\/>)/gi
      //匹配src属性
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
      let arr = str.match(imgReg)
      const list = []
      for (let i = 0; i < arr.length; i++) {
        if (i < 4) {
          let src = arr[i].match(srcReg)
          //获取图片地址
          if (src[1]) {
            list.push(src[1])
          }
        }
      }
      return list
    }
  }
}
</script>
