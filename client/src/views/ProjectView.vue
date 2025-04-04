<script setup lang="ts">
import Panel from '@/components/Panel.vue'
import Project from '@/components/Projects.vue'
import Task from '@/components/Tasks.vue'
import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/authentication'
import { useProjectStore } from '@/stores/projects'

const authUserStore = useAuthUserStore()
const projectStore = useProjectStore()
const router = useRouter()

// redirect to login page if not authenticated
if (!authUserStore.isLoggedIn) {
  router.push('/login')
} else {
  projectStore.fetchProjects()
}
</script>

<template>
  <v-container class="panel-container d-flex ga-4">
    <Project></Project>
    <Task></Task>
  </v-container>
</template>

<style>
.panel-container {
  width: 90vw;
  flex-wrap: wrap;
}

.projects-panel {
  flex: 1 1;
}

.tasks-panel {
  flex: 2 1;
}

.border-bottom-thin {
  border-bottom: 1px solid rgb(200, 200, 200);
}

@media (min-width: 768px) {
  .panel-container {
    min-width: 700px;
  }
}

@media (min-width: 1280px) {
  .panel-container {
    min-width: 1000px;
  }
}
</style>
