<script setup lang="ts">
import Panel from '@/components/Panel.vue'
import CreateRecord from '@/components/CreateRecord.vue'
import EditableRecord from '@/components/EditableRecord.vue'
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
      <EditableRecord
        :title="project.title"
        :isEditMode="project.isEditMode"
        v-model="project.title"
        @onEnter="projectStore.saveProject(project)"
        @onEditClick="project.isEditMode = true"
        @onSaveClick="projectStore.saveProject(project)"
        @onRemoveClick="projectStore.removeProject(project)"
      ></EditableRecord>
    </v-container>
    <CreateRecord
      placeholder="Enter your project"
      v-model="projectStore.newProjectName"
      @onEnter="projectStore.createProject"
      @onClick="projectStore.createProject"
    ></CreateRecord>
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
