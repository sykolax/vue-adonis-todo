import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axios-config'
import { useAuthUserStore } from './authentication'
import type { Project } from './projects'

interface TaskIndexResponse {
    id: number,
    description: string,
    projectId: number,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface Task extends TaskIndexResponse {
    isEditMode: boolean
}

export const useTaskStore = defineStore('tasks', () => {
    const authUserStore = useAuthUserStore()
    const tasks = ref<Task[]>([])
    const newTaskName = ref('')
    const currentProject = ref<Project>()
    
    function fetchTasks(project: Project) {
        currentProject.value = project
        tasks.value.length = 0
        api.get(`projects/${project.id}/tasks`, {
            headers: {
                Authorization: `Bearer ${authUserStore.token}`
            }
        })
        .then((response) => {
            response.data.forEach(
                (task: TaskIndexResponse) => {
                    tasks.value.push({
                        id: task["id"],
                        description: task["description"],
                        projectId: task["projectId"],
                        completed: task["completed"],
                        createdAt: task["createdAt"],
                        updatedAt: task["updatedAt"],
                        isEditMode: false
                    })
                })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function createTask(project: Project) {
        console.log('Create Task!')
        api.post(`projects/${project.id}/tasks`, {
            description: newTaskName.value
        },
        {
        headers: {
            Authorization: `Bearer ${authUserStore.token}`
        }}
        )
        .then((response) => {
            console.log(response)
            tasks.value.push(response.data)
            newTaskName.value = ''
        })
    }

    function removeTask(task: Task) {
        api.delete(`tasks/${task.id}`, {
            headers: {
                Authorization: `Bearer ${authUserStore.token}`
            }
        })
        .then((response) => {
            tasks.value = tasks.value.filter((t) => t !== task)
        })
    }

    function editTask(task: Task) {
        task.isEditMode = true
    }

    function saveTask(task: Task) {
        api.patch(`tasks/${task.id}`, {
            description: task.description
        }, {
            headers: {
                Authorization: `Bearer ${authUserStore.token}`
            }
        })
        .then(() => {
            task.isEditMode = false
        })
    }

    return {
        tasks, newTaskName, currentProject, fetchTasks, createTask, editTask, removeTask, saveTask
    }
})