<template>
  <div class="container">
    <h6 class="page-title">
      <span class="name">{{ currentPath.displayName }}</span>
      <!-- <span class="subtitle">/{{ '关于' }}</span> -->
    </h6>
    <div class="page-content limit-width" v-html="companyInfo.content"></div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      navbars: state => state.app.navbars,
      companyInfo: state => state.app.companyInfo,
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  created() {},
  methods: {}
}
</script>
