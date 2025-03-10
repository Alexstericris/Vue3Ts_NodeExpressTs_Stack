<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import type {Bullet} from "@/types/gametypes";
import {useStore} from "@/stores/store";
import {useGameStore} from "@/stores/gameStore";


const store = useStore();
const gameStore = useGameStore();
const isMobile = ref(false);
const isLandscape = ref(false);
const top=ref(0)
const left=ref(0)
const bulletVelocity=ref(10)
const mainSVG=ref<SVGSVGElement>({} as SVGSVGElement)

onMounted(()=>{
  if (window.innerHeight < 720 || window.innerWidth < 1280) {
    isMobile.value = true;
    gameStore.width = window.innerWidth - 10;
    gameStore.height = gameStore.width / 1280 * 720;
  }
  top.value=(mainSVG.value as SVGElement).getBoundingClientRect().top
  left.value=(mainSVG.value as SVGElement).getBoundingClientRect().left
})

function onMouseMove($event: MouseEvent) {
  gameStore.mouseX=$event.clientX - left.value
  gameStore.mouseY=$event.clientY - top.value
}

function onClick($event: MouseEvent) {
  let xTo=($event.clientX - left.value)*1280/gameStore.width
  let yTo=($event.clientY - top.value)*1280/gameStore.width
  let b = xTo - gameStore.character.position.xAxis
  let c = yTo - gameStore.character.position.yAxis
  let a = Math.sqrt(b ** 2 + c ** 2)
  let ratio = bulletVelocity.value / a;
  let xVelocity = ratio * b
  let yVelocity = ratio * c
  let bullet:Bullet = {
    xAxis: gameStore.character.position.xAxis,
    yAxis: gameStore.character.position.yAxis,
    xTo: xTo,
    yTo: yTo,
    xVelocity: xVelocity,
    yVelocity: yVelocity,
    color: gameStore.character.attributes.color,
    characterid: gameStore.character.id,
    size: 10,
    damage: 10
  }
  console.log(gameStore.character.position,bullet)
  store.socket.emit('shootBullet',bullet as any)
}
</script>

<template>
  <div>
    <svg id="mainSVG"
         ref="mainSVG"
         class="bg-white rounded"
         :style="'height: '+gameStore.height+'px; width: '+gameStore.width+'px;'"
         @click="onClick($event)"
         @mousemove="onMouseMove($event)">
      <slot></slot>
    </svg>
  </div>
</template>

<style scoped>
</style>