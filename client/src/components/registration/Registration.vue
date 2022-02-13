<script lang="ts">
import {defineComponent} from "vue";
import RegistrationApi from "@/apis/RegistrationApi";

export default defineComponent({
  data() {
    return {
      user:{
        name:'',
        email:'',
        password:'',
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
      <label>Name</label>
      <input v-model="user.name" placeholder="Name">
      <label>Email</label>
      <input v-model="user.email" type="email" placeholder="Email">
      <label>Password</label>
      <input v-model="user.password" type="password" placeholder="Password">
      <button type="submit">Register</button>
    </form>
  </div>
</template>
<style scoped>

</style>