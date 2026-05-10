import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { LastMessageResponse } from "@/types/message/lastMessageResponse";
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request:NextRequest){
    const info = await request.json();
    const url = `${process.env.BACKEND_URL}/api/messages/lastmessage`;
    try{
        // const response = await fetch(url,{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json",
        //         Authorization:`Bearer ${token}`
        //     },
        //     body:JSON.stringify(info),
        // })

        const response = await apiServer.post<APIResponse<LastMessageResponse>>(url,info)
        const result =  response.data;
       
        return NextResponse.json({message:result.message, data:result.body, isSuccess:true},{status:response.status});
    }
    catch(err:unknown){
        return throwServerException(err);
    }
}