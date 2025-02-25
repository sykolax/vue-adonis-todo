import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axios-config'
import { useRouter } from 'vue-router'

export const useAuthUserStore = defineStore('userAuth', () => {
    const registerEmail = ref('')
    const registerPassword = ref('')
    const token = ref('')
    const errorOccured = ref(false)
    const isLoggedIn = computed(() => !!token.value)
    const router = useRouter()

    function register() {
        errorOccured.value = false
        api.post('/auth/register', {
            email: registerEmail.value,
            password: registerEmail.value
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

    // function login() {
    //     errorOccured.value = false
    //     api.post('/auth/login', {
    //         email: 
    //     })
    // }

    function logout() {
        token.value = ''
        router.push('/login')
    }

    return { registerEmail, registerPassword, token, errorOccured, register, isLoggedIn, logout}
})