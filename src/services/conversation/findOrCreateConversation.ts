import { ConversationRequest } from "@/types/conversation/conversationRequest";
import { ConversationResponse } from "@/types/conversation/conversationResponse"
import { RouteResponse } from "@/types/routeResponse/routeResponse"

export async function findOrCreateConversation({partnerId}:{partnerId:number}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/conversation`
    try{
        console.log("PNID: ",partnerId)
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(partnerId)
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