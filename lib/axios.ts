import axios from 'axios'

const BASE_URL = "https://aiwa.demo.bnksolution.com/api/backend";

export default axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type":"application/json"}
})

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type":"application/json"}
})