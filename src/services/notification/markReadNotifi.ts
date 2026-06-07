
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiClient } from "../axios/apiClient";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { throwClientException } from "../exception/throwClientException";

export async function markReadNotifi(memberId:number){
    
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notification/markRead`;
    try{
        const response = await apiClient.post<RouteResponse<any>>(url,{memberId:memberId})
        const result =  response.data;
        
        return result.data;
    }
    catch(err:unknown){
        throwClientException(err);
    }
}