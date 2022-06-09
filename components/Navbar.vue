<template>
  <section class="navbar-section"
    style="position: relative;z-index: 2010;">
    <div class="navbar-mobile-container"
      :class="numCount > 0 ? (navbarOpen ? 'navbar-mobile-container-in' : 'navbar-mobile-container-un') : ''"
      @click="trigger()">
      <div class="navbar-mobile" @touchmove.stop.prevent @mousewheel.stop.prevent @click.stop.prevent>
        <smooth-scroll ref="navbarScroll">
          <navbar-items
            :items="items"
            :active-id="activeId"
            @changeActiveId="changeActiveId" 
            @trigger="trigger"
          ></navbar-items>
          <a class="tel" href="javascript:void(0)"
            @click.stop="totel(companyInfo.tel)">
            <i class="fas fa-phone-alt"></i>
            <span class="number">{{ companyInfo.tel }}</span>
          </a>
        </smooth-scroll>
      </div>
    </div>
    <div ref="navbarDesktop" class="navbar-desktop">
      <div class="container">
        <div class="header-logo-container">
          <div class="logo">
            <img :src="companyInfo.logo" @click="go('/')" />
          </div>
          <div class="company-name">{{ companyInfo.logoText }}</div>
        </div>
        <navbar-items
          ref="navbarItems"
          :items="items"
          :active-id="activeId"
          :pc="true"
          @changeActiveId="changeActiveId"
          @trigger="trigger"
        ></navbar-items>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import SmoothScroll from '../components/SmoothScroll'

export default {
  name: 'Navbar',
  components: {
    SmoothScroll
  },
  computed: {
    ...mapState({
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent,
      companyInfo: state => state.app.companyInfo
    })
  },
  data() {
    return {
      navbarOpen: false,
      activeId: 0,

      numCount: 0
    }
  },
  watch: {
    $route(val) {
      this.activeByCode()
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    setActiveId(val) {
      this.activeId = val
    },
    go(url) {
      this.$router.push({ path: url })
    },
    trigger() {
      this.navbarOpen = !this.navbarOpen
      this.numCount++
    },
    changeActiveId(val) {
      this.activeId = val
    },
    activeByCode() {
      this.items.forEach(item => {
        if (
          this.currentPath.code &&
          ((item.navbarType !== 5 && this.currentPath.code.includes(item.code)) ||
            (item.navbarType === 5 && this.currentPath.code === item.code))
        )
          this.activeId = item.id
      })
    },
    close() {
      if (this.navbarOpen) {
        this.navbarOpen = false
        this.numCount++
      }
    },
    totel(tel) {
      window.location.href = 'tel:' + tel
    }
  },
  created() {
    this.activeByCode()
  }
}
</script>
