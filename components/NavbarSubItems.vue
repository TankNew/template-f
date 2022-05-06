<template>
  <div :class="['navbar','sub',expand?'expand':'']"
    :style="!pc && expand ? 'max-height: ' + ((arry.length + num) * 33) + 'px;' :
      (pc && expand ? 'max-height: ' + ((arry.length + num) * 50 + 2) + 'px;' : '')">
    <ul> 
      <li
        v-for="(item,index) in arry"
        :key="index"
        @click.stop.prevent="expandItem(item,index)"
        @mouseover="changeExpandItem(item,index)"
        @mouseout="changeExpandItem(item,index)"
      >
        <a class="nav-link">
          <span @click.stop.prevent="go(item,index)">{{ item.displayName }}</span>
          <span
            v-if="hasChildren(item)"
            :class="['expand-icon',item.expand?'expand':'']"
          >
            <i class="fas fa-angle-left"></i>
          </span>
        </a>
        <navbar-sub-items
          v-if="hasChildren(item)"
          :items="item.children"
          :pc="pc"
          :expand="item.expand"
          v-bind="$attrs"
          v-on="$listeners"
        ></navbar-sub-items>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'NavbarSubItems',
  data() {
    return {
      arry: [],
      num: 0
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    expand: {
      type: Boolean,
      default: false
    },
    pc: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    $attrs: {
      handler(nv, ov) {
        if (nv['active-id'] !== ov['active-id'])
          this.arry.forEach(x => {
            x.expand = false
          })
      }
    }
  },
  inheritAttrs: false,
  created() {
    this.arry = this.items.map(x => {
      x.expand = false
      return x
    })
  },
  methods: {
    go(item, index) {
      if (item.navbarType !== 0) {
        this.routerUrl(item)
      } else {
        this.expandItem(item, index)
      }
    },
    hasChildren(item) {
      return item.children.length > 0
    },
    changeNum(bool, n) {
      if (bool) {
        this.num += n
        if (this.$parent.changeNum) {
          this.$parent.changeNum(bool, this.num)
        }
      } else {
        if (this.$parent.changeNum) {
          this.$parent.changeNum(bool, this.num)
        }
        this.num -= n
      }
    },
    expandItem(item, index) {
      if (this.hasChildren(item)) {
        if (!this.pc)
          item.expand = !item.expand
        this.changeNum(item.expand, item.children.length)
        /* 触发视图响应 */
        this.$set(this.arry, index, item)
      } else {
        this.routerUrl(item)
      }
    },
    changeExpandItem(item, index) {
      if (this.pc) {
        if (this.hasChildren(item)) {
          item.expand = !item.expand
          // this.changeNum(item.expand, item.children.length)
        }
      }
    },
    routerUrl(item) {
      this.$router.push({ path: item.url })
      if (this.$attrs.pc) this.$emit('unExpandAll')
      else this.$emit('trigger')
    }
  }
}
</script>
<style lang="less">
</style>
