import { APIResponse } from "@/types/apiResponse/APIResponse";
import { FriendRequest } from "@/types/notification/friendRequest";
import { NewMessageResponse } from "@/types/notification/newMessage";
import { NotificationResponse } from "@/types/notification/notificationResponse";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const url = `${process.env.BACKEND_URL}/api/notifications`;
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    const info = await request.json();
    console.log("INFO: ",info);
    console.log("TOKEN: ",token);
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(info)
        })

        const result:APIResponse<NotificationResponse<FriendRequest|NewMessageResponse>[]> = await response.json();
        // console.log(">>>[Server Log]: ",response)
        if(!response.ok){
            return NextResponse.json({message:result.message,data:null,isSuccess:false},{status:response.status});
        }
          return NextResponse.json({message:result.message,data:result.body,isSuccess:true},{status:response.status});
    }
    catch(err){
        
          return NextResponse.json({message:"Server Error",data:null,isSuccess:false},{status:500});
    }
}