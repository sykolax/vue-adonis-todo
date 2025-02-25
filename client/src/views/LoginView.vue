<template>
  <v-container class="login mx-auto">
    <v-col xl="6" class="mx-auto">
      <h1>Log in to your account</h1>
      <v-alert icon="mdi-alert-circle-outline" color="error" v-show="authUserStore.errorOccured"
        >Something went wrong. Please try again.</v-alert
      >
      <v-form class="mt-4" @submit.prevent>
        <v-text-field
          v-model="authUserStore.email"
          type="email"
          prepend-inner-icon="mdi-email-outline"
          label="Email"
          clearable
          required
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          v-model="authUserStore.password"
          class="mt-4"
          prepend-inner-icon="mdi-lock-outline"
          :rules="[rules.required]"
          :type="passwordShow ? 'text' : 'password'"
          :append-inner-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          label="Password"
          clearable
          required
          @click:append-inner="passwordShow = !passwordShow"
        ></v-text-field>
        <v-btn
          class="mt-2 py-6"
          color="primary"
          type="submit"
          @click="authUserStore.login"
          flat
          block
          >Log In</v-btn
        >
      </v-form>
    </v-col>
  </v-container>
</template>

<script setup>
import { useAuthUserStore } from '@/stores/authentication.ts'
import { computed, ref } from 'vue'

const authUserStore = useAuthUserStore()
authUserStore.formFlush()

const passwordShow = ref(false)
const rules = {
  required: (value) => !!value || 'This field is required.',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Please enter a valid email address.'
  },
  minPassword: (value) => value.length >= 10 || 'Password should be 10 characters or more.',
}
</script>
<style>
.login {
  width: 350px;
}

@media (min-width: 768px) {
  .login {
    width: 500px;
  }
}
</style>
