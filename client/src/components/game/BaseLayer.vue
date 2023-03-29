<script lang="ts">
import {defineComponent} from "vue";
import {mapState} from "vuex";

export default defineComponent({
  name: 'BaseLayer',
  data() {
    return {
      top: 0,
      left: 0,
      bulletVelocity:10,
    }
  },
  computed: {
    ...mapState(['socket']),
    ...mapState('gameStore', ["character"]),
  },
  mounted() {
    this.top = (this.$refs.mainSVG as SVGElement).getBoundingClientRect().top
    this.left = (this.$refs.mainSVG as SVGElement).getBoundingClientRect().left
  },
  methods: {
    onMouseMove($event: MouseEvent) {
      this.$store.commit("gameStore/setCoordinates", {
        mouseX: $event.clientX - this.left,
        mouseY: $event.clientY - this.top,
      })
    },
    onClick($event: MouseEvent) {
      let xTo=$event.clientX - this.left
      let yTo=$event.clientY - this.top
      let b = xTo - this.character.position.xAxis
      let c = yTo - this.character.position.yAxis
      let a = Math.sqrt(b ** 2 + c ** 2)
      let ratio = this.bulletVelocity / a;
      let xVelocity = ratio * b
      let yVelocity = ratio * c
      let bullet = {
        xAxis: this.character.position.xAxis,
        yAxis: this.character.position.yAxis,
        xTo: xTo,
        yTo: yTo,
        xVelocity:xVelocity,
        yVelocity:yVelocity,
        color: this.character.attributes.color,
        character_id: this.character._id,
        size: 10,
      }
      // console.log("shootBullet")
      this.socket.emit('shootBullet',bullet)
    },
  }
});
</script>

<template>
  <svg id="mainSVG" ref="mainSVG" class="bg-white rounded" @click="onClick($event)"
       @mousemove="onMouseMove($event)">
    <slot></slot>
  </svg>
</template>

<style scoped>
#mainSVG {
  height: 720px;
  width: 100%
}
</style>