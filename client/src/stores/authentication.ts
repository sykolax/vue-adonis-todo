import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/axios-config'
import { useRouter } from 'vue-router'



export const useAuthUserStore = defineStore('userAuth', () => {
    const registerEmail = ref('')
    const registerPassword = ref('')
    const token = ref('')
    const errorOccured = ref(false)
    const isLoggedIn = ref(false)
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
            console.log(errorOccured.value)
            router.push('/')
            isLoggedIn.value = !!token.value
            // registration success page OR login -> home
        })
        .catch((error) => {
            console.log(error)
            errorOccured.value = true
            console.log(errorOccured)
        })
    }

    return { registerEmail, registerPassword, token, errorOccured, register, isLoggedIn}
})