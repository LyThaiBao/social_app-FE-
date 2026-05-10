import { LastMessageResponse } from "@/types/message/lastMessageResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function getLastMessageByConversationId({conversationId,token}:{conversationId:number,token:string}){

    const url =   `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/message/lastmessage`;
    try{
        const response = await apiClient.post<RouteResponse<LastMessageResponse>>(url,{conversationId:conversationId},{
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