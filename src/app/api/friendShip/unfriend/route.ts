import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { FriendShipResponse } from "@/types/friendShip/sendRequest";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const info = await request.json();
    console.log("INFOR: ",info);
    const url = `${process.env.BACKEND_URL}/api/friendship/unfriend`;
    try{
        const response = await apiServer.post<APIResponse<FriendShipResponse>>(url,info);
        const result =  response.data;
       
        return NextResponse.json({message:result.message,data:result.body},{status:response.status});
    }

    catch(err:unknown){
      return throwServerException(err);

    }
}