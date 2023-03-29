<script lang="ts">
import {defineComponent, nextTick} from "vue";
import type {Bullet} from "@/types/gametypes";
import {mapState} from "vuex";

export default defineComponent({
  name: 'Bullets',
  data() {
    return {
      ticks: 0,
      velocity: 10,
      gameWidth: 0,
      gameHeight: 0,
      bullets: [] as Array<Bullet>,
      // bulletsToRemove: [] as Array<Bullet>
    };
  },
  computed: {
    ...mapState(['socket',"loading"]),
    ...mapState('gameStore', ['character'])
  },
  created() {
    let gameRect = document.getElementById('mainSVG')?.getBoundingClientRect();
    if (gameRect?.width && gameRect?.height) {
      this.gameWidth = gameRect?.width;
      this.gameHeight = gameRect?.height;
    }
    this.socket.on("shootBullet", (newBullet: Bullet) => {
      // console.log("bulletShot")
      this.bullets.push(newBullet);
    })
    this.loop();

  },
  methods: {
    loop() {
      this.ticks++;
      this.update()
      requestAnimationFrame(this.loop)
    },

    update() {
      this.bullets.forEach((bullet: Bullet) => {
        bullet.xAxis += bullet.xVelocity;
        bullet.yAxis += bullet.yVelocity;
      })
      nextTick(() => {
        this.bullets = this.bullets.filter((bullet) => {
          return bullet.xAxis + bullet.xVelocity < this.gameWidth
              && bullet.xAxis + bullet.xVelocity > 0
              || bullet.yAxis + bullet.yVelocity < this.gameHeight
              || bullet.yAxis + bullet.yVelocity > 0
        })
      })
    },
  }
})
</script>
<template>
  <g>
    <circle :key="'bullet'+index" v-for="(bullet,index) in bullets"
            :fill="bullet.color"
            :cx="bullet.xAxis"
            :cy="bullet.yAxis"
            :r="bullet.size"/>
  </g>
</template>
<style scoped>

</style>