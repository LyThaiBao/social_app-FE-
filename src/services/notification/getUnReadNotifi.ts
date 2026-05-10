
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function getUnReadNotifi(memberId:number){
    
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notification/unRead`;
    try{
        const response = await apiClient.post<RouteResponse<number>>(url,{memberId:memberId})
        const result =  response.data;
        

        return result.data;
    }
    catch(err:unknown){
        throwClientException(err);
    }
}