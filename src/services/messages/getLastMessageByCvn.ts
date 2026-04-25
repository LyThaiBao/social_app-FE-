import { LastMessageResponse } from "@/types/message/lastMessageResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function getLastMessageByConversationId({conversationId,token}:{conversationId:number,token:string}){

    const url =   `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/message/lastmessage`;
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Cookie:`accessToken=${token}`
            },
            body:JSON.stringify({conversationId:conversationId})
        })
        const result:RouteResponse<LastMessageResponse> = await response.json();
        if(!response.ok){
            throw new Error(result.message);
        }
        return result.data;
    }
    catch(err){
        throw err;
    }
}