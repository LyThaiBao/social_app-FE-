import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { RefreshResponse } from "@/types/refresh/refreshResponse";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){

    const info = await request.json();
    try{
        const response = await axios.post<APIResponse<RefreshResponse>>(`${process.env.BACKEND_URL}/api/auth/refresh`,info
        ,{headers:{
            "Content-Type":"application/json"
        }});

        const result = response.data;


        const cook = await cookies();
        cook.set("accessToken", response.data.body.accessToken, { httpOnly: true, sameSite: "lax", secure: true,path:"/" });
        cook.set("refreshToken", response.data.body.refreshToken, { httpOnly: true, sameSite: "lax", secure: true,path:"/" });

        const toClient = NextResponse.json({message:"Refresh Success",data:result.body,isSuccess:true},{status:response.status});
        toClient.cookies.set("accessToken",result.body.accessToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:true,
            path:"/"
        })
        toClient.cookies.set("refreshToken",result.body.refreshToken,{
            httpOnly:true,
            sameSite:"lax",
            secure:true,
            path:"/"
        })

   
        return toClient;
    }
    catch(err:unknown){
        return throwServerException(err);
    }
}