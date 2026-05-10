import { ConversationResponse } from "@/types/conversation/conversationResponse"
import { RouteResponse } from "@/types/routeResponse/routeResponse"
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function getConversations({token,next}:{token:string,next:any}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/conversation`
    try{
        const response = await apiClient.get<RouteResponse<ConversationResponse[]>>(url,{
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