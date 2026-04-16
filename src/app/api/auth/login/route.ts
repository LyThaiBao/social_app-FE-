import { APIResponse } from "@/types/apiResponse/APIResponse";
import { loginResponse } from "@/types/login/loginResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

export async function POST(request:NextRequest){

    const loginInfo = await request.json();
    const url = `${process.env.BACKEND_URL}/api/auth/login`
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(loginInfo),
        })


        const result:APIResponse<loginResponse> = await response.json();
        if(!response.ok){
            return NextResponse.json({message:result.message,data:null},{status:response.status})
        }
        const toClient = NextResponse.json({message:result.message,data:{role:result.body.role, fullName:result.body.fullName,memberId:result.body.memberId}},{status:200});
        toClient.cookies.set("accessToken",result.body.accessToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:true,
            path:"/"
        })
        return toClient;
    }
    catch(err){
            return NextResponse.json({message:"Can not connect to Server",data:null},{status:500})
    }
}