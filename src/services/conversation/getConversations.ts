import { ConversationResponse } from "@/types/conversation/conversationResponse"
import { RouteResponse } from "@/types/routeResponse/routeResponse"

export async function getConversations({token,next}:{token:string,next:any}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/conversation`
    try{
        const response = await fetch(url,{
            method:"GET",
            headers:{
                Cookie:`accessToken=${token}`
            },
        })

        const result:RouteResponse<ConversationResponse[]> = await response.json();
        if(!response.ok){
            throw new Error(result.message);
        }
        return result.data;
    }
    catch(err){
        throw err;
    }
}