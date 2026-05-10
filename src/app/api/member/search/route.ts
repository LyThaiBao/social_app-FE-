import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { FriendSearchResponse } from "@/types/friend/friendResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const {searchParams} = request.nextUrl; 
    const keyword = searchParams.get("keyword"); 
    console.log(">>KEY: ",searchParams.get("keyword"))
   console.log(">>>URL: ",request.url)
    //  const url = `${process.env.BACKEND_URL}/api/members/search?keyword=${keyword}`;
    const url = `${process.env.BACKEND_URL}/api/members/search`
     try{
        // const response = await fetch(url,{
        //     method:"GET",
        //     headers:{
        //         Authorization:`Bearer ${token}`
        //     }
        // })
        const response = await apiServer.get<APIResponse<FriendSearchResponse>>(url,{
            params:{
                keyword:keyword
            }
        })
        const result =  response.data

        return NextResponse.json({message:result.message,data:result.body},{status:200});
     }
     catch(err:unknown){
        return throwServerException(err);
     }

}