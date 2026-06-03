import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
export const apiClient = axios.create({
    withCredentials:true
})

apiClient.interceptors.request.use((config:InternalAxiosRequestConfig) =>{
    return config;
})

apiClient.interceptors.response.use(
    (response:AxiosResponse) => response,
    (err) => Promise.reject(err)

)

