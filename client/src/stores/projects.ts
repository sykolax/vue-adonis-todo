import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axios-config'
import { useAuthUserStore } from './authentication'

interface ProjectIndexResponse {
    id: number, 
    title: string,
    userId: number,
    createdAt: Date,
    updatedAt: Date
}

export interface Project extends ProjectIndexResponse {
    isEditMode: boolean
}

export const useProjectStore = defineStore('projects', () => {
    const authUserStore = useAuthUserStore()
    const projects = ref<Project[]>([])
    const newProjectName = ref('')
    const currentProject = ref<Project>()

    function fetchProjects() {
        api.get('/projects', {
            headers: {
                Authorization: `Bearer ${authUserStore.token}`
            }
        })
        .then((response) => {
            response.data.forEach(
                (project: ProjectIndexResponse) => {
                projects.value.push({
                    id: project["id"],
                    title: project["title"],
                    userId: project["userId"],
                    createdAt: project["createdAt"],
                    updatedAt: project["updatedAt"],
                    isEditMode: false
                })
            })
        })
    }

    function createProject() {
        console.log('create!')
        api.post('/projects', {
            title: newProjectName.value
        }, {
            headers: {
                Authorization: `Bearer ${authUserStore.token}`
            }
        })
        .then((response) => {
            projects.value.push(response.data)
            newProjectName.value = ''
        })
    }

    function removeProject(project: Project) {
        // api request to delete the project
        api.delete(`/projects/${project.id}`, {
            headers: {
                Authorization: `Bearer ${authUserStore.token}`
            }
        })
        .then((response) => {
            projects.value = projects.value.filter((p) => p !== project)
        })
    }

    function editProject(project: Project) {
        project.isEditMode = true
    }

    function saveProject(project: Project) {
        console.log(project.title)
        console.log(project.id)
        // send request to update the value
        api.patch(`/projects/${project.id}`, {
            title: project.title
        }, {
            headers: {
                Authorization: `Bearer ${authUserStore.token}`
            }
        })
        .then(() => {
            project.isEditMode = false
        })
    }

    return { 
            newProjectName, projects, currentProject, createProject, fetchProjects,
            removeProject, editProject, saveProject
        }
})