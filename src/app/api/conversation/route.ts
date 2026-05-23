import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { ConversationRequest } from "@/types/conversation/conversationRequest";
import { ConversationResponse } from "@/types/conversation/conversationResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const url = `${process.env.BACKEND_URL}/api/conversations`;
    try{
        const response = await apiServer.get<APIResponse<ConversationResponse>>(url);
        const result:APIResponse<ConversationResponse> = response.data;
      
        return NextResponse.json({message:result.message,data:result.body},{status:200})
    }
    catch(err){
        return throwServerException(err);

    }
}

export async function POST(request:NextRequest){
    const info = await request.json();
    const url = `${process.env.BACKEND_URL}/api/conversations`;
    try{
        const response  = await apiServer.post<APIResponse<ConversationResponse>>(url,{partnerId:info});
        const result = response.data;

        return NextResponse.json({message:result.message,data:result.body},{status:response.status});
        
 
    }
    catch(err:unknown){
        return throwServerException<ConversationResponse>(err);
    }
}