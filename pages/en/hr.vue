<template>
  <div class="container">
    <h4 class="page-title">
      <span class="name">{{ currentPath.displayName }}</span>
      <span class="more"></span>
    </h4>
    <div class="page-content">
      <div class="hr">
        <div
          :class="['item-focus', Object.keys(itemFocus).length === 0 ? 'hidden' : '']"
          @click.prevent.stop="clearFocus"
        >
          <div class="close-bar"><i class="far fa-times-circle"></i></div>
          <div class="container">
            <dl>
              <dt>
                <img :src="itemFocus.cover" class="cover" />
                <h3>{{ itemFocus.name }}</h3>
              </dt>
              <dd>
                <div>
                  <span class="property">{{ $L('WorkLocation') }}</span>
                  <span class="value"> {{ itemFocus.workLocation }} </span>
                </div>
              </dd>
              <dd>
                <div>
                  <span class="property">{{ $L('WorkDescription') }}</span>
                  <div class="value" v-html="itemFocus.description"></div>
                </div>
              </dd>
              <dd>
                <div>
                  <span class="property">{{ $L('WorkNature') }}</span>
                  <span class="value">
                    {{ getNature(itemFocus.workNature) }}
                  </span>
                </div>
              </dd>
              <dd>
                <div>
                  <span class="property">{{ $L('RequireMembers') }}</span>
                  <span class="value">
                    {{ itemFocus.requireMembers == 0 ? $L('NoLimited') : itemFocus.requireMembers }}
                  </span>
                </div>
              </dd>
              <dd>
                <div>
                  <span class="property">{{ $L('RequireWorkYears') }}</span>
                  <span class="value">
                    {{ itemFocus.requireWorkYears == 0 ? $L('NoLimited') : itemFocus.requireWorkYears }}
                  </span>
                </div>
              </dd>
              <dd>
                <div>
                  <span class="property">{{ $L('RequireMent') }}</span>
                  <div class="value" v-html="itemFocus.requireMent"></div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <ul>
          <li v-for="item in pageContent.items" :key="item.id">
            <div class="info">
              <dl>
                <dt>
                  <img :src="item.cover" class="cover" />
                  <h3>{{ item.name }}</h3>
                </dt>
                <dd>
                  <div>
                    <span class="property">{{ $L('WorkNature') }}</span>
                    <span class="value">
                      {{ getNature(item.workNature) }}
                    </span>
                  </div>
                </dd>
                <dd>
                  <div>
                    <span class="property">{{ $L('WorkLocation') }}</span>
                    <span class="value"> {{ item.workLocation }} </span>
                  </div>
                </dd>
                <dd>
                  <div>
                    <span class="property">{{ $L('RequireMembers') }}</span>
                    <span class="value">
                      {{ item.requireMembers == 0 ? $L('NoLimited') : item.requireMembers }}
                    </span>
                  </div>
                </dd>
                <dd>
                  <div>
                    <span class="property">{{ $L('RequireWorkYears') }}</span>
                    <span class="value">
                      {{ item.requireWorkYears == 0 ? $L('NoLimited') : item.requireWorkYears }}
                    </span>
                  </div>
                </dd>
              </dl>
            </div>
            <a :class="['more-info', 'under-line', itemFocus.id == item.id ? 'hidden' : '']" @click="showMore(item)">
              {{ $L('MoreInfo') }}
            </a>
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
const p = 8
export default {
  data() {
    return {
      currentPage: c,
      perPage: p,
      itemFocus: {}
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
    getNature(val) {
      switch (val) {
        case 1:
          return '全职'
        case 2:
          return '兼职'
        case 3:
          return '远程办公'
        default:
          return '无'
      }
    },
    showMore(item) {
      this.itemFocus = item
    },

    clearFocus() {
      this.itemFocus = {}
    },
    formatDate(val) {
      return tools.date(val)
    }
  }
}
</script>
