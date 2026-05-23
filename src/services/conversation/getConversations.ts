import { ConversationResponse } from "@/types/conversation/conversationResponse"
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiServer } from "../axios/apiServer";

export async function getConversations({token,next}:{token:string,next:any}){
    const url = `${process.env.BACKEND_URL}/api/conversations`
    try{
        const response = await apiServer.get<APIResponse<ConversationResponse[]>>(url)
        

        const result =  response.data;
     
        return result.body;
    }
    catch(err:unknown){
        console.log(">>>ERROR: ",err);
        throwClientException(err);
    }
}