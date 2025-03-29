<script setup lang="ts">
import Game from "@/components/game/Game.vue";
import {useGameStore} from "@/stores/gameStore";
import {onBeforeMount, onBeforeUnmount} from "vue";
import {useStore} from "@/stores/store";
import GameLayout from "@/views/Layouts/GameLayout.vue";
import MainLayout from "@/views/Layouts/MainLayout.vue";
import GameApi from "@/apis/GameApi";

const store = useStore();
const gameStore = useGameStore();
onBeforeMount(async () => {
  let app = document.getElementById('app');
  if (app) {
    app.style.touchAction = 'none';
  }
  await GameApi.getSelectedCharacter().then(responseData => {
    if (!responseData) {
      window.location.href = '/characters';
    }
    gameStore.character = responseData
  })
});
onBeforeUnmount(() => {
  let app = document.getElementById('app');
  if (app) {
    app.style.touchAction = 'auto';
  }
});

function joinGame() {
  gameStore.gameRunning = true
  store.room = store.echo.join(`game.1`)?.here((users: any) => {
    gameStore.otherCharacters = {}
    users.forEach(user => {
      if (user.character && user.character?.id !== gameStore.character?.id) {
        gameStore.otherCharacters[user.character.id] = user.character
      }
    })
  })
}

function leaveGame() {
  gameStore.gameRunning = false;
}
</script>
<template>
  <MainLayout v-if="!gameStore.gameRunning">
    <div>
      <div class="container mt-6 text-center">
        <button @click="joinGame" class="btn bg-white top-100">
          Start
        </button>
      </div>
    </div>
  </MainLayout>
  <GameLayout v-else>
    <div class="container mt-2 text-center">
      <button @click="leaveGame" class="btn bg-white top-100">
        Leave
      </button>
    </div>
    <Game></Game>
  </GameLayout>
</template>

<style scoped>

</style>