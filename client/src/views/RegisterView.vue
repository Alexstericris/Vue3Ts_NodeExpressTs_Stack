<script lang="ts">
import {defineComponent} from "vue";
import RegistrationApi from "@/apis/RegistrationApi";

export default defineComponent({
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: '',
                confirmPassword:'',
            }
        }
    },
  methods: {
    register() {
      RegistrationApi.register(this.user)
    },
  }
})
</script>
<template>
    <div>
        <form @submit.prevent="register">
            <label for="userUsername" class="form-label">Name</label>
            <input v-model="user.username" id="userUsername" class="form-control" placeholder="Username">
            <label for="userEmail">Email</label>
            <input v-model="user.email" id="userEmail" class="form-control" type="email" placeholder="Email">
            <label for="userPassword">Password</label>
            <input v-model="user.password" id="userPassword" class="form-control" type="password"
                   placeholder="Password">
            <label for="userConfirmPassword">Password</label>
            <input v-model="user.confirmPassword" id="userConfirmPassword" class="form-control" type="password"
                   placeholder="Confirm Password">
            <button class="btn btn-primary" type="submit">Register</button>
        </form>
  </div>
</template>
<style scoped>

</style>