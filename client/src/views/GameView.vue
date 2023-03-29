<script lang="ts">
import {defineComponent} from "vue";
import BaseLayer from '@/components/game/BaseLayer.vue';
import Player from "@/components/game/Player.vue";
import OtherPlayer from "@/components/game/OtherPlayer.vue";
import GameApi from "@/apis/GameApi";
import {mapState} from "vuex";
import type {Character,Bullet as BulletType, CharactersCollection, Position} from "@/types/gametypes";
import {Socket} from "socket.io-client";
import Crosshair from "@/components/game/Crosshair.vue";
import Bullets from "@/components/game/Bullets.vue";
// import BaseCanvasLayer from "@/components/game/BaseCanvasLayer.vue";
// import TestCanvasLayer from "@/components/game/TestCanvasLayer.vue";

export default defineComponent({
  name: 'GameView',
  components: {Crosshair, Bullets, Player, BaseLayer, OtherPlayer},
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
    await GameApi.getCharacters().then(res => {
      this.$store.commit("gameStore/setCharacter", res.data[0])
    });
    this.socket.emit('pendingGameJoin', this.character);
    this.socket.on('playerJoined', (otherCharacters: CharactersCollection) => {
      this.otherCharacters = otherCharacters;
    })
    this.socket.on('positionUpdated', (characterId: string, position: Position) => {
      this.otherCharacters[characterId].position = position;
    })
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
        <Crosshair></Crosshair>
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