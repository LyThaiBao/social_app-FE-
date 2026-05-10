import { MeResponse } from "@/types/me/meResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function getMe({token}:{token:string}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/me`;
    try{
        const response = await apiClient.get<RouteResponse<MeResponse>>(url,{
            headers:{
                Cookie:`accessToken=${token}`
            }
        })
        const result =  response.data;
       
        return result.data;
    }
    catch(err:unknown){
       throwClientException(err);
    }
}