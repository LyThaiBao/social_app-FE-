import { APIResponse } from "@/types/apiResponse/APIResponse";
import { LastMessageResponse } from "@/types/message/lastMessageResponse";
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request:NextRequest){
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    const info = await request.json();
    const url = `${process.env.BACKEND_URL}/api/messages/lastmessage`;
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(info),
        })

        const result:APIResponse<LastMessageResponse> = await response.json();
        console.log("RESULT: ",result);
        if(!response.ok){
            return NextResponse.json({message:result.message, data:null, isSuccess:false},{status:response.status});
        }
        return NextResponse.json({message:result.message, data:result.body, isSuccess:true},{status:response.status});
    }
    catch(err){
        return NextResponse.json({message:"Server Error", data:null, isSuccess:false},{status:500});
    }
}