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
<div class="container mt-6 py-4 pt-6 mb-5 bg-white rounded">
    <CharactersList></CharactersList>
</div>
</template>

<style scoped>

</style>