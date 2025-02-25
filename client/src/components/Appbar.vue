<template>
  <v-container>
    <v-app-bar color="primary" flat>
      <v-app-bar-title>TODO APP</v-app-bar-title>
      <v-btn v-if="authUserStore.isLoggedIn">
        <v-icon class="mr-2">mdi-folder</v-icon>
        Projects
      </v-btn>
      <v-btn to="/register" v-if="!authUserStore.isLoggedIn">
        <v-icon class="mr-2">mdi-account-box</v-icon>
        Register
      </v-btn>
      <v-btn v-if="!authUserStore.isLoggedIn">
        <v-icon class="mr-2">mdi-login</v-icon>
        Login
      </v-btn>
      <v-btn v-if="authUserStore.isLoggedIn" @click="authUserStore.logout">
        <v-icon class="mr-2">mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-app-bar>
  </v-container>
</template>
<script setup lang="ts">
import { useAuthUserStore } from '@/stores/authentication.ts'
import { computed, ref } from 'vue'

const authUserStore = useAuthUserStore()
</script>
<style></style>
