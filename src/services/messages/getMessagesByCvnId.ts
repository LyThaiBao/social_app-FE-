import { MessageResponse } from "@/types/message/messageResponse"
import { RouteResponse } from "../../types/routeResponse/routeResponse"
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function getMessageByConversationId({conversationId}:{conversationId:number}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/message`
    try{
        const response = await apiClient.post<RouteResponse<MessageResponse[]>>(url,{conversationId:conversationId});
        const result =  response.data;
      
        return result.data;
    }
    catch(err:unknown){
        throwClientException(err);
    }
}