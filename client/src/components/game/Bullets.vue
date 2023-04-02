<script lang="ts">
import {defineComponent, nextTick} from "vue";
import type {Bullet, Character} from "@/types/gametypes";
import {mapState} from "vuex";
import GameHelper from "@/helpers/GameHelper";

export default defineComponent({
  name: 'Bullets',
  data() {
    return {
      ticks: 0,
      velocity: 10,
      gameWidth: 0,
      gameHeight: 0,
      bullets: [] as Array<Bullet>,
    };
  },
  computed: {
    ...mapState(['socket', "loading"]),
    ...mapState('gameStore', ['character', 'otherCharacters'])
  },
  mounted() {
    let gameRect = document.getElementById('mainSVG')?.getBoundingClientRect();
    if (gameRect?.width && gameRect?.height) {
      this.gameWidth = gameRect?.width;
      this.gameHeight = gameRect?.height;
    }
    this.socket.on("shootBullet", (newBullet: Bullet) => {
      // console.log("bulletShot")
      nextTick(() => {
        this.bullets = this.bullets.concat([newBullet])
      })
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
      this.bullets.forEach((bullet: Bullet,index:number) => {
        bullet.xAxis += bullet.xVelocity;
        bullet.yAxis += bullet.yVelocity;
        this.collided(bullet,index);
      });
      nextTick(() => {
        this.bullets = this.bullets.filter((bullet) => {
          return bullet.xAxis + bullet.xVelocity < this.gameWidth
              && bullet.xAxis + bullet.xVelocity > 0
              && bullet.yAxis + bullet.yVelocity < this.gameHeight
              && bullet.yAxis + bullet.yVelocity > 0
        })
      })
    },
    collided(bullet:Bullet,index:number) {
      //i got hit by other bullet
      let a=GameHelper.distance({xAxis: bullet.xAxis, yAxis: bullet.yAxis}, this.character.position)
      if (bullet.character_id!==this.character._id
          &&(a - bullet.size - this.character.attributes.size) <= 0) {
        nextTick(() => {
          console.log('got hit');
          this.character.isHit = true;
          this.character.attributes.health_points -= bullet.damage;
          this.bullets.splice(index, 1);
          if (this.character.attributes.health_points<=0) {
            this.socket.emit('playerLeft',this.character)
            this.$store.commit("gameStore/setGameStarted", false);
          }
          setTimeout(() => {
            this.character.isHit = false;
          }, 70);
        })
      }
      this.otherCharacters.forEach((character: Character) => {
        let hit=false
        a = GameHelper.distance({xAxis: bullet.xAxis, yAxis: bullet.yAxis}, character.position);
        if ((a - bullet.size - character.attributes.size) <= 0) {
          hit = true;
        }
        //oponent hit
        if (hit && bullet.character_id!==character._id&&!character.isHit) {
          character.isHit = true;
          console.log(character._id + " hit")
          this.socket.emit("enemyHit",character)
          setTimeout(() => {
            character.isHit = false;
          }, 70);
          nextTick(() => {
            this.bullets.splice(index, 1);
          })
        }
      });
    }
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