<script lang="ts">
import {defineComponent} from "vue";
import RegistrationApi from "@/apis/RegistrationApi";
import type { LoginFormSubmitTarget, User} from "@/types/types";
export default defineComponent({
  props:{
  },
  data() {
    return{
    }
  },
  created() {
  },
  methods: {
      attemptLogin($event: Event): void {
          let formTarget=$event.target as LoginFormSubmitTarget|null
          let user: User = {
            email: String(formTarget?.elements?.email.value),
            password: String(formTarget?.elements?.password.value)
        };
      RegistrationApi.login(user)
    },
  }
})
</script>

<template>
  <div class="mt-5 login">
    <div class="container">
      <form @submit.prevent="attemptLogin">
        <input name="email"
               type="email"
               class="form-control"
               placeholder="Email">
        <input name="password" type="password" class="form-control" placeholder="********">
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>

<style lang="sass" scoped>
</style>