<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import GameApi from "@/apis/GameApi";
import NewCharacter from "@/components/game/NewCharacter.vue";
import {useGameStore} from "@/stores/gameStore";
import type {Character} from "@/types/gametypes";

const gameStore = useGameStore();
const characters=ref<Array<Character>>([])

onBeforeMount(()=>{
  getSelectedCharacter();
  getCharacters();
})

function getSelectedCharacter() {
  GameApi.getSelectedCharacter().then(responseData=>{
    gameStore.selectedCharacter = responseData;
  })
}

function getCharacters() {
  GameApi.getCharacters().then(json => {
    characters.value=json;
  })
}

function deleteCharacter(id:string|undefined) {
  GameApi.deleteCharacter(id).then(()=>{
    getCharacters();
  });
}

function selectCharacter(id:string|undefined) {
  GameApi.selectCharacter(id).then(responseData=>{
    gameStore.selectedCharacter = responseData;
  })
}

function isSelected(characterId:string|undefined) {
  return gameStore.selectedCharacter.id && gameStore.selectedCharacter.id === characterId;
}
</script>
<template>
  <div>
    <div v-if="characters">

        <div :key="character.id" v-for="character in characters" class="row row-cols-3">
          <div class="row">
            <svg class="character mb-3 col ">
                <circle ref="player" :fill="character.color"
                        :cx="character.size"
                        :cy="character.size"
                        :r="character.size"/>
            </svg>
            <div class="col d-flex align-items-center">
              <div class="col-sm-6">
                <button class="btn btn-primary mb-3"
                        :class="isSelected(character.id)?'disabled':''"
                        @click="selectCharacter(character.id)">
                  {{isSelected(character?.id)?'SELECTED':'SELECT'}}
                </button>
                <button class="btn btn-danger" @click="deleteCharacter(character.id)">DELETE</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    <NewCharacter @newCharacter="getCharacters()"></NewCharacter>
  </div>
</template>

<style scoped lang="sass">
.character
    height: 100px
    width: 100%
</style>