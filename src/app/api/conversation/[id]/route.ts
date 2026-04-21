import { APIResponse } from "@/types/apiResponse/APIResponse";
import { ConversationResponse } from "@/types/conversation/conversationResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest,params:{params:Promise<{id:string}>}){
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    const id = (await params.params).id;
    console.log(">>>>>",id);
    const url = `${process.env.BACKEND_URL}/api/conversations/${id}`;
    try{
        const response = await fetch(url,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const result:APIResponse<ConversationResponse> = await response.json();
        console.log("RESUL: ",result);

        if(!response.ok){
            return NextResponse.json({message:result.message,data:null},{status:response.status});
        }
        return NextResponse.json({message:result.message,data:result.body},{status:200})
    }
    catch(err){
        return NextResponse.json({message:"Server Error",data:null},{status:500});

    }
}