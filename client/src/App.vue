<script setup lang="ts">
import {RouterView} from 'vue-router'
import Navigation from "@/components/Navigation.vue";
import Toast from "@/components/snippets/Toast.vue";

</script>

<template>
  <header>
    <!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->
    <!--    <div class="wrapper">-->
    <!--      <HelloWorld msg="You did it!" />-->
    <!--    </div>-->
    <Navigation></Navigation>
  </header>
  <RouterView class="mt-6 mb-5"/>
  <Toast></Toast>
  <footer class="py-2 mt-4 page-footer col-12 text-muted text-center bg-white border-top">
    <div class="container">
      <div>
        ©Sterian-Alexandru Cristea 2021
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
$primary: #2b7c4f;
@import "bootstrap";
@import "bootstrap/dist/css/bootstrap.min.css";

</style>

<style lang="sass">
@import 'assets/base'

#app
  position: absolute
  overflow: auto
  background-color: #8ACAA9
  top: 0
  bottom: 0
  right: 0
  left: 0

body
  position: relative
  margin: 0
  padding: 0

.router-link-active
  color: #00b379 !important

header
  line-height: 1.5
  max-height: 100vh

.text-shadow
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4)

.text-shadow-2
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 1)

.mt-6
  margin-top: 5rem

.pt-6
  padding-top: 5rem

.logo
  display: block
  margin: 0 auto 2rem

.page-footer
  position: fixed
  bottom: 0px
  user-select: none

a, .green
  text-decoration: none
  color: hsla(160, 100%, 37%, 1)
  transition: 0.4s

#app a
  color: rgba(0,0,0,0.55)

.display-7
  font-size: 2rem

//a:hover, .nav-link:hover
//  color: currentColor !important
//  filter: brightness(0.9) !important


//
//nav
//  width: 100%
//  font-size: 12px
//  text-align: center
//  margin-top: 2rem


nav a.router-link-exact-active
  color: var(--color-text)


nav a.router-link-exact-active:hover
  background-color: transparent


nav a
  display: inline-block
  padding: 0 1rem
  border-left: 1px solid var(--color-border)


nav a:first-of-type
  border: 0

.text-light-green
  color: #95e6cc !important


/*@media (min-width: 1024px) {*/
/*  body {*/
/*    display: flex;*/
/*    place-items: center;*/
/*  }*/

/*  #app {*/
/*    display: grid;*/
/*    grid-template-columns: 1fr 1fr;*/
/*    padding: 0 2rem;*/
/*  }*/

/*  header {*/
/*    display: flex;*/
/*    place-items: center;*/
/*    padding-right: calc(var(--section-gap) / 2);*/
/*  }*/

/*  header .wrapper {*/
/*    display: flex;*/
/*    place-items: flex-start;*/
/*    flex-wrap: wrap;*/
/*  }*/

/*  .logo {*/
/*    margin: 0 2rem 0 0;*/
/*  }*/

/*  nav {*/
/*    text-align: left;*/
/*    margin-left: -1rem;*/
/*    font-size: 1rem;*/

/*    padding: 1rem 0;*/
/*    margin-top: 1rem;*/
/*  }*/
/*}*/
</style>
