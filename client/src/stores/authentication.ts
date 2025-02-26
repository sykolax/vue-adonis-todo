import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axios-config'
import { useRouter } from 'vue-router'

export const useAuthUserStore = defineStore('userAuth', () => {
    const email = ref('')
    const password = ref('')
    const token = ref('')
    const errorOccured = ref(false)
    const isLoggedIn = computed(() => !!token.value)
    const router = useRouter()

    function register() {
        errorOccured.value = false
        api.post('/auth/register', {
            email: email.value,
            password: password.value
        })
        .then((response) => {
            console.log(response)
            token.value = response.data.token
            errorOccured.value = false
            router.push('/')
        })
        .catch((error) => {
            console.log(error)
            errorOccured.value = true
        })
    }

    function login() {
        errorOccured.value = false
        api.post('/auth/login', {
            email: email.value,
            password: password.value
        })
        .then((response) => {
            console.log(response)
            token.value = response.data.token
            router.push('/')
        })
        .catch((error) => {
            errorOccured.value = true
            console.log(error)
        })
    }

    function logout() {
        token.value = ''
        router.push('/login')
    }

    function formFlush() {
        errorOccured.value = false
        email.value = ''
        password.value = ''
    }

    return { 
        email, password, token, errorOccured, 
        register, isLoggedIn, logout, login, 
        formFlush
    }
})