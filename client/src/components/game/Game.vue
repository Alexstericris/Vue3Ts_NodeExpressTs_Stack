<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import BaseLayer from '@/components/game/BaseLayer.vue';
import Player from "@/components/game/Player.vue";
import OtherPlayer from "@/components/game/OtherPlayer.vue";
import GameApi from "@/apis/GameApi";
import type {Character, CharactersCollection} from "@/types/gametypes";
import Bullets from "@/components/game/Bullets.vue";
import CrossHair from "@/components/game/CrossHair.vue";
import {useStore} from "@/stores/store";
import {useGameStore} from "@/stores/gameStore";
import {useRouter} from "vue-router";
import MobilePlayer from "@/components/game/MobilePlayer.vue";
import type {User} from "@/types/types";
// import BaseCanvasLayer from "@/components/game/BaseCanvasLayer.vue";
// import TestCanvasLayer from "@/components/game/TestCanvasLayer.vue";

const router = useRouter()
const store = useStore()
const gameStore = useGameStore();
const height = ref(window.innerWidth)
const width = ref(window.innerWidth)


onMounted(async () => {
  store.room
      ?.joining((user: { id: string, user: User, character: Character }) => {
        gameStore.otherCharacters[user.character.id] = user.character
      })
      .leaving((user:{ id: string, user: User, character: Character })=>{
        delete gameStore.otherCharacters[user.character.id];
      })
      .listenForWhisper('positionUpdated', (character: Character) => {
        if (!gameStore.otherCharacters[character.id]) {
          gameStore.otherCharacters[character.id] = character;
          return;
        }
        gameStore.otherCharacters[character.id].x_axis = character.x_axis;
        gameStore.otherCharacters[character.id].y_axis = character.y_axis
      })
      // .listenForWhisper('playerLeft', (character: Character) => {
      //   console.log("playerLeft")
      //   if (character.id) {
      //     delete gameStore.otherCharacters[character.id];
      //   }
      // })
});

onBeforeUnmount(() => {
  store.echo.leave('game.1')
})

</script>

<template>
  <!--    <TestCanvasLayer></TestCanvasLayer>-->
  <!--    <BaseCanvasLayer></BaseCanvasLayer>-->
  <div class="text-center mt-3">
    <BaseLayer>
      <template v-if="gameStore.character?.id">
        <!--        <MobilePlayer v-if="height<720||width<1280" :character="gameStore.character"></MobilePlayer>-->
        <!--        <template v-else>-->
        <Player :character="gameStore.character"></Player>
        <CrossHair></CrossHair>
        <!--        </template>-->
      </template>
      <Bullets></Bullets>
      <template :key="otherCharacter?.id" v-for="(otherCharacter) in gameStore.otherCharacters">
        <OtherPlayer v-if="gameStore.character?.id!==otherCharacter?.id"
                     :character="otherCharacter"
                     :is="'OtherPlayer'"></OtherPlayer>
      </template>
    </BaseLayer>
  </div>
</template>

<style scoped>

</style>