<script setup lang="ts">
import {nextTick, onMounted, ref,computed} from "vue";
import type {Bullet} from "@/types/gametypes";
import GameHelper from "@/helpers/GameHelper";
import {useStore} from "@/stores/store";
import {useGameStore} from "@/stores/gameStore";

const store = useStore();
const gameStore = useGameStore();
const ticks = ref(0)
const velocity = ref(10)
const gameWidth = ref(0)
const gameHeight = ref(0)
// const bullets = ref<Array<Bullet>>([]);
const playerSize=computed(()=>{
  return gameStore.character.size * gameStore.width / 1280
})
store.room?.listenForWhisper("shootBullet", (newBullet: Bullet) => {
  console.log("bulletShot")
  gameStore.bullets.push(newBullet)
})

onMounted(() => {
  let gameRect = document.getElementById('mainSVG')?.getBoundingClientRect();
  if (gameRect?.width && gameRect?.height) {
      gameWidth.value = gameRect.width;
      gameHeight.value = gameRect.height;
  }

  loop();
});
let time=new Date()
function loop() {
  var time2 = new Date;
  if ((time2.getTime() - time.getTime())>10) {
    ticks.value++
    update()
    time = time2;
  }
  requestAnimationFrame(loop)
}

function update() {
  for (let i = 0; i < gameStore.bullets.length; i++) {
    let bullet = gameStore.bullets[i];
    bullet.xAxis += bullet.xVelocity;
    bullet.yAxis += bullet.yVelocity;
    gameStore.bullets[i]=bullet
    collided(bullet, i);
  }
  nextTick(() => {
    gameStore.bullets=gameStore.bullets.filter((bullet) => {
      return (bullet.xAxis + bullet.xVelocity)*gameStore.width/1280 < gameStore.width
          && (bullet.xAxis + bullet.xVelocity)*gameStore.width/1280 > 0
          && (bullet.yAxis + bullet.yVelocity)*gameStore.width/1280 < gameStore.height
          && (bullet.yAxis + bullet.yVelocity)*gameStore.width/1280 > 0
    })
  })
}

function collided(bullet:Bullet,index:number) {
  //i got hit by other bullet
  let a = GameHelper.distance(bullet.xAxis, bullet.yAxis, gameStore.character.x_axis, gameStore.character.y_axis, gameStore.width / 1280)
  // console.log(bullet.characterid,gameStore.character.id,a,bullet.size,gameStore.character.attributes.size)
  if (bullet.characterid !== gameStore.character.id
      && (a - bullet.size - playerSize.value) <= 0) {
    nextTick(() => {
      console.log('got hit');
      gameStore.character.isHit = true;
      gameStore.character.health_points -= bullet.damage;
      gameStore.bullets.splice(index, 1);
      if (gameStore.character.health_points<=0) {
        store.room?.whisper('playerLeft',gameStore.character as any)
        gameStore.gameRunning=false;
      }
      setTimeout(() => {
        gameStore.character.isHit = false;
      }, 70);
    })
  }
  for (let characterId in gameStore.otherCharacters) {
    let hit = false
    a = GameHelper.distance(bullet.xAxis, bullet.yAxis, gameStore.otherCharacters[characterId].x_axis, gameStore.otherCharacters[characterId].y_axis, gameStore.width / 1280);
    if ((a - bullet.size - gameStore.otherCharacters[characterId].size * gameStore.width / 1280) <= 0) {
      hit = true;
    }
    if (hit && bullet.characterid!==gameStore.otherCharacters[characterId].id&&!gameStore.otherCharacters[characterId].isHit) {
      gameStore.otherCharacters[characterId].isHit = true;
      console.log(gameStore.otherCharacters[characterId].id + " hit")
      store.room?.whisper("enemyHit",gameStore.otherCharacters[characterId] as any)
      setTimeout(() => {
        gameStore.otherCharacters[characterId].isHit = false;
      }, 70);
      nextTick(() => {
        gameStore.bullets.splice(index, 1);
      })
    }
  }
}

</script>
<template>
  <g>
    <circle v-for="(bullet) in gameStore.bullets"
            :fill="bullet.color"
            :cx="bullet.xAxis*gameStore.width/1280"
            :cy="bullet.yAxis*gameStore.width/1280"
            :r="bullet.size*gameStore.width/1280"/>
  </g>
</template>
<style scoped>

</style>