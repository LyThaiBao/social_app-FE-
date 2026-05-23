import { APIResponse } from "@/types/apiResponse/APIResponse";
import { RefreshResponse } from "@/types/refresh/refreshResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

let latestAccessToken: string | null = null;
export const apiServer = axios.create({

})

apiServer.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    // const cook = await cookies();
   const token = latestAccessToken || (await cookies()).get("accessToken")?.value;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiServer.interceptors.response.use(
    (response:AxiosResponse) => response,
    async (err:AxiosError<APIResponse<any>>) => {
        const originalRequest = err.config;
        if(err.response?.status == 401 && originalRequest && !(originalRequest as any)._retry){
            console.log(">>BE NOI HET HAN")
            const cook = await cookies();
            const refreshToken = cook.get("refreshToken")?.value;
            (originalRequest as any)._retry = true;
           try{
                const dataRefresh = await axios.post<RouteResponse<RefreshResponse>>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/refresh`,{refreshToken:refreshToken})
                console.log("DATA REFRESH >>> ",dataRefresh.data);
                latestAccessToken = dataRefresh.data.data.accessToken;
                originalRequest.headers.Authorization=`Bearer ${dataRefresh.data.data.accessToken}`;
                // await setTokenCookies(dataRefresh.data.data.accessToken,dataRefresh.data.data.refreshToken);
           return apiServer(originalRequest);
           }
           catch(refreshToken){
                return Promise.reject(refreshToken);
           }
        }
       
        return Promise.reject(err);
    }
)