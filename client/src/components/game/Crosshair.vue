<script lang="ts">
import {defineComponent} from "vue";
import {mapState} from "vuex";

export default defineComponent({
  name: 'Crosshair',
  data() {
    return {
      centerX: document.getElementById('mainSVG')?.getBoundingClientRect().width,
      centerY: document.getElementById('mainSVG')?.getBoundingClientRect().height,
      size: 20
    }
  },
  mounted() {
    this.centerX = this.centerX ? this.centerX / 2 : 0;
    this.centerY = this.centerY ? this.centerY / 2 : 0;

  },
  computed: {
    ...mapState('gameStore', ["mouseX", "mouseY"])
  },
  watch:{
    mouseX(newCenterX) {
      this.centerX=newCenterX
    },
    mouseY(newCenterY) {
      this.centerY=newCenterY
    }
  }
})
</script>

<template>
  <g id="gameCrosshair">
    <circle :cx="centerX" :cy="centerY" r="5" fill="white" stroke="black" stroke-width="1"/>
    <!--Horizontal    -->
    <line :x1="centerX-size/2" :y1="centerY" :x2="centerX+size/2" :y2="centerY" stroke="black" stroke-width="1"/>
    <!--Vertical    -->
    <line :x1="centerX" :y1="centerY-size/2" :x2="centerX" :y2="centerY+size/2" stroke="black" stroke-width="1"/>
  </g>
</template>


<style scoped>

</style>