<template>
  <div :class="['tank-tree',layer>0?'sub':'']">
    <ul>
      <li v-for="(item,index) in items" :key="index">
        <div class="display">
          <i v-if="item.children.length>0"
            class="fas"
            :class="view[index] ? 'fa-angle-down' : 'fa-angle-right'"
            @click.stop="changeView(item, index)"></i>
          <div v-else class="block"></div>
          <span
            :class="[layer>0?'sub':'',item.children.length>0?'next':'']"
            @click.stop="asyncGetData(item)"
          >{{ item.displayName }}</span>
        </div>
        <tree v-show="view[index]"
          v-if="item.children.length>0"
          :items="item.children"
          :layer="layer+1"
          @asyncGetData="asyncGetData"
        ></tree>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Tree',
  props: {
    items: {
      type: Array,
      required: true
    },
    layer: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      view: []
    }
  },
  created() {
    this.view = []
  },
  computed: {
    getView() {
      return (index) => {
        return this.view[index]
      }
    }
  },
  methods: {
    changeView(item, index) {
      this.view[index] = !this.view[index]
      /* 触发视图响应 */
      this.$set(this.items, index, item)
    },
    asyncGetData(item) {
      this.$emit('asyncGetData', item)
    }
  }
}
</script>
