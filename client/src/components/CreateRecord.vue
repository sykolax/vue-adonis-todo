<script setup lang="ts">
const props = defineProps(['placeholder'])
const emits = defineEmits(['onInput', 'onEnter', 'onClick'])
const inputModel = defineModel()
</script>
<template>
  <v-container class="d-flex ga-4">
    <v-text-field
      v-model="inputModel"
      class="project-input py-0"
      :placeholder="props.placeholder"
      density="comfortable"
      variant="underlined"
      @keyup.enter="$emit('onEnter')"
    ></v-text-field>
    <v-btn
      @click="$emit('onClick')"
      icon="mdi-plus"
      class="mt-1"
      color="primary"
      size="small"
    ></v-btn>
  </v-container>
</template>

<style></style>
