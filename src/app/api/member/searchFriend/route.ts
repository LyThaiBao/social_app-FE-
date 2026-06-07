import { apiServer } from "@/services/axios/apiServer";
import { throwServerException } from "@/services/exception/throwServerException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { FriendSearchResponse } from "@/types/friend/friendResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const url = `${process.env.BACKEND_URL}/api/members/friends/search`;
    const searchPrams =  request.nextUrl.searchParams;
    const keyword = searchPrams.get("keyword");
    console.log(">>>KW ",keyword)
    try{
        const response = await apiServer.get<APIResponse<FriendSearchResponse>>(url,{
            params:{
                keyword:keyword
            }
        });
        console.log(">>>RESPONSE: ",response);
        const result = response.data;

        return NextResponse.json({message:result.message,data:result.body},{status:200});
    }
    catch(err:unknown){
        return throwServerException(err);
    }
}