import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { PagePostResponse } from "@/types/post/pagePostResponse";
import { PostResponse } from "@/types/post/postResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const url = `${process.env.BACKEND_URL}/api/posts`;
    try{
        const response =await apiServer.get<APIResponse<PagePostResponse>>(url);
        const result = response.data;
        console.log(">>>RESULT: ",result);
        return NextResponse.json({message:result.message,data:result.body},{status:response.status});
    }
    catch(err:unknown){
        return throwServerException(err);
    }
}


export async function POST(request:NextRequest){
    const info = await request.json();
    const url = `${process.env.BACKEND_URL}/api/posts`;
    try{
        const response = apiServer.post<APIResponse<PostResponse>>(url,info);
        const result = (await response).data;

        console.log("CREATE: ",result);
        return NextResponse.json({message:result.message, data:result.body});
    }
    catch(err:unknown){
        return throwServerException(err);
    }
}