import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { MessageResponse } from "@/types/message/messageResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const info = await request.json();
    console.log("INFO >>> ",info);
    const url = `${process.env.BACKEND_URL}/api/messages`;
    try{
      
        const response = await apiServer.post<APIResponse<MessageResponse[]>>(url,info)
        console.log(">>> RESPONSE: ",response);
        const result:APIResponse<MessageResponse[]> =  response.data;

         return NextResponse.json({message:result.message, data:result.body, isSuccess:true},{status:200});
    }
    catch(err:unknown){
         
        return throwServerException(err);
    }
}