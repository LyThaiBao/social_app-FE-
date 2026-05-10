import { ConversationResponse } from "@/types/conversation/conversationResponse"
import { RouteResponse } from "@/types/routeResponse/routeResponse"
import { apiClient } from "../axios/apiClient";
import axios from "axios";
import { throwClientException } from "../exception/throwClientException";

export async function findOrCreateConversation({partnerId}:{partnerId:number}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/conversation`
    try{
        // console.log("PNID: ",partnerId)
        // const response = await fetch(url,{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     credentials:"include",
        //     body:JSON.stringify(partnerId)
        // })

        const response =await apiClient.post<RouteResponse<ConversationResponse>>(url,partnerId);
        const result = response.data;
        // if(!response.ok){
        //     throw new Error(result.message);
        // }
        return result.data;
    }
    catch(err:unknown){
        throwClientException<ConversationResponse>(err);
    }
}