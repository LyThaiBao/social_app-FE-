import { APIResponse } from "@/types/apiResponse/APIResponse";
import { LogoutResponse } from "@/types/logout/logoutResponse";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const cook = await cookies();

    const refreshToken = cook.get("refreshToken")?.value;
  
    const url = `${process.env.BACKEND_URL}/api/auth/logout`
    try{
        const response = await axios.post<APIResponse<LogoutResponse>>(url,{refreshToken});
        const result = response.data;
        console.log(">>> DATA LOGOUT: ",result);
          cook.delete("accessToken");
    cook.delete("refreshToken");
        return NextResponse.json({message:result.message,data:result.body,isSucsess:true},{status:200})
    }
    catch(err:any){
        if(err.response){
            const axiosResponse:AxiosResponse = err.response;
            const apiResponse:APIResponse<LogoutResponse> = err.response.data;
            return NextResponse.json({message:apiResponse.message,data:apiResponse.body,isSucsess:false},{status:axiosResponse.status})
        }
        else{
            return NextResponse.json({message:"Can Not Connect To Server",data:null,isSucsess:false},{status:500})
        }

    }
}