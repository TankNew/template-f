<template>
  <div class="container page-contactus"
      :style="mapView ? 'background: #000;' : ''"
      @mouseover="mouse = !mouse"
      @mouseout="mouse = !mouse">
    <img v-if="companyInfo.mapImage"
      class="backImg"
      :src="companyInfo.mapImage"
      :style="mouse?'opacity: 0.9;':''"
      @load="mapView = true"
      @error="mapView = false">
    <div class="page-content">
      <div class="contactus">
        <h4 class="page-title">
          <span class="name">{{ currentPath.displayName }}</span>
          <span class="more"></span>
        </h4>
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
      mouse: false,
      mapView: false
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
