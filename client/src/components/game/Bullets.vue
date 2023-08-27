<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
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
const bullets = ref([]);

store.socket.on("shootBullet", (newBullet: Bullet) => {
  console.log("bulletShot")
  bullets.value.push(newBullet)
})

onMounted(()=>{
  let gameRect = document.getElementById('mainSVG')?.getBoundingClientRect();
  if (gameRect?.width && gameRect?.height) {
      gameWidth.value = gameRect.width;
      gameHeight.value = gameRect.height;
  }

  loop();
});

function loop() {
  ticks.value++
  update()
  requestAnimationFrame(loop)
}

function update() {
  for (let i = 0; i < bullets.value.length; i++) {
    let bullet = bullets.value[i];
    bullet.xAxis += bullet.xVelocity;
    bullet.yAxis += bullet.yVelocity;
    bullets.value[i]=bullet
    collided(bullet, i);
  }
  // bullets.value.forEach((bullet: Bullet,index:number) => {
  //   bullet.xAxis += bullet.xVelocity;
  //   bullet.yAxis += bullet.yVelocity;
  //   collided(bullet,index);
  // });
  nextTick(() => {
    bullets.value=bullets.value.filter((bullet) => {
      return bullet.xAxis + bullet.xVelocity < gameWidth.value
          && bullet.xAxis + bullet.xVelocity > 0
          && bullet.yAxis + bullet.yVelocity < gameHeight.value
          && bullet.yAxis + bullet.yVelocity > 0
    })
  })
}

function collided(bullet:Bullet,index:number) {
  //i got hit by other bullet
  let a=GameHelper.distance({xAxis: bullet.xAxis, yAxis: bullet.yAxis}, gameStore.character.position)
  // console.log(bullet.character_id,gameStore.character._id,a,bullet.size,gameStore.character.attributes.size)
  if (bullet.character_id!==gameStore.character._id
      &&(a - bullet.size - gameStore.character.attributes.size) <= 0) {
    nextTick(() => {
      console.log('got hit');
      gameStore.character.isHit = true;
      gameStore.character.attributes.health_points -= bullet.damage;
      bullets.value.splice(index, 1);
      if (gameStore.character.attributes.health_points<=0) {
        store.socket.emit('playerLeft',gameStore.character as any)
        gameStore.gameStarted=false;
      }
      setTimeout(() => {
        gameStore.character.isHit = false;
      }, 70);
    })
  }
  for (let characterId in gameStore.otherCharacters) {
    let hit=false
    a = GameHelper.distance({xAxis: bullet.xAxis, yAxis: bullet.yAxis}, gameStore.otherCharacters[characterId].position);
    if ((a - bullet.size - gameStore.otherCharacters[characterId].attributes.size) <= 0) {
      hit = true;
    }
    if (hit && bullet.character_id!==gameStore.otherCharacters[characterId]._id&&!gameStore.otherCharacters[characterId].isHit) {
      gameStore.otherCharacters[characterId].isHit = true;
      console.log(gameStore.otherCharacters[characterId]._id + " hit")
      store.socket.emit("enemyHit",gameStore.otherCharacters[characterId] as any)
      setTimeout(() => {
        gameStore.otherCharacters[characterId].isHit = false;
      }, 70);
      nextTick(() => {
        bullets.value.splice(index, 1);
      })
    }
  }
/*
  gameStore.otherCharacters.forEach((character: Character) => {
    let hit=false
    a = GameHelper.distance({xAxis: bullet.xAxis, yAxis: bullet.yAxis}, character.position);
    if ((a - bullet.size - character.attributes.size) <= 0) {
      hit = true;
    }
    //oponent hit
    if (hit && bullet.character_id!==character._id&&!character.isHit) {
      character.isHit = true;
      console.log(character._id + " hit")
      store.socket.emit("enemyHit",character as any)
      setTimeout(() => {
        character.isHit = false;
      }, 70);
      nextTick(() => {
        bullets.value.splice(index, 1);
      })
    }
  });
*/
}

</script>
<template>
  <g>
    <circle v-for="(bullet) in bullets"
            :fill="bullet.color"
            :cx="bullet.xAxis"
            :cy="bullet.yAxis"
            :r="bullet.size"/>
  </g>
</template>
<style scoped>

</style>