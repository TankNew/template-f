<template>
  <div class="container page-contactus"
      @mouseover="mouse = !mouse"
      @mouseout="mouse = !mouse">
    <!-- <img class="backImg"
      src="@/assets/imgs/a6045784fd939284eb864fbf420f26e5.png"
      :style="mouse?'opacity: 0.9;':''"> -->
    <div class="page-content">
      <h4 class="page-title">
        <span class="name">{{ currentPath.displayName }}</span>
        <span class="more"></span>
      </h4>
      <div class="contactus">
        <ul>
          <!-- <li>
            <label>{{ $L(`CompanyName`) }}</label>
            {{ companyInfo.appName }}
          </li> -->
          <li>
            <!-- <label>{{ $L(`Address`) }}</label> -->
            <i class="fas fa-phone-alt"></i>
            {{ companyInfo.tel }}
          </li>
          <li>
            <!-- <label>{{ $L(`Tel`) }}</label> -->
            <i class="fas fa-location-arrow"></i>
            {{ companyInfo.appAddress }}
          </li>
          <li>
            <!-- <label>{{ $L(`Email`) }}</label> -->
            <i class="fas fa-envelope"></i>
            {{ companyInfo.email }}
          </li>
        </ul>
        <!-- <img class="sign" src="@/assets/imgs/cc-ad-img.jpg"> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      mouse: false
    }
  },
  computed: {
    ...mapState({
      companyInfo: state => state.app.companyInfo,
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  created() {}
}
</script>
