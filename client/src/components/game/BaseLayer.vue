<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Bullet} from "@/types/gametypes";
import {useStore} from "@/stores/store";
import {useGameStore} from "@/stores/gameStore";


const store = useStore();
const gameStore = useGameStore();
const top=ref(0)
const left=ref(0)
const bulletVelocity=ref(10)
const mainSVG=ref(null)

onMounted(()=>{
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
  console.log(xTo,yTo,a,b,c)
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