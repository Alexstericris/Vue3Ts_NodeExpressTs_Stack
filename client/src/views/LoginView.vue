<script lang="ts">
import {defineComponent} from "vue";
import RegistrationApi from "@/apis/RegistrationApi";
import type {LoginEvent, User} from "@/types/types";
export default defineComponent({
  props:{
  },
  data() {
    return{
    }
  },
  created() {
  },
  methods:{
    attemptLogin($event: LoginEvent):void {
        let user: User = {
            email: String($event.target.elements.email.value),
            password: String($event.target.elements.password.value)
        };
      RegistrationApi.login(user)
    },
  }
})
</script>

<template>
  <div class="login">
    <div class="container">
      <form @submit.prevent="attemptLogin">
        <input name="email" type="email" class="form-control" placeholder="Email">
        <input name="password" type="password" class="form-control" placeholder="********">
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>

<style lang="sass" scoped>
</style>