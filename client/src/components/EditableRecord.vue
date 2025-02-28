<script setup lang="ts">
const props = defineProps(['title', 'isEditMode'])
const emits = defineEmits(['onEnter', 'onEditClick', 'onSaveClick', 'onRemoveClick'])
const title = defineModel()
</script>

<template>
  <v-sheet v-if="!isEditMode">
    {{ props.title }}
  </v-sheet>
  <v-text-field
    v-else
    v-model="title"
    variant="underlined"
    density="comfortable"
    autofocus
    @keyup.enter="$emit('onEnter')"
  ></v-text-field>
  <v-sheet>
    <v-btn
      v-if="!isEditMode"
      @click="$emit('onEditClick')"
      size="x-small"
      variant="text"
      icon="mdi-pencil"
    ></v-btn>
    <v-btn v-else @click="$emit('onSaveClick')" size="x-small" variant="text" icon="mdi-check-bold">
    </v-btn>
    <v-btn @click="$emit('onRemoveClick')" size="x-small" variant="text" icon="mdi-delete"></v-btn>
  </v-sheet>
</template>
