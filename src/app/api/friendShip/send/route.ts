import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { FriendShipResponse } from "@/types/friendShip/sendRequest";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const info = await request.json();
    console.log(">>>ROUTE: ",info)
    const url = `${process.env.BACKEND_URL}/api/friendship/send`;
    try{
        const response = await apiServer.post<APIResponse<FriendShipResponse>>(url,info,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        const result =  response.data;
       
        return NextResponse.json({message:result.message,data:result.body},{status:200});
    }

    catch(err:unknown){
        return throwServerException(err);
    }
}