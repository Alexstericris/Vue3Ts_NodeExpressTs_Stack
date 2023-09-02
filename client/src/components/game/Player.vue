<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type {Character} from "@/types/gametypes";
import {useStore} from "@/stores/store";
import {useGameStore} from "@/stores/gameStore";

const props=defineProps<{
  character:Character
}>()
const store = useStore();
const gameStore = useGameStore();
const playerSize=computed(()=>{
  return gameStore.character.attributes.size*gameStore.width/1280
})
const xAxis = ref(100);
const yAxis = ref(100);
const xDir=ref('');
const yDir=ref('');
const direction = ref('');
const ticks = ref(0);
const ticksRate = ref(10);
const acceleration = ref(1);
const velocity = ref(0);
const maxVelocity= ref(10);
const heading=ref('');
const gameLoop=ref(null);
const mainSVG = ref(document.getElementById('mainSVG'));
const hitOpacity = ref(0);
const inputs=computed(()=>{
  return xDir.value||yDir.value
})
const noInputs=computed(()=>{
  return !xDir.value&&!yDir.value
})
let time=new Date()
function loop() {
  var time2 = new Date;
  if ((time2.getTime() - time.getTime())>10) {
    ticks.value++
    update()
    isHit();
    time = time2;
  }
  requestAnimationFrame(loop)
}

function setStartingPosition() {
  xAxis.value = props.character.position.xAxis;
  yAxis.value = props.character.position.yAxis;
}

function isHit() {
  if (props.character.isHit&&hitOpacity.value<=0) {
    hitOpacity.value=0.7
  }
  if (hitOpacity.value>0) {
    hitOpacity.value -= 0.02;
  }
}

function persistPosition(){
  let position={
    xAxis:xAxis.value,
    yAxis:yAxis.value
  }
  gameStore.character.position = position;
  store.socket.emit('positionUpdated', props.character._id as any, position as any)
}


function movePlayer() {
  let positionChanged=false
  if (direction.value.includes('up')) {
    if(yAxis.value - velocity.value < 50){
      yAxis.value=playerSize.value
    }else{
      yAxis.value -= velocity.value;
    }
    positionChanged=true
  }
  if (direction.value.includes('left')) {
    if(xAxis.value - velocity.value < 50){
      xAxis.value=playerSize.value
    }else{
      xAxis.value -= velocity.value;
    }
    positionChanged=true
  }
  if (direction.value.includes('down')) {
    if(yAxis.value + velocity.value > 670){
      yAxis.value=670
    }else{
      yAxis.value += velocity.value;
    }
    positionChanged=true
  }
  if (direction.value.includes('right')) {
    let gameWidth = document.getElementById('mainSVG')?.getBoundingClientRect().width;
    if(gameWidth){
      if(xAxis.value + velocity.value > (gameWidth-playerSize.value)){
        xAxis.value=gameWidth-playerSize.value
      }else{
        xAxis.value += velocity.value;
      }
      positionChanged=true
    }
  }
  if(positionChanged){
    persistPosition();
  }
}

function getHealthPercentage() {
  return props.character.attributes.health_points / props.character.attributes.max_health_points;
}
function update() {
  if (inputs.value) {
    if (ticks.value % ticksRate.value === 0) {
      if (velocity.value < maxVelocity.value) {
        velocity.value += acceleration.value
      } else {
        velocity.value = maxVelocity.value;
      }
    }
    movePlayer()
  } else if (direction.value) {
    movePlayer()
    if (ticks.value % ticksRate.value === 0) {
      if (velocity.value > 0) {
        velocity.value -= acceleration.value
      } else {
        velocity.value = 0;
        direction.value = '';
      }
    }
  }
}


onMounted(()=> {
  setStartingPosition();
  loop();
  let keyDownHandler=(event:KeyboardEvent)=>{
    event.preventDefault();
    if(event.key==="Escape"){
      document.removeEventListener('keydown',keyDownHandler,false)
    }
    if (event.key === 'ArrowUp' || event.key === 'w') {
      yDir.value = 'up';
    }
    if (event.key === 'ArrowLeft' || event.key === 'a') {
      xDir.value = 'left';
    }
    if (event.key === 'ArrowDown' || event.key === 's') {
      yDir.value = 'down';
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
      xDir.value = 'right';
    }
    direction.value = yDir.value + xDir.value;
  }
  let keyUpHandler=(event:KeyboardEvent)=>{
    event.preventDefault();
    if(event.key==="Escape"){
      document.removeEventListener('keydown',keyUpHandler,false)
    }
    if (['ArrowUp', 'ArrowDown', 'w', 's'].includes(event.key)) {
      yDir.value = '';
    }
    if (['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(event.key)) {
      xDir.value = '';
    }
  }
  document.addEventListener("keydown",keyDownHandler);
  document.addEventListener("keyup",keyUpHandler);
})
</script>
<template>
  <g>
    <rect class="hitOverlay" x="0" y="0" width="100%" height="100%" :fill="'rgba(255, 0, 0,'+hitOpacity+ ')'"></rect>
    <circle ref="player" :fill="character.attributes.color"
            :cx="xAxis"
            :cy="yAxis"
            :r="playerSize"/>
    <template v-if="character.attributes.health_points<character.attributes.max_health_points">
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