import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { FriendRequest } from "@/types/notification/friendRequest";
import { NewMessageResponse } from "@/types/notification/newMessage";
import { NotificationResponse } from "@/types/notification/notificationResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const url = `${process.env.BACKEND_URL}/api/notifications`;
    const info = await request.json();

    try{
        const response = await apiServer.post<APIResponse<NotificationResponse<FriendRequest|NewMessageResponse>[]>>(url,info);

        const result =  response.data;
          return NextResponse.json({message:result.message,data:result.body,isSuccess:true},{status:response.status});
    }
    catch(err:unknown){
          return throwServerException(err);
    }
}