<script setup lang="ts">
import type {Character} from "@/types/gametypes";
import {useGameStore} from "@/stores/gameStore";

const props=defineProps<{
  character:Character
}>()

const gameStore = useGameStore();

</script>
<template>
    <circle :id="'player'+props.character.id" :fill="props.character.color"
            :cx="props.character.x_axis*gameStore.width/1280"
            :cy="props.character.y_axis*gameStore.width/1280"
            :r="props.character.size*gameStore.width/1280"/>
</template>

<style scoped>

</style>