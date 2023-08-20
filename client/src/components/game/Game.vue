<script lang="ts">
import {defineComponent} from "vue";
import BaseLayer from '@/components/game/BaseLayer.vue';
import Player from "@/components/game/Player.vue";
import OtherPlayer from "@/components/game/OtherPlayer.vue";
import GameApi from "@/apis/GameApi";
import {mapState} from "vuex";
import type {Character, CharactersCollection, Position} from "@/types/gametypes";
import Bullets from "@/components/game/Bullets.vue";
import CrossHair from "@/components/game/CrossHair.vue";
// import BaseCanvasLayer from "@/components/game/BaseCanvasLayer.vue";
// import TestCanvasLayer from "@/components/game/TestCanvasLayer.vue";

export default defineComponent({
  name: 'Game',
  components: {CrossHair, Bullets, Player, BaseLayer, OtherPlayer},
  data() {
    return {
      otherCharacters: {} as CharactersCollection,
    }
  },
  computed: {
    ...mapState(['socket']),
    ...mapState('gameStore', ['character', 'bullets'])
  },
  beforeCreate: async function () {
    await GameApi.getSelectedCharacter().then(res => {
      if (!res.data) {
        this.$router.push("characters")
      }
      this.$store.commit("gameStore/setCharacter", res.data);
    });
    this.socket.emit('pendingGameJoin', this.character);
    this.socket.on('playerJoined', (characters: CharactersCollection) => {
      delete characters[this.character._id];
      this.$store.commit("gameStore/setOtherCharacters", Object.values(characters));
      this.otherCharacters = characters;
    })
    this.socket.on('positionUpdated', (characterId: string, position: Position) => {
      this.otherCharacters[characterId].position = position;
      this.$store.commit("gameStore/setOtherCharacters", Object.values(this.otherCharacters))
    })
    this.socket.on('playerLeft', (character: Character) => {
      console.log("playerLeft")
      if (character._id) {
        delete this.otherCharacters[character._id];
      }
    });
  },
  beforeUnmount() {
    this.socket.emit('playerLeft', this.character);
  },
});
</script>

<template>
  <!--    <TestCanvasLayer></TestCanvasLayer>-->
  <!--    <BaseCanvasLayer></BaseCanvasLayer>-->
  <div class="container mt-6">
    <BaseLayer>
      <template v-if="character?._id">
        <Player :character="character"></Player>
        <CrossHair></CrossHair>
      </template>
      <Bullets></Bullets>
      <template :key="characterId" v-for="(otherCharacter,characterId) in otherCharacters">
        <component v-if="character?._id!==characterId"
                   :character="otherCharacter"
                   :is="'OtherPlayer'"></component>
      </template>
    </BaseLayer>
  </div>
</template>

<style scoped>

</style>