<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useGameStore} from "@/stores/gameStore";

const gameStore=useGameStore()
const centerX=ref()
const centerY=ref()
const size=ref(20)

onMounted(() => {
  centerX.value=document.getElementById('mainSVG')?.getBoundingClientRect().width
  centerY.value=document.getElementById('mainSVG')?.getBoundingClientRect().height
  centerX.value = centerX.value ? (centerX.value / 2) : 0
  centerY.value = centerY.value ? (centerY.value / 2) : 0
})

watch(()=> gameStore.mouseX,
    (newValue) => {
        centerX.value=newValue as number
    })

watch(()=> gameStore.mouseY,
    (newValue) => {
        centerY.value=newValue as number
    })

</script>

<template>
  <g id="gameCrosshair" v-if="centerX !== undefined && centerY !== undefined">
    <circle :cx="centerX" :cy="centerY" r="5" fill="white" stroke="black" stroke-width="1"/>
    <!--Horizontal    -->
    <line :x1="centerX-size/2" :y1="centerY" :x2="centerX+size/2" :y2="centerY" stroke="black" stroke-width="1"/>
    <!--Vertical    -->
    <line :x1="centerX" :y1="centerY-size/2" :x2="centerX" :y2="centerY+size/2" stroke="black" stroke-width="1"/>
  </g>
</template>


<style scoped>

</style>