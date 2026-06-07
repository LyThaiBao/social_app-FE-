import { ConversationResponse } from "@/types/conversation/conversationResponse"
import { RouteResponse } from "@/types/routeResponse/routeResponse"
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function getConversation({id}:{id:number|string}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/conversation/${id}`
    try{
        const response = await apiClient.get<RouteResponse<ConversationResponse>>(url);

        const result= response.data;
        
        return result.data;
    }
    catch(err:unknown){
       throwClientException(err);
    }
}