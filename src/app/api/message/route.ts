import { APIResponse } from "@/types/apiResponse/APIResponse";
import { MessageResponse } from "@/types/message/messageResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    const info = await request.json();
    console.log("INFO >>> ",info);
    const url = `${process.env.BACKEND_URL}/api/messages`;
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(info)
        })
        const result:APIResponse<MessageResponse[]> = await response.json();

        if(!response.ok){
            return NextResponse.json({message:result.message, data:null, isSuccess:false},{status:response.status});
        }
         return NextResponse.json({message:result.message, data:result.body, isSuccess:true},{status:200});
    }
    catch(err){
         return NextResponse.json({message:"Server Error", data:null, isSuccess:false},{status:500});
    }
}