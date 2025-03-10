<script setup lang="ts">
import RegistrationApi from "@/apis/RegistrationApi";
import {reactive} from "vue";

const user = reactive({
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
})
function register() {
  RegistrationApi.register(user);
}
</script>
<template>
    <div class="container">
        <form @submit.prevent="register">
            <div class="form-group form-floating mb-3">
                <input v-model="user.username"
                       id="userUsername"
                       class="form-control"
                       placeholder="Username">
                <label for="userUsername" class="form-label">Name</label>
            </div>
            <div class="form-group form-floating mb-3">
                <input v-model="user.email"
                       id="userEmail"
                       class="form-control"
                       type="email"
                       placeholder="Email">
                <label for="userEmail">Email</label>
            </div>
            <div class="form-group form-floating mb-3">
                <input v-model="user.password"
                       id="userPassword"
                       class="form-control"
                       type="password"
                       placeholder="Password">
                <label for="userPassword">Password</label>
            </div>
            <div class="form-group form-floating mb-3">
                <input v-model="user.password_confirmation"
                       id="userConfirmPassword"
                       class="form-control"
                       type="password"
                       placeholder="Confirm Password">
                <label for="userConfirmPassword">Confirm Password</label>
            </div>
            <button class="btn btn-primary" type="submit">Register</button>
        </form>
    </div>
</template>
<style scoped>

</style>