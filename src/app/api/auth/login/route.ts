
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { loginResponse } from "@/types/login/loginResponse";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){

    const loginInfo = await request.json();
    console.log(">>>LOGIN: ",loginInfo);
    try{
        const url = `${process.env.BACKEND_URL}/api/auth/login`
        const response = await axios.post<APIResponse<loginResponse>>(url,loginInfo);
        
        const result:APIResponse<loginResponse> = response.data;
        console.log(">>>LOGIN RESPONSE: ",result);
        
        const toClient = NextResponse.json({message:result.message,data:{role:result.body.role, fullName:result.body.fullName,memberId:result.body.memberId}},{status:200});
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
      return throwServerException<loginResponse>(err);
    }
}