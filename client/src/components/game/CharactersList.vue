<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import GameApi from "@/apis/GameApi";
import NewCharacter from "@/components/game/NewCharacter.vue";
import {useGameStore} from "@/stores/gameStore";

const gameStore = useGameStore();
const characters=ref([])

onBeforeMount(()=>{
  getSelectedCharacter();
  getCharacters();
})

function getSelectedCharacter() {
  GameApi.getSelectedCharacter().then(response=>{
    gameStore.selectedCharacter = response.data;
    console.log(gameStore.selectedCharacter)
  })
}

function getCharacters() {
  GameApi.getCharacters().then(res => {
    characters.value=res.data;
  })
}

function deleteCharacter(_id:string|undefined) {
  GameApi.deleteCharacter(_id).then(()=>{
    getCharacters();
  });
}

function selectCharacter(_id:string|undefined) {
  GameApi.selectCharacter(_id).then(response=>{
    gameStore.selectedCharacter = response.data;
  })
}

function isSelected(characterId:string|undefined) {
  return gameStore.selectedCharacter._id && gameStore.selectedCharacter._id === characterId;
}
</script>
<template>
  <div>
    <div v-if="characters">

        <div :key="character._id" v-for="character in characters" class="row row-cols-3">
          <div class="row">
            <svg class="character mb-3 col ">
                <circle ref="player" :fill="character.attributes.color"
                        :cx="character.attributes.size"
                        :cy="character.attributes.size"
                        :r="character.attributes.size"/>
            </svg>
            <div class="col d-flex align-items-center">
              <div class="col-sm-6">
                <button class="btn btn-primary mb-3"
                        :class="isSelected(character._id)?'disabled':''"
                        @click="selectCharacter(character._id)">
                  {{isSelected(character?._id)?'SELECTED':'SELECT'}}
                </button>
                <button class="btn btn-danger" @click="deleteCharacter(character._id)">DELETE</button>
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