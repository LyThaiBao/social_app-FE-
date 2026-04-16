import { APIResponse } from "@/types/apiResponse/APIResponse";
import { MemberResponseType } from "@/types/member/memberResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest,params:{params:Promise<{id:string}>}){
    console.log(">>> I GOt HERE")
    const id = (await params.params).id;
    console.log(">>ID: ",id)
    const url = `${process.env.BACKEND_URL}/api/members/${id}`;
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    try{
        const response = await fetch(url,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            },
        })
        console.log(">>> Response: ",response)
        const result:APIResponse<MemberResponseType> = await response.json();
        if(!response.ok){
            return NextResponse.json({message:result.message,data:null},{status:response.status});
        }
        return NextResponse.json({message:result.message,data:result.body},{status:200});
    }
    catch(err){
        if(err instanceof Error){
            return NextResponse.json({message:"Server Error",data:null},{status:500})
        }
    }
}