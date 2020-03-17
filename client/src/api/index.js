import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const createUser = payload => api.post()