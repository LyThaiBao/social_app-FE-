import { APIResponse } from "@/types/apiResponse/APIResponse";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const apiServer = axios.create({

})

apiServer.interceptors.request.use(async (config:InternalAxiosRequestConfig) =>{
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

apiServer.interceptors.response.use(
    (response:AxiosResponse) => response,
    (err:AxiosError<APIResponse<any>>) => {
        return Promise.reject(err);
    }
)