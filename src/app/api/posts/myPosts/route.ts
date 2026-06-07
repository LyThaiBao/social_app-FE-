import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { PagePostResponse } from "@/types/post/pagePostResponse";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request:NextRequest){
    const params = request.nextUrl.searchParams;

    console.log(">>>PARAM: ",params.get("memberId"));
    const url = `${process.env.BACKEND_URL}/api/posts/personal?memberId=${params.get("memberId")}`;
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