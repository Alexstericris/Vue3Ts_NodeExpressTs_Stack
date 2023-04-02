<script lang="ts">
import { defineComponent} from "vue";
import GameApi from "@/apis/GameApi";
import type {Character} from "@/types/gametypes";

export default defineComponent({
    name: 'CharactersList',
    data() {
        return {
            characters: [] as Array<Character>,
        }
    },
    beforeCreate() {
      GameApi.getCharacters().then(res => {
            this.characters=res.data;
        });
    },
})
</script>
<template>
    <div v-if="characters">
        <div :key="character._id" v-for="character in characters" class="row-cols-3">
            <svg class="character mb-3">
                <circle ref="player" :fill="character.attributes.color"
                        :cx="character.attributes.size"
                        :cy="character.attributes.size"
                        :r="character.attributes.size"/>
            </svg>
        </div>
    </div>
</template>

<style scoped lang="sass">
.character
    height: 100px
    width: 100%
</style>