<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
    <main>
        <div class="container mt-6 py-4">
            <div class="row align-items-md-stretch">
                <RouterLink class="mt-4 col-sm-6" to="/">
                    <div class="h-100 p-5 bg-light border rounded-3 text-center">
                        <h2>Cloud Storage</h2>
                        <!--                        <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>-->
                        <!--                        <button class="btn btn-outline-light" type="button">Example button</button>-->
                    </div>
                </RouterLink>
                <RouterLink class="mt-4 col-sm-6" to="/">
                    <div class="h-100 p-5 bg-light border rounded-3 text-center">
                        <h2>Simple Multiplayer Game</h2>
                        <!--                        <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>-->
                        <!--                        <button class="btn btn-outline-light" type="button">Example button</button>-->
                    </div>
                </RouterLink>
            </div>
        </div>
    </main>

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
    color: #42b983

.welcome
    background: url("@/assets/alexAndMariusPc.jpg") no-repeat
    background-size: cover
    background-position: 0 60%
    height: 950px

</style>