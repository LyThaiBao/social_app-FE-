import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {refreshToken}from "@/services/auth/refresh"

export const axiosInstance = axios.create({
    // baseURL:`${process.env.BACKEND_URL}`,
    headers:{
        "Content-Type":"application/json"
    },
    // Nếu là môi trường Client, withCredentials: true == credential:"inlcude"
    withCredentials:true
})

// config for request 
axiosInstance.interceptors.request.use(async (config:InternalAxiosRequestConfig)=>{
    if(typeof window === "undefined"){
        const { cookies } = await import("next/headers");
        const cook = await cookies();
        const token = cook.get("accessToken")?.value;
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        else{
            console.error(">>>AXIOS INSTANCE: not found token");
        }
    }
    
    return config;

})

axiosInstance.interceptors.response.use(
    (response:AxiosResponse) => response,
    async (error:AxiosError) => {
        const originalRequest = error.config;
        if(error.status == 401){
            try{
                await refreshToken();
            }
            catch(err){
                console.error(">>> ERROR ")
            }
        }   
    } 
)