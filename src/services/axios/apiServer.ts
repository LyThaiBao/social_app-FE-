
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";


export const apiServer = axios.create({
})

apiServer.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    //   const token = config.headers.getAuthorization();
   const cookieStore = await cookies();
   const token = cookieStore.get("accessToken")?.value;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiServer.interceptors.response.use(
    (response:AxiosResponse) => response,
    (err) => Promise.reject(err)
)