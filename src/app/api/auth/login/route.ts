
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { LoginResponse } from "@/types/login/loginResponse";
import axios  from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){

    const loginInfo = await request.json();
    try{
        const url = `${process.env.BACKEND_URL}/api/auth/login`;
        const response = await axios.post<APIResponse<LoginResponse>>(url,loginInfo);
        
        const result:APIResponse<LoginResponse> = response.data;
     
        const toClient = NextResponse.json({message:result.message,data:{roles:result.body.roles, fullName:result.body.fullName,memberId:result.body.memberId}},{status:200});
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
      return throwServerException<LoginResponse>(err);
    }
}