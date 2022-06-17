<template>
  <div class="container">
    <h4 class="page-title">
      <span class="name">{{ currentPath.displayName }}</span>
      <span class="more"></span>
    </h4>
    <div class="page-content">
      <tree :items="items"></tree>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Tree from '@/components/Tree'

export default {
  components: { Tree },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const json = await store.dispatch('app/getOrganization')
    return { items: json }
  },
  created() {},
  methods: {}
}
</script>
