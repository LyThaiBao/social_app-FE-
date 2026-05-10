import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { ConversationResponse } from "@/types/conversation/conversationResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest,params:{params:Promise<{id:string}>}){
    const id = (await params.params).id;
    const url = `${process.env.BACKEND_URL}/api/conversations/${id}`;
    try{
        const response = await apiServer.get<APIResponse<ConversationResponse>>(url);
        const result = response.data;

        return NextResponse.json({message:result.message,data:result.body},{status:200})
    }
    catch(err:unknown){
        return throwServerException(err);

    }
}