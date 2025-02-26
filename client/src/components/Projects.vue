<script setup lang="ts">
import Panel from '@/components/Panel.vue'
import { useProjectStore } from '@/stores/projects'

const projectStore = useProjectStore()
</script>

<template>
  <Panel class="projects-panel" title="Projects">
    <v-container>
      <v-sheet v-for="project in projectStore.projects">
        {{ project }}
      </v-sheet>
    </v-container>
    <v-container class="d-flex ga-4">
      <v-text-field
        v-model="projectStore.newProjectName"
        class="project-input"
        placeholder="Enter project name"
      ></v-text-field>
      <v-btn
        @click="projectStore.createProject"
        icon="mdi-plus"
        class="mt-1"
        color="primary"
      ></v-btn>
    </v-container>
  </Panel>
</template>

<style>
.projects-panel {
  flex: 1 1;
}
</style>
