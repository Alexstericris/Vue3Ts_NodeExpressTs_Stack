<script lang="ts">
import {defineComponent} from "vue";
import BaseLayer from '@/components/game/BaseLayer.vue';
import Player from "@/components/game/Player.vue";
import OtherPlayer from "@/components/game/OtherPlayer.vue";
import GameApi from "@/apis/GameApi";
import {mapState} from "vuex";
import type {Character, CharactersCollection, Position} from "@/types/gametypes";
import {Socket} from "socket.io-client";
import BaseCanvasLayer from "@/components/game/BaseCanvasLayer.vue";
import TestCanvasLayer from "@/components/game/TestCanvasLayer.vue";

export default defineComponent({
    name:'GameView',
    components: {TestCanvasLayer, BaseCanvasLayer, Player, BaseLayer,OtherPlayer},
    data() {
        return{
            character:{} as Character,
            otherCharacters:{} as CharactersCollection,
        }
    },
    computed:{
        ...mapState(['socket'])
    },
    beforeCreate: async function () {
        await GameApi.getCharacters().then(res => {
            this.character = res.data[0];
        });
        this.socket.emit('pendingGameJoin', this.character);
        this.socket.on('playerJoined', (otherCharacters: CharactersCollection) => {
            this.otherCharacters = otherCharacters;
        })
        this.socket.on('positionUpdated',(characterId:string,position:Position)=>{
            this.otherCharacters[characterId].position = position;
        })
    },
    beforeUnmount() {
        this.socket.emit('playerLeft', this.character);
    }
});
</script>

<template>
<!--    <TestCanvasLayer></TestCanvasLayer>-->
<!--    <BaseCanvasLayer></BaseCanvasLayer>-->
    <BaseLayer>
        <template v-if="character">
            <Player :character="character"></Player>
        </template>
                <template :key="characterId" v-for="(otherCharacter,characterId) in otherCharacters">
                    <component v-if="character?._id!==characterId"
                               :character="otherCharacter"
                        :is="'OtherPlayer'"></component>
                </template>
    </BaseLayer>
</template>

<style scoped>

</style>