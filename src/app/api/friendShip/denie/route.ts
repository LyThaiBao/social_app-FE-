import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { FriendShipResponse } from "@/types/friendShip/sendRequest";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const info = await request.json();
    const url = `${process.env.BACKEND_URL}/api/friendship/denie`;
    try{
        const response = await apiServer.post<APIResponse<FriendShipResponse>>(url,{info});
        const result =  response.data;
     
        return NextResponse.json({message:result.message,data:result.body},{status:200});
    }
    catch(err:unknown){
        return throwServerException(err);
    }
    
}