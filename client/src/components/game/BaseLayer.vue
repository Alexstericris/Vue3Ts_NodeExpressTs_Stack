<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import type {Bullet} from "@/types/gametypes";
import {useStore} from "@/stores/store";
import {useGameStore} from "@/stores/gameStore";


const store = useStore();
const gameStore = useGameStore();
const top=ref(0)
const left=ref(0)
const bulletVelocity=ref(10)
const mainSVG=ref<SVGSVGElement>({} as SVGSVGElement)
const height=ref(window.innerWidth)
const width=ref(window.innerWidth)

onMounted(()=>{
  if (height.value < 720||width.value < 1280) {
    if (mainSVG.value) {
      mainSVG.value.requestFullscreen();
    }
  }
  top.value=(mainSVG.value as SVGElement).getBoundingClientRect().top
  left.value=(mainSVG.value as SVGElement).getBoundingClientRect().left
})

function onMouseMove($event: MouseEvent) {
  gameStore.mouseX=$event.clientX - left.value
  gameStore.mouseY=$event.clientY - top.value
}

function onClick($event: MouseEvent) {
  let xTo=$event.clientX - left.value
  let yTo=$event.clientY - top.value
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
    character_id: gameStore.character._id,
    size: 10,
    damage: 10
  }
  store.socket.emit('shootBullet',bullet as any)
}
</script>

<template>
  <svg id="mainSVG"
       ref="mainSVG"
       class="bg-white"
       :class="height < 720||width < 1280?'':'rounded'"
       @click="onClick($event)"
       @mousemove="onMouseMove($event)">
    <slot></slot>
  </svg>
</template>

<style scoped>
#mainSVG {
  height: 720px;
  width: 1280px;
}
</style>