<script setup lang="ts">
import {useToastStore} from "@/stores/toastStore";
import {useStore} from "@/stores/store";
import MainLayout from "@/views/Layouts/MainLayout.vue";

const store=useStore()
const toast=useToastStore()
const user = store.user;
</script>
<template>
  <MainLayout>
        <div class="container mt-5 py-4 text-center">
            <div class="flex flex-wrap justify-content-center">
                    <a class="btn text-nowrap mt-3 px-10 mx-2 py-5 bg-light rounded text-decoration-none" href="https://www.numeriqberry.com">
                        Cloud Storage
                    </a>
                    <RouterLink class="btn text-nowrap mt-3 mx-2 px-10 py-5 bg-light rounded text-decoration-none"
                                :to="user?'/game':'/login'">
                        Simple Multiplayer Game
                    </RouterLink>
            </div>
        </div>
  </MainLayout>
    <!--    <div class="welcome">-->
<!--        <div class="container">-->
<!--            <h1>Hello Digga</h1>-->
<!--            <h1>Was Geht</h1>-->
<!--            <button>Test</button>-->
<!--        </div>-->
<!--        <div class="jumbotron text-center">-->
<!--            <h1>Welcome to the <strong>VENoM</strong> Example Starter App</h1>-->
<!--            <p>Based on tutorial from <a target="_blank" href="https://medium.com/@anaida07/mevn-stack-application-part-1-3a27b61dcae0">here</a>.</p>-->

<!--            <p>Fully loaded with Docker-compose for local development, hot reload, scss in templates, and more.</p>-->
<!--            &lt;!&ndash;            <router-link :to="{ name: 'Posts' }" class="add_post_link">View Posts App</router-link>&ndash;&gt;-->
<!--        </div>-->

<!--    </div>-->

</template>
<style scoped>

</style>
<style lang="sass" scoped>
h1, h2
    font-weight: normal

ul
    list-style-type: none
    padding: 0

li
    display: inline-block
    margin: 0 10px

a
    color: #00b379

.welcome
    background: url("@/assets/alexAndMariusPc.jpg") no-repeat
    background-size: cover
    background-position: 0 60%
    height: 950px

.px-10
    padding-left: 5rem
    padding-right: 5rem
</style>