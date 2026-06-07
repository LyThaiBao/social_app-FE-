import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { MeResponse } from "@/types/me/meResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
  
    const url =   `${process.env.BACKEND_URL}/api/me`;
    try{
        const response = await apiServer.get<APIResponse<MeResponse>>(url);
        const result =  response.data;

        return NextResponse.json({message:result.message,data:result.body},{status:response.status});
    }
    catch(err:unknown){
       return throwServerException(err);
    }
}