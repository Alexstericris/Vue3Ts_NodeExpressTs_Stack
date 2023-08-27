<script setup lang="ts">
import Game from "@/components/game/Game.vue";
import {useGameStore} from "@/stores/gameStore";

const gameStore = useGameStore();
</script>

<template>
  <div>
    <div v-if="!gameStore.gameStarted" class="container mt-6 text-center">
      <button  @click="gameStore.gameStarted=true" class="btn bg-white top-100">
        Start
      </button>
    </div>
    <Game v-if="gameStore.gameStarted"></Game>
  </div>
</template>

<style scoped>

</style>