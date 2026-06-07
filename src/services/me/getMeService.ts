import { MeResponse } from "@/types/me/meResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";
import { apiServer } from "../axios/apiServer";
import { APIResponse } from "@/types/apiResponse/APIResponse";

export async function getMe({token}:{token:string}){
    const url = `${process.env.BACKEND_URL}/api/me`;
    try{
        const response = await apiServer.get<APIResponse<MeResponse>>(url)
        const result =  response.data;
       
        return result.body;
    }
    catch(err:unknown){
       throwClientException(err);
    }
}