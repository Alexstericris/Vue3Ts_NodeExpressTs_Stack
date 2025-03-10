<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type {Character} from "@/types/gametypes";
import {useStore} from "@/stores/store";
import {useGameStore} from "@/stores/gameStore";
import {useMobileGameStore} from "@/stores/mobileGameStore";

const store = useStore();
const gameStore = useGameStore();
const mobileGameStore=useMobileGameStore()

const playerSize=computed(()=>{
  return gameStore.character.attributes.size*gameStore.width/1280
})
const xAxis = ref(100);
const yAxis = ref(100);
const prevXAxis = ref(0);
const prevYAxis = ref(0);
const ticks = ref(0);
const ticksRate = ref(10);
const acceleration = ref(1);
const velocity = ref(0);
const maxVelocity= ref(10);
const mainSVG = ref<HTMLElement|null>(document.getElementById('mainSVG'));
const hitOpacity = ref(0);
const top=ref(0)
const left=ref(0)
const xVelocity=ref(0)
const yVelocity=ref(0)

let time=new Date()
function loop() {
  var time2 = new Date;
  if ((time2.getTime() - time.getTime()) > 10) {
    ticks.value++
    update()
    isHit();
    time = time2;
  }
  requestAnimationFrame(loop)
}

function setStartingPosition() {
  if (gameStore.character.position.xAxis) {
    xAxis.value = gameStore.character.position.xAxis;
  }
  if (gameStore.character.position.yAxis) {
    yAxis.value = gameStore.character.position.yAxis;
  }
}

function isHit() {
  if (gameStore.character.isHit&&hitOpacity.value<=0) {
    hitOpacity.value=0.7
  }
  if (hitOpacity.value>0) {
    hitOpacity.value -= 0.02;
  }
}

function persistPosition(){
  let position={
    xAxis:xAxis.value*1280/gameStore.width,
    yAxis:yAxis.value*1280/gameStore.width
  }
  gameStore.character.position = position;
  store.socket.emit('positionUpdated', gameStore.character.id as any, position as any)
}

function getHealthPercentage() {
  return gameStore.character.attributes.health_points / gameStore.character.attributes.max_health_points;
}
function update() {
  if (mobileGameStore.clicked) {
    if (ticks.value % ticksRate.value === 0) {
      if (velocity.value < maxVelocity.value) {
        velocity.value += acceleration.value
      } else {
        velocity.value = maxVelocity.value;
      }
    }
    movePlayer()
  } else{
    movePlayer()
    if (ticks.value % ticksRate.value === 0) {
      if (velocity.value > 0) {
        velocity.value -= acceleration.value
      } else {
        velocity.value = 0;
      }
    }
  }
}

function movePlayer() {
  prevXAxis.value=xAxis.value
  prevYAxis.value=yAxis.value
  if (mobileGameStore.clicked) {
    let xTo = mobileGameStore.clickX - left.value
    let yTo = mobileGameStore.clickY - top.value
    let b = xTo - xAxis.value
    let c = yTo - yAxis.value
    let a = Math.sqrt(b ** 2 + c ** 2)
    let ratio = velocity.value / a * gameStore.width / 1280;
    xVelocity.value = ratio * b
    yVelocity.value = ratio * c
    xAxis.value += xVelocity.value;
    yAxis.value += yVelocity.value;
  }
  else{
    let xTo=prevXAxis.value + xVelocity.value
    let yTo=prevYAxis.value + yVelocity.value
    let b = xTo - xAxis.value
    let c = yTo - yAxis.value
    let a = Math.sqrt(b ** 2 + c ** 2)
    if (a !== 0) {
      let ratio = velocity.value / a * gameStore.width / 1280;
      xVelocity.value = ratio * b

      yVelocity.value = ratio * c
      xAxis.value += xVelocity.value;
      yAxis.value += yVelocity.value;
    }
  }
  if (xAxis.value<playerSize.value) {
    xAxis.value=playerSize.value
  }
  if (yAxis.value<playerSize.value) {
    yAxis.value=playerSize.value
  }
  if (mainSVG.value instanceof SVGElement && xAxis.value > (mainSVG.value?.getBoundingClientRect().width - playerSize.value)) {
    xAxis.value = mainSVG.value.getBoundingClientRect().width - playerSize.value
  }
  if (mainSVG.value instanceof SVGElement && yAxis.value > (mainSVG.value?.getBoundingClientRect().height - playerSize.value)) {
    yAxis.value = mainSVG.value.getBoundingClientRect().height - playerSize.value
  }
  if (prevXAxis.value !== xAxis.value || prevYAxis.value !== yAxis.value) {
    persistPosition();
  }
}

onMounted(()=> {
  setStartingPosition();
  if (mainSVG.value instanceof SVGElement) {
    top.value = mainSVG.value.getBoundingClientRect().top;
    left.value = mainSVG.value.getBoundingClientRect().left
  }
  loop();
  let fingerMoveHandler=(event:TouchEvent)=>{
    mobileGameStore.clicked=true
    if (event?.touches.length) {
      mobileGameStore.clickX=event.touches[0].clientX;
      mobileGameStore.clickY=event.touches[0].clientY
    }
  }
  let fingerUpHandler=(event:TouchEvent)=>{
    mobileGameStore.clicked=false
  }
  document.addEventListener("touchmove",fingerMoveHandler);
  document.addEventListener("touchend",fingerUpHandler);
})
</script>
<template>
  <g>
    <rect class="hitOverlay" x="0" y="0" width="100%" height="100%" :fill="'rgba(255, 0, 0,'+hitOpacity+ ')'"></rect>
    <circle ref="player" :fill="gameStore.character.attributes.color"
            :cx="xAxis"
            :cy="yAxis"
            :r="playerSize"/>
    <template v-if="gameStore.character.attributes.health_points<gameStore.character.attributes.max_health_points">
      <rect :x="xAxis -playerSize"
            :y="yAxis+ playerSize +10"
            :width="playerSize*2"
            height="10" fill="#ff0000">

      </rect>
      <rect :x="xAxis -playerSize"
            :y="yAxis+ playerSize +10"
            :width="playerSize*2*getHealthPercentage()"
            height="10" fill="#00ff00"></rect>
    </template>
  </g>
</template>
<style scoped lang="sass">
.hitOverlay
  transition: opacity 1s ease-out
</style>