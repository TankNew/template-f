import axios from 'axios'
import appconst from '../utiltools/appconst'
import themes from '../themes.json'
// 禁用严格模式
const strict = false

//首先，只需将状态导出为 函数，将变量和操作作为 store/index.js 中的对象导出：
const state = () => ({
  number: 0,
  ip: null,
  abp: {},
  theme: {},
  themes
})
const mutations = {
  DECREMENT_MAIN_COUNTER(state) {
    state.number--
  },
  INCREMENT_MAIN_COUNTER(state) {
    state.number++
  },
  SETENV(state, val) {
    state.theme = val
  }
}

const actions = {
  nuxtServerInit({ commit }) {
    commit('SETENV', this.$config.NUXT_ENV_THEME)
  },
  someAsyncTask({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },

  async setIp(context) {
    const ip = (await axios.get('http://icanhazip.com')).data
    context.state.ip = ip
  },

  async getAbp(context) {
    await this.$axios.get('/AbpUserConfiguration/GetAll').then(data => {
      const json = data.data.result
      json.localization.defaultSourceName = appconst.localization.defaultLocalizationSourceName
      context.state.abp = json
    })
  }
}

export default {
  strict,
  state,
  mutations,
  actions
}
