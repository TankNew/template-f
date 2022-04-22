<template>
  <section class="navbar-section">
    <div v-show="navbarOpen" class="navbar-mobile-container" @click="navbarOpen = !navbarOpen">
      <div class="navbar-mobile" @touchmove.stop.prevent @mousewheel.stop.prevent>
        <smooth-scroll ref="navbarScroll">
          <navbar-items
            :items="items"
            :active-id="activeId"
            @changeActiveId="changeActiveId"
            @trigger="trigger"
          ></navbar-items>
        </smooth-scroll>
      </div>
    </div>
    <div ref="navbarDesktop" class="navbar-desktop">
      <div class="container">
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
      currentPathParent: state => state.app.currentPathParent
    })
  },
  data() {
    return {
      navbarOpen: false,
      activeId: 0
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
    trigger() {
      this.navbarOpen = !this.navbarOpen
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
      if (this.navbarOpen) this.navbarOpen = false
    }
  },
  created() {
    this.activeByCode()
  }
}
</script>
