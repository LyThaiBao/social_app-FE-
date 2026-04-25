import { MessageResponse } from "@/types/message/messageResponse"
import { RouteResponse } from "../../types/routeResponse/routeResponse"

export async function getMessageByConversationId({conversationId}:{conversationId:number}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/message`
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({conversationId:conversationId}) 
        })
        const result:RouteResponse<MessageResponse[]> = await response.json();

        if(!response.ok){
            throw new Error(result.message);
        }
        return result.data;
    }
    catch(err){
        throw err;
    }
}