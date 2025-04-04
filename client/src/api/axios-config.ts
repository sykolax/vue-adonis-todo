import axios from 'axios'


const instance = axios.create({
    baseURL: "http://localhost:3333/api",
    timeout: 4000,
})

export default instance