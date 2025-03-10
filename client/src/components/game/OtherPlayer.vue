<script setup lang="ts">
import type {Character} from "@/types/gametypes";
import {useGameStore} from "@/stores/gameStore";

const props=defineProps<{
  character:Character
}>()

const gameStore = useGameStore();

</script>
<template>
    <circle :id="'player'+props.character.id" :fill="props.character.attributes.color"
            :cx="props.character.position.xAxis*gameStore.width/1280"
            :cy="props.character.position.yAxis*gameStore.width/1280"
            :r="props.character.attributes.size*gameStore.width/1280"/>
</template>

<style scoped>

</style>