<script lang="ts">
import {defineComponent} from "vue";
import Game from "@/components/game/Game.vue";
import {mapState} from "vuex";

export default defineComponent({
  name: "GameView",
  components: {Game},
  computed: {
    ...mapState('gameStore',['gameStarted'])
  }
})
</script>

<template>
  <div>
    <div v-if="!gameStarted" class="container mt-6 text-center">
      <button  @click="$store.commit('gameStore/setGameStarted',true)" class="btn bg-white top-100">
        Start
      </button>
    </div>
    <Game v-if="gameStarted"></Game>
  </div>
</template>

<style scoped>

</style>