import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axios-config'
import { useAuthUserStore } from './authentication'

export const useProjectStore = defineStore('projects', () => {
    const authUserStore = useAuthUserStore()
    const projects = ref<string[]>([])
    const newProjectName = ref('')

    function createProject() {
        api.post('/projects', {
            title: newProjectName.value
        }, {
            headers: {
                Authorization: `Bearer ${authUserStore.token}`,
            }
        })
        .then((response) => {
            console.log(response)
            projects.value.push(response.data.title)
            newProjectName.value = ''
            console.log(projects)
        })

    }

    return { newProjectName, projects, createProject }
})