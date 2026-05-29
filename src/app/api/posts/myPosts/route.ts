import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { PagePostResponse } from "@/types/post/pagePostResponse";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request:NextRequest){
    const params = new URLSearchParams(request.url)
    console.log(">>>PARAM: ",params);
    const url = `${process.env.BACKEND_URL}/api/posts/myPosts`;
    try{
        const response = await apiServer.get<APIResponse<PagePostResponse>>(url);
        console.log(">>>LOG: ",response)
        const result = response.data;

        return NextResponse.json({message:result.message,data:result.body},{status:200})
    }
    catch(err:unknown){
        return throwServerException(err);
    }
}