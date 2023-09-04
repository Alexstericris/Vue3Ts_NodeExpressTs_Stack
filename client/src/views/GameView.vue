<script setup lang="ts">
import Game from "@/components/game/Game.vue";
import {useGameStore} from "@/stores/gameStore";
import {onBeforeMount, onBeforeUnmount} from "vue";

const gameStore = useGameStore();
onBeforeMount(()=>{
  let app = document.getElementById('app');
  if (app) {
    app.style.touchAction = 'none';
  }
});
onBeforeUnmount(()=>{
  let app = document.getElementById('app');
  if (app) {
    app.style.touchAction = 'auto';
  }
});
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