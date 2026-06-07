import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { FriendShipDetail } from "@/types/friendShip/friendShipDetail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const info = await request.json();
    const url = `${process.env.BACKEND_URL}/api/friendship/bothId`;
    try{
        const response = await apiServer.post<APIResponse<FriendShipDetail>>(url,info);
        const result =  response.data;

       
        return NextResponse.json({message:result.message,data:result.body},{status:200});
    }
    catch(err:unknown){
       throwServerException(err);
    }
}