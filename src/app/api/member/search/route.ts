import { APIResponse } from "@/types/apiResponse/APIResponse";
import { FriendSearchResponse } from "@/types/friend/friendResponse";
import { FriendResearchType } from "@/types/friend/searchFriend";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const token = request.cookies.get("accessToken")?.value;
    const {searchParams} = request.nextUrl; 
    const keyword = searchParams.get("keyword"); 
    console.log(">>KEY: ",searchParams.get("keyword"))
   console.log(">>>URL: ",request.url)
     const url = `${process.env.BACKEND_URL}/api/members/search?keyword=${keyword}`;
     try{
        const response = await fetch(url,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        
        const result:APIResponse<FriendSearchResponse> = await response.json();

        if(!response.ok){
            return NextResponse.json({message:result.message,data:null},{status:response.status});
        }
        return NextResponse.json({message:result.message,data:result.body},{status:200});
     }
     catch(err){
        return NextResponse.json({message:"Server Error",data:null},{status:500});
     }

}