<script lang="ts">
import { defineComponent} from "vue";
import GameApi from "@/apis/GameApi";
import type {Character} from "@/types/gametypes";
import {mapState} from "vuex";
import NewCharacter from "@/components/game/NewCharacter.vue";

export default defineComponent({
    name: 'CharactersList',
  components: {NewCharacter},
    data() {
        return {
            characters: [] as Array<Character>,
        }
    },
  computed: {
      ...mapState('gameStore',['selectedCharacter'])
  },
  created() {
    this.getSelectedCharacter();
    this.getCharacters()
  },
  methods: {
    getCharacters() {
      GameApi.getCharacters().then(res => {
        this.characters=res.data;
      })
    },
    getSelectedCharacter() {
      GameApi.getSelectedCharacter().then(response=>{
        this.$store.commit("gameStore/setSelectedCharacter",response.data)
      })
    },
    deleteCharacter(_id:string|undefined) {
      GameApi.deleteCharacter(_id).then(()=>{
        this.getCharacters();
      });
    },
    selectCharacter(_id:string|undefined) {
      GameApi.selectCharacter(_id).then(response=>{
        this.$store.commit("gameStore/setSelectedCharacter",response.data)
      })
    },
    isSelected(characterId) {
      return this.selectedCharacter._id && this.selectedCharacter._id === characterId;
    },
  },
  watch:{
      character:{
        deep: true,
        handler: function () {
          GameApi.getCharacters().then(res => {
            this.characters=res.data;
          });
        }
      }
  }
})
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
                  {{isSelected(character._id)?'SELECTED':'SELECT'}}
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