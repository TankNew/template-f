<template>
  <div class="container">
    <!-- <h6 class="page-title">
      <span class="name">{{ currentPath.displayName }}</span>
    </h6> -->
    <div class="dhy-children">
      <div class="head">
        <div class="name">{{ item.displayName }}</div>
        <span class="more">
          <a v-if="!collapse" @click="collapse = !collapse">
            {{ $L(`Expand`) }}
            <i class="fas fa-angle-down"></i>
          </a>
          <a v-else @click="collapse = !collapse">
            {{ $L(`Collapse`) }}
            <i class="fas fa-angle-up"></i>
          </a>
        </span>
      </div>
      <div class="body">
        <div v-show="collapse"
          class="page-content page-organization scrollbarY">
          <tree :items="items"
            @asyncGetData="asyncGetData">
          </tree>
        </div>
      </div>
    </div>
    <section class="dhy-organization">
      <div class="page-news-leftbar">
        <dl class="page-news-leftbar-groups"
        >
          <dt>{{ item.displayName }}</dt>
          <div class="page-content page-organization scrollbarY">
            <tree :items="items"
              @asyncGetData="asyncGetData">
            </tree>
          </div>
        </dl>
      </div>
      <div class="page-user-list">
        <ul>
          <li
            v-for="item in pageContent"
            :key="item.id"
            @click="goNewsDetail(item.id)"
          >
            <span class="cover">
              <img :src="item.headImage" />
            </span>
            <div class="cover-info">
              <span class="cover-title">{{ item.fullName }}</span>
              <span class="cover-subtit">{{ getData(item, '职位') }}</span>
              <span class="cover-line"></span>
              <p class="cover-content">
                {{ filter(item.introduction, 50) }}
                <span>[查看详情]</span>
              </p>
            </div>
          </li>
        </ul>
      </div> 
    </section>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import tools from '../../../utiltools/tools'
import Tree from '@/components/Tree'

export default {
  components: { Tree },
  data() {
    return {
      collapse: false
    }
  },
  computed: {
    ...mapState({
      culture: state => state.app.culture,
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const json = await store.dispatch('app/getOrganization')
    let item = null
    let data = []
    if (json.length) {
      item = json[0]
      const param = {
        params: {
          ouId: json[0].id
          // ouId: 326
        }
      }
      data = await store.dispatch('app/getOrganizationUnitUsersList', param)
    }
    return { items: json, pageContent: data, item }
  },
  created() {},
  methods: {
    filter(val, length) {
      return tools.cutString(tools._filter(val), length)
    },
    goNewsDetail(id) {
      this.$router.push(`/${this.culture}/organization/detail/` + String(id))
    },
    async asyncGetData(item) {
      const param = {
        params: {
          ouId: item.id
        }
      }
      this.item = item
      const json = await this.$store.dispatch('app/getOrganizationUnitUsersList', param)
      this.pageContent = json
    },
    getData(item, str) {
      if (item && item.properties && item.properties.length) {
        for (let i = 0; i < item.properties.length; i++) {
          if (item.properties[i].propertyName === str) {
            return item.properties[i].values.join(' ')
          }
        }
      }
      return ''
    }
  }
}
</script>
