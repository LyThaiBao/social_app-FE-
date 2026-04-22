import { APIResponse } from "@/types/apiResponse/APIResponse";
import { ConversationRequest } from "@/types/conversation/conversationRequest";
import { ConversationResponse } from "@/types/conversation/conversationResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    const url = `${process.env.BACKEND_URL}/api/conversations`;
    try{
        const response = await fetch(url,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const result:APIResponse<ConversationResponse> = await response.json();
        if(!response.ok){
            return NextResponse.json({message:result.message,data:null},{status:response.status});
        }
        return NextResponse.json({message:result.message,data:result.body},{status:200})
    }
    catch(err){
        return NextResponse.json({message:"Server Error",data:null},{status:500});

    }
}

export async function POST(request:NextRequest){
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    const info = await request.json();
    const url = `${process.env.BACKEND_URL}/api/conversations`;
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({partnerId:info})
        })
        
        const result:APIResponse<ConversationResponse> = await response.json();
        console.log(">>>RESULT: ",result)
        if(!response.ok){
            return NextResponse.json({message:result.message,data:null},{status:response.status});
        }
        return NextResponse.json({message:result.message,data:result.body},{status:200})
    }
    catch(err){
        return NextResponse.json({message:"Server Error",data:null},{status:500});

    }
}