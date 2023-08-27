<script setup lang="ts">
import RegistrationApi from "@/apis/RegistrationApi";
import type { LoginFormSubmitTarget, User} from "@/types/types";

function attemptLogin($event: Event) {
  let formTarget = $event.target as LoginFormSubmitTarget | null
  let user: User = {
    email: String(formTarget?.elements?.email.value),
    password: String(formTarget?.elements?.password.value)
  };
  RegistrationApi.login(user)
}
</script>

<template>
  <div class="container">
<!--    <div class="container">-->
        <form @submit.prevent="attemptLogin">
            <div class="form-group form-floating mb-3">
                <input name="email"
                       id="email"
                       type="email"
                       class="form-control"
                       placeholder="Email">
                <label for="email" class="form-label">Email</label>
            </div>
            <div class="form-group form-floating mb-3">
                <input name="password"
                       id="password"
                       type="password"
                       class="form-control"
                       placeholder="********">
                <label for="password" class="form-label">Password</label>
            </div>
          <button type="submit" class="btn btn-primary">Login</button>
      </form>
<!--    </div>-->
  </div>
</template>

<style lang="sass" scoped>
</style>