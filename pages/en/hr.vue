<template>
  <div class="container page-hr">
    <!-- <h4 class="page-title">
      <span class="name">{{ currentPath.displayName }}</span>
      <span class="more"></span>
    </h4> -->
    <div class="page-content">
      <div class="hr">
        <ul>
          <li
            v-for="(item, index) in pageContent.items"
            :key="item.id"
            :class="num === index?'active':''"
          >
            <div class="headHr"
              @click="changeNum(index)">
              <div class="info">
                <span class="name">{{ item.name }}</span>
                <span class="num-people">{{ item.requireMembers }}人</span>
                <span class="date">{{ formatDate( item.creationTime ) }}</span>
              </div>
              <i class="fas fa-angle-double-down"></i>
            </div>
            <div class="bodyHr">
              <div v-html="item.description"></div>
              <div v-html="item.requireMent"></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="my-5">
        <pagination
          v-model="currentPage"
          :per-page="perPage"
          :total-rows="pageContent.totalCount"
          @input="pageChange"
        ></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import tools from '../../utiltools/tools'
const c = 1
const p = 10
export default {
  data() {
    return {
      currentPage: c,
      perPage: p,
      num: 0
    }
  },
  computed: {
    ...mapState({
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const param = {
      params: {
        IsActive: true,
        SkipCount: (c - 1) * p,
        MaxResultCount: p
      }
    }
    const json = await store.dispatch('app/getHr', param)
    // console.log(json)
    return { pageContent: json }
  },

  created() {},
  methods: {
    async pageChange() { 
      const params = {
        params: {
          SkipCount: (this.currentPage - 1) * this.perPage,
          MaxResultCount: this.perPage
        }
      }
      this.pageContent = await this.$store.dispatch('app/getHr', params)
    },
    changeNum(index) {
      this.num = this.num === index ? -1 : index
    },
    formatDate(val) {
      return tools.date(val)
    }
  }
}
</script>
