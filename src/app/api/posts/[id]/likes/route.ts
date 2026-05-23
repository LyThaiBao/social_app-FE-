import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { LikeResponse } from "@/types/likeResponse/likeResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest,params:{params:Promise<{id:number}>}){
    const postId = (await params.params).id;
    console.log(">>>POSTID: ",postId);
    const url = `${process.env.BACKEND_URL}/api/posts/${postId}/likes`;
    try{
        const response = await apiServer.post<APIResponse<LikeResponse>>(url);
        const result = response.data;

        return NextResponse.json({message:result.message,data:result.body},{status:response.status});
    }
    catch(err:unknown){
        return throwServerException(err);
    }
}