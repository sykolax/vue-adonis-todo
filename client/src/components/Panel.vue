<template>
  <v-sheet class="panel white elevation-1">
    <v-toolbar density="comfortable" color="primary" class="panel">
      <v-toolbar-title class="mx-0">{{ props.title }}</v-toolbar-title>
    </v-toolbar>
    <div>
      <slot>No content defined.</slot>
    </div>
  </v-sheet>
</template>
<script setup lang="ts">
const props = defineProps(['title'])
</script>
<style>
.panel {
  min-width: 300px;
}
</style>
