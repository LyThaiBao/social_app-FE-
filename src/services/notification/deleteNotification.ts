import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function deleteNotification(id:number){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notification/${id}`;

    try{
        const response = await apiClient.delete<RouteResponse<null>>(url);
            const result:RouteResponse<null> =  response.data;
            return "Delete Successful";

    }
    catch(err:unknown){
        throwClientException(err);
    }
}