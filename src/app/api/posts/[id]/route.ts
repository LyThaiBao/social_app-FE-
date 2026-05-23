import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { PostResponse } from "@/types/post/postResponse";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest){
    const url = `${process.env.BACKEND_URL}/api/posts`;
    try{
        const response = await apiServer.delete<APIResponse<void>>(url);
        const result = response.data;
        
        return NextResponse.json({message:result.message},{status:response.status});
    }
    catch(err:unknown){
        return throwServerException(err);
    }
}

export async function PATCH(request:NextRequest,params:{params:Promise<{id:string}>}){
    const postId = (await params.params).id;
    const info =await request.json();
    const url = `${process.env.BACKEND_URL}/api/posts/${postId}`;
    try{
        const response = await apiServer.patch<APIResponse<PostResponse>>(url,info);
        const result = response.data;


        console.log("SERVER >>>",result)
        return NextResponse.json({message:result.message,data:result.body},{status:response.status});
    }
    catch(err:unknown){
        return throwServerException(err);
    }
}