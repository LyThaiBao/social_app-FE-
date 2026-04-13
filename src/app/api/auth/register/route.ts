import { APIResponse } from "@/types/apiResponse/APIResponse";
import { RegisterResponse } from "@/types/register/registerResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const registerInfo = await request.json();
     const url = `${process.env.BACKEND_URL}/api/auth/register`
     try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(registerInfo)
        })
        const result:APIResponse<RegisterResponse> = await response.json();
        if(!response.ok){
            return NextResponse.json({message:result.message,data:null},{status:response.status})
        }

        return NextResponse.json({message:result.message, data:{...result.body}},{status:200})
     }
     catch(err){
        return NextResponse.json({message:"Server Error",data:null},{status:500});
     }
}