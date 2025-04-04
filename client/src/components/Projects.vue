<script setup lang="ts">
import Panel from '@/components/Panel.vue'
import CreateRecord from '@/components/CreateRecord.vue'
import EditableRecord from '@/components/EditableRecord.vue'
import { useProjectStore } from '@/stores/projects'
import { useTaskStore } from '@/stores/tasks'

const projectStore = useProjectStore()
const taskStore = useTaskStore()

function selectProject(project) {
  taskStore.fetchTasks(project)
}
</script>

<template>
  <Panel class="projects-panel" title="Projects">
    <v-container
      class="border-bottom-thin pa-0 project-container"
      v-for="project in projectStore.projects"
      :key="project.id"
    >
      <EditableRecord
        :title="project.title"
        :isEditMode="project.isEditMode"
        :color="project === projectStore.currentProject ? 'pink' : 'white'"
        v-model="project.title"
        @onClick="selectProject(project)"
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
