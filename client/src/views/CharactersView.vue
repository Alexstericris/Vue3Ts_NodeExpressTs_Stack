<script setup lang="ts">
import CharactersList from "@/components/game/CharactersList.vue";
import MainLayout from "@/views/Layouts/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <div class="container mt-6 py-4 pt-6 mb-5 bg-white rounded">
      <CharactersList></CharactersList>
    </div>
  </MainLayout>
</template>

<style scoped>

</style>