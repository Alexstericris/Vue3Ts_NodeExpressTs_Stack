<script lang="ts">
import {defineComponent} from "vue";
import {mapState} from "vuex";

export default defineComponent({
    computed: {
        ...mapState(['user'])
    }
});

</script>

<template>
    <main>
        <div class="container mt-5 py-4">
            <div class="row align-items-md-stretch">
                <div class="px-10 py-5 rounded-3 bg-light col-sm-6 h-100 text-center">
                    <a class="text-decoration-none" href="http://digitalfruit.sytes.net:81">
                        Cloud Storage
                    </a>
                </div>
                <div class="px-10 py-5 rounded-3 bg-light col-sm-6 h-100  text-center">
                    <RouterLink class="text-decoration-none"
                                :to="user?'/game':'/login'">
                        Simple Multiplayer Game
                    </RouterLink>
                </div>
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

.px-10
    padding-left: 5rem
    padding-right: 5rem
</style>