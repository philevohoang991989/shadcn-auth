import axios from 'axios'

const BASE_URL = "https://sod-api.demo.bnksolution.com/api";

export default axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type":"application/json"}
})

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type":"application/json"}
})