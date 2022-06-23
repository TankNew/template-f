export default async function({ store, app, route, $config }, inject) {
  // 加载主题环境变量
  const language = app.$cookies.get(store.state.app.headerName) || 'zh-CN'
  store.commit('app/setCulture', language)

  const tenantId = $config.NUXT_ENV_TENANT_ID
  app.$cookies.set(store.state.app.multiTenancyHeader, tenantId, {
    path: store.state.abp.appPath || '/',
    maxAge: 5 * 365 * 86400000,
    secure: true,
    sameSite: 'None'
  })
  store.commit('app/setTenantId', tenantId)

  await store.dispatch('getAbp')
}
