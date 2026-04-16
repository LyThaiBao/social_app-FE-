import { APIResponse } from "@/types/apiResponse/APIResponse";
import { FriendShipResponse } from "@/types/friendShip/sendRequest";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const cook = await cookies();
    const token = cook.get("accessToken")?.value;
    const info = await request.json();
    console.log("INFOR: ",info);
    const url = `http://localhost:8080/api/friendship/send`;
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(info)
        })
        const result:APIResponse<FriendShipResponse> = await response.json();
        console.log(">> RE: ",response);
        console.log(">>RESULT: ",result)
        if(!response.ok){
            return NextResponse.json({message:result.message, data:null},{status:response.status});
        }
        return NextResponse.json({message:result.message,data:result.body},{status:response.status});
    }

    catch(err){
        return NextResponse.json({message:"Server Error",data:null},{status:500});

    }
}