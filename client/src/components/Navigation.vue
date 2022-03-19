<script lang="ts">
import {defineComponent} from "vue";
import {mapState} from "vuex";
import RegistrationApi from "@/apis/RegistrationApi";

export default defineComponent({
    computed: {
        ...mapState(['user'])
    },
    methods:{
        logout() {
            RegistrationApi.logout();
        },
    }
})
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <template v-if="user">
            <RouterLink to="/game">Game</RouterLink>
            <RouterLink to="/characters">Characters</RouterLink>
            <RouterLink to="/login"  @click="logout">Logout</RouterLink>
        </template>
        <template v-else>
            <RouterLink to="/login">Login</RouterLink>
            <RouterLink to="/register">Register</RouterLink>
        </template>

    </nav>
</template>

<style scoped>

</style>