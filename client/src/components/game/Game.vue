<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref} from "vue";
import BaseLayer from '@/components/game/BaseLayer.vue';
import Player from "@/components/game/Player.vue";
import OtherPlayer from "@/components/game/OtherPlayer.vue";
import GameApi from "@/apis/GameApi";
import type {Character, CharactersCollection, Position} from "@/types/gametypes";
import Bullets from "@/components/game/Bullets.vue";
import CrossHair from "@/components/game/CrossHair.vue";
import {useStore} from "@/stores/store";
import {useGameStore} from "@/stores/gameStore";
import {useRouter} from "vue-router";
import MobilePlayer from "@/components/game/MobilePlayer.vue";
// import BaseCanvasLayer from "@/components/game/BaseCanvasLayer.vue";
// import TestCanvasLayer from "@/components/game/TestCanvasLayer.vue";

const router=useRouter()
const store=useStore()
const gameStore = useGameStore();
const height=ref(window.innerWidth)
const width=ref(window.innerWidth)

onBeforeMount(async ()=>{
  await GameApi.getSelectedCharacter().then(responseData=>{
    if (!responseData) {
      window.location.href = '/characters';
    }
    gameStore.character=responseData
  })
  store.socket.emit('pendingGameJoin', gameStore.character as any);
  store.socket.on('playerJoined', (characters: CharactersCollection) => {
    if (gameStore.character.id) {
      delete characters[gameStore.character.id];
    }
    gameStore.otherCharacters = characters;
  });
  store.socket.on('positionUpdated', (characterId: string, position: Position) => {
    let temp=gameStore.otherCharacters
    temp[characterId].position=position
    gameStore.otherCharacters=temp
  })
  store.socket.on('playerLeft', (character: Character) => {
    console.log("playerLeft")
    if (character.id) {
      delete gameStore.otherCharacters[character.id];
    }
  });
});

onBeforeUnmount(()=>{
  store.socket.emit('playerLeft', gameStore.character as any);
})

</script>

<template>
  <!--    <TestCanvasLayer></TestCanvasLayer>-->
  <!--    <BaseCanvasLayer></BaseCanvasLayer>-->
  <div class="text-center mt-6">
    <BaseLayer>
      <template v-if="gameStore.character?.id">
        <MobilePlayer v-if="height<720||width<1280" :character="gameStore.character"></MobilePlayer>
        <template v-else>
          <Player :character="gameStore.character"></Player>
          <CrossHair></CrossHair>
        </template>
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