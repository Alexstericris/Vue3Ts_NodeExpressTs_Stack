<script lang="ts">
import {defineComponent} from "vue";
import CharactersList from "@/components/game/CharactersList.vue";
import NewCharacter from "@/components/game/NewCharacter.vue";

export default defineComponent({
    name: 'Characters',
    components: {NewCharacter, CharactersList},

    data() {
        return{

        }
    },
})
</script>

<template>
<div>
    <CharactersList></CharactersList>
    <NewCharacter></NewCharacter>
</div>
</template>

<style scoped>

</style>