<script lang="ts">
import {defineComponent} from "vue";
import type {PropType} from "vue";
import type {Character} from "@/types/gametypes";

export default defineComponent({
    name:"OtherPlayer",
    props:{
        character: {
            type:Object as PropType<Character>,
            required:true
        },
    }
});
</script>
<template>
    <circle :id="'player'+character._id" :fill="character.attributes.color"
            :cx="character.position.xAxis"
            :cy="character.position.yAxis"
            :r="character.attributes.size"/>
</template>

<style scoped>

</style>