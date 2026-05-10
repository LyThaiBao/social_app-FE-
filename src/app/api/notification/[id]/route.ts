import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest,params:{params:Promise<{id:number}>}){
    const id  = (await params.params).id;
    const url = `${process.env.BACKEND_URL}/api/notifications/${id}`;
    try{
        const response = await apiServer.delete<APIResponse<null>>(url);
        const result =  response.data;

        return NextResponse.json({message:result.message,data:result.body,isSuccess:true},{status:200});
    }
    catch(err:unknown){
            return throwServerException(err);

    }
}