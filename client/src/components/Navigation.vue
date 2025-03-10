<script setup lang="ts">
import RegistrationApi from "@/apis/RegistrationApi";
import {useStore} from "@/stores/store";
import {computed} from "vue";
const store=useStore()
const user=computed(()=>{
  return store.user;
})

function logout() {
  RegistrationApi.logout();
}
</script>

<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <RouterLink to="/">
        <img class="digital-fruit-logo"
             alt="Digital Fruit"
             src="@/assets/Digital_fruit.png">
      </RouterLink>
      <div class="dropstart">
        <button class="mx-4 btn dropdown-toggle navbar-toggler"
                type="button"
                id="navbarBurgerDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="navbarBurgerDropdown">
          <li>
            <RouterLink class="nav-link dropdown-item" to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink class="nav-link dropdown-item" to="/about">About</RouterLink>
          </li>
          <template v-if="user&&user.id">
            <li>
              <RouterLink class="nav-link dropdown-item" to="/game">Game</RouterLink>
            </li>
            <li>
              <RouterLink class="nav-link dropdown-item" to="/characters">Characters</RouterLink>
            </li>
            <li>
              <RouterLink class="nav-link dropdown-item user-select-none" to="/login" @click="logout">Logout</RouterLink>
            </li>
          </template>
          <template v-else>
            <li>
              <RouterLink class="nav-link dropdown-item" to="/login">Login</RouterLink>
            </li>
            <li>
              <RouterLink class="nav-link dropdown-item" to="/register">Register</RouterLink>
            </li>
          </template>
        </ul>
      </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="container-fluid">
                <ul class="navbar-nav fs-5  me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about">About</RouterLink>
                    </li>
                    <template v-if="store.user?.id">
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/game">Game</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/characters">Characters</RouterLink>
                        </li>
                        <li class="ms-auto nav-item">
                            <RouterLink class="nav-link" to="/login" @click="logout">Logout</RouterLink>
                        </li>
                    </template>
                    <template v-else>
                        <li class="ms-auto nav-item">
                            <RouterLink class="nav-link" to="/login">Login</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/register">Register</RouterLink>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="sass" scoped>
.digital-fruit-logo
    height: 3rem

.dropdown-toggle:before
  display: none !important

</style>