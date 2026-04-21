import { ConversationResponse } from "@/types/conversation/conversationResponse"
import { RouteResponse } from "@/types/routeResponse/routeResponse"

export async function getConversation({id}:{id:number|string}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/conversation/${id}`
    try{
        const response = await fetch(url,{
            method:"GET",
            // headers:{
               
            // },
            credentials:"include",

        })

        const result:RouteResponse<ConversationResponse> = await response.json();
        if(!response.ok){
            throw new Error(result.message);
        }
        return result.data;
    }
    catch(err){
        throw err;
    }
}