<script setup lang="ts">
import Panel from '@/components/Panel.vue'
import CreateRecord from '@/components/CreateRecord.vue'
import EditableRecord from '@/components/EditableRecord.vue'
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()
</script>
<template>
  <Panel class="tasks-panel" title="Tasks">
    <v-container
      class="d-flex justify-space-between align-center border-bottom-thin px-4 py-3"
      v-for="task in taskStore.tasks"
      :key="task.id"
    >
      <EditableRecord
        :title="task.description"
        :isEditMode="task.isEditMode"
        v-model="task.description"
        @onEnter="taskStore.saveTask(task)"
        @onEditClick="task.isEditMode = true"
        @onSaveClick="taskStore.saveTask(task)"
        @onRemoveClick="taskStore.removeTask(task)"
      ></EditableRecord>
    </v-container>
    <CreateRecord
      v-if="taskStore.currentProject"
      placeholder="Enter your project"
      v-model="taskStore.newTaskName"
      @onEnter="taskStore.createTask(taskStore.currentProject)"
      @onClick="taskStore.createTask(taskStore.currentProject)"
    ></CreateRecord>
  </Panel>
</template>

<style></style>
