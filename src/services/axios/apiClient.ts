import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig,AxiosRequestConfig } from "axios";
import {refreshToken} from "@/services/auth/refresh"
export const apiClient = axios.create({
    withCredentials:true
})

apiClient.interceptors.request.use((config:InternalAxiosRequestConfig) =>{
    return config;
})

apiClient.interceptors.response.use(
    (response:AxiosResponse) => response,
    async (err:AxiosError)=> {
        const originalRequest = err.config as AxiosRequestConfig;
        if(err.status == 401 && originalRequest && !(originalRequest as any)._retry){
            console.log(">>>HET HAN");
            (originalRequest as any)._retry = true;
            try{
                await refreshToken();
                //recall fail service
                return apiClient(originalRequest);
            }
            catch(refreshError){
                console.error("Refresh token failed:", refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(err);
    }
    )

        
   
    
