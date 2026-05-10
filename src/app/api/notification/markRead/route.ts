
import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const url = `${process.env.BACKEND_URL}/api/notifications/markRead`;
    const info = await request.json();

    try{
        const response = await apiServer.post(url,info);
          return NextResponse.json({message:"mark as success read ",data:null,isSuccess:true},{status:200});
    }
    catch(err:unknown){
          return throwServerException(err);
    }
}