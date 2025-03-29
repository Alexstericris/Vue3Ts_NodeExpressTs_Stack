<script setup lang="ts">

import Toast from "@/components/snippets/Toast.vue";
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <header>
    <!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->
    <!--    <div class="wrapper">-->
    <!--      <HelloWorld msg="You did it!" />-->
    <!--    </div>-->
    <Navigation></Navigation>
  </header>
  <Toast></Toast>
  <main class="mt-6">
    <slot></slot>
  </main>
  <footer class="py-2 mt-4 page-footer col-12 text-muted text-center bg-white border-top">
    <div class="container">
      <div>
        ©Sterian-Alexandru Cristea 2021
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>