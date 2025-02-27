<script setup lang="ts">
import Panel from '@/components/Panel.vue'
import { useProjectStore } from '@/stores/projects'

const projectStore = useProjectStore()
</script>

<template>
  <Panel class="projects-panel" title="Projects">
    <v-container
      class="d-flex justify-space-between align-center border-bottom-thin px-4 py-3"
      v-for="project in projectStore.projects"
      :key="project.id"
    >
      <v-sheet v-if="!project.isEditMode">
        {{ project.title }}
      </v-sheet>
      <v-text-field
        v-else
        v-model="project.title"
        variant="underlined"
        density="comfortable"
        autofocus
        @keyup.enter="projectStore.saveProject(project)"
      ></v-text-field>
      <v-sheet>
        <v-btn
          v-if="!project.isEditMode"
          @click="projectStore.editProject(project)"
          size="x-small"
          variant="text"
          icon="mdi-pencil"
        ></v-btn>
        <v-btn
          v-else
          @click="projectStore.saveProject(project)"
          size="x-small"
          variant="text"
          icon="mdi-check-bold"
        >
        </v-btn>
        <v-btn
          @click="projectStore.removeProject(project)"
          size="x-small"
          variant="text"
          icon="mdi-delete"
        ></v-btn>
      </v-sheet>
    </v-container>
    <v-container class="d-flex ga-4">
      <v-text-field
        v-model="projectStore.newProjectName"
        class="project-input py-0"
        placeholder="Enter project name"
        density="comfortable"
        variant="underlined"
        @keyup.enter="proejctStore.createProject"
      ></v-text-field>
      <v-btn
        @click="projectStore.createProject"
        icon="mdi-plus"
        class="mt-1"
        color="primary"
        size="small"
      ></v-btn>
    </v-container>
  </Panel>
</template>

<style>
.projects-panel {
  flex: 1 1;
}

.border-bottom-thin {
  border-bottom: 1px solid rgb(200, 200, 200);
}
</style>
