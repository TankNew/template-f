<template>
  <ol class="breadcrumb">
    <li
      v-for="(item,index) in items"
      :key="index"
      :class="['breadcrumb-item',item.to&&item.to.toLowerCase()?'active':'']"
    >
      <i v-if="!index" class="fas fa-location-arrow"></i>
      <span v-if="item.to&&item.to.toLowerCase()===path">{{ item.text }}</span>
      <router-link v-else :to="item.to||''">{{ item.text }}</router-link>
    </li>
  </ol>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    path() {
      return this.$route.path.toLowerCase()
    }
  },
  created() {}
}
</script>
<style lang="less">
</style>
