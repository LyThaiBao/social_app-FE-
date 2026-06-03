import { LastMessageResponse } from "@/types/message/lastMessageResponse";
import { throwClientException } from "../exception/throwClientException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { apiServer } from "../axios/apiServer";

export async function getLastMessageByConversationId({conversationId}:{conversationId:number}){
    const url =   `${process.env.BACKEND_URL}/api/messages/lastmessage`;
    try{
        const response = await apiServer.post<APIResponse<LastMessageResponse>>(url,{conversationId:conversationId})
        const result =  response.data;
       
        return result.body;
    }
    catch(err:unknown){
        throwClientException(err);
    }
}