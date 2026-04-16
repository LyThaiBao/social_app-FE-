import { APIResponse } from "@/types/apiResponse/APIResponse";
import { MeResponse } from "@/types/me/meResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const cook =await cookies();
    const token = cook.get("accessToken")?.value;
    console.log(">>>RTOKEN: ",token);
    const url =   `${process.env.BACKEND_URL}/api/me`;
    try{
        const response = await fetch(url,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const result:APIResponse<MeResponse> = await response.json();

        console.log("RSP: ",response);
        console.log("RSL: ",result);
        if(!response.ok){
            return NextResponse.json({message:result.message,data:null},{status:response.status});
        }

        return NextResponse.json({message:result.message,data:result.body},{status:response.status});
    }
    catch(err){
        return NextResponse.json({message:"Server Error",data:null},{status:500});
    }
}