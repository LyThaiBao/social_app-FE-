import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { RefreshResponse } from "@/types/refresh/refreshResponse";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    console.log("IN ROUTE REFRESH")
    const cook = await cookies();
    const refreshToken = cook.get("refreshToken")?.value;
    try{
        const response = await axios.post<APIResponse<RefreshResponse>>(`${process.env.BACKEND_URL}/api/auth/refresh`,{refreshToken:refreshToken}
        ,{headers:{
            "Content-Type":"application/json"
        }});

        const result = response.data;
        console.log(">>> REFRSH ROUTE: ",result)
        const toClient = NextResponse.json({message:"Refresh Success",data:null,isSuccess:true},{status:response.status});
        toClient.cookies.set("accessToken",result.body.accessToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:true
        })
        toClient.cookies.set("refreshToken",result.body.refreshToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:true
        })
        return toClient;
    }
    catch(err:unknown){
        return throwServerException(err);
    }
}