<template>
  <div class="container user-section">
    <div class="page-content">
      <section class="role-list">
        <ul>
          <li
            v-for="item in roles.items"
            :key="item.id"
            :class="[activeRole.id === item.id ? 'active' : '']"
            @click="chooseRole(item)"
          >
            {{ item.displayName }}
          </li>
        </ul>
      </section>

      <section
        :class="['user-focus', Object.keys(userFocus).length === 0 ? 'hidden' : '']"
        @click.prevent.stop="clearFocus"
      >
        <div class="close-bar"><i class="far fa-times-circle"></i></div>
        <div class="info-container">
          <div class="head-img"><img :src="userFocus.headImage" /></div>
          <div class="basic-info">
            <h3>{{ userFocus.fullName }}</h3>
            <dl>
              <dd v-for="p in userFocus.properties" :key="p.id">
                <span class="property">{{ p.propertyName }}</span>
                <span class="value">{{ p.values.toString() }}</span>
              </dd>
            </dl>
            <hr />
            <div class="detail" v-html="userFocus.introduction"></div>
          </div>

          <div class="user-contact-info">
            <a :href="'tel:' + userFocus.phoneNumber">
              <i class="far fa-envelope"></i>
            </a>
            <a :href="'mailto:' + userFocus.emailAddress"><i class="fas fa-phone-alt"></i></a>
          </div>
        </div>
      </section>

      <section class="user-list">
        <ul>
          <li v-for="item in usersInActiveRole" :key="item.id">
            <div class="head-img"><img :src="item.headImage" /></div>
            <div class="basic-info">
              <h3>{{ item.fullName }}</h3>
              <dl>
                <dd v-for="p in item.properties" :key="p.id">
                  <span class="property">{{ p.propertyName }}</span>
                  <span class="value">{{ p.values.toString() }}</span>
                </dd>
              </dl>
            </div>
            <div class="user-contact-info">
              <a :href="'tel:' + item.phoneNumber">
                <i class="far fa-envelope"></i>
              </a>
              <a :href="'mailto:' + item.emailAddress"><i class="fas fa-phone-alt"></i></a>
            </div>
            <div class="more-info">
              <a @click="chooseUser(item)">{{ $L('MoreInfo') }}</a>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      activeRole: {},
      usersInActiveRole: [],
      userFocus: {}
    }
  },
  computed: {
    ...mapState({
      navbars: state => state.app.navbars,
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const roles = await store.dispatch('app/getRoles')
    return { roles }
  },
  async created() {
    if (this.roles.items.length > 0) {
      await this.chooseRole(this.roles.items[0])
    }
  },
  methods: {
    async chooseRole(item) {
      this.activeRole = item
      let res = await this.$store.dispatch('app/getUsersInRole', { params: { roleName: this.activeRole.name } })
      if (res.items) this.usersInActiveRole = res.items
    },
    chooseUser(item) {
      this.userFocus = item
    },
    clearFocus() {
      this.userFocus = {}
    }
  }
}
</script>
