import { FriendSearchResponse } from "@/types/friend/friendResponse"
import { RouteResponse } from "@/types/routeResponse/routeResponse"
import { NextResponse } from "next/server";
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";
import { APIResponse } from "@/types/apiResponse/APIResponse";
import { cookies } from "next/headers";
import axios from "axios";
import { apiServer } from "../axios/apiServer";

export async function searchService({keyword,token}:{keyword?:string,token:string}){
    const cook = await cookies();
    const accessToken = cook.get("accessToken")?.value;
    console.log(">>> TOKEN: ",accessToken);
    const url = `${process.env.BACKEND_URL}/api/members/search?keyword=${keyword}`
    //   const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/member/search`;
    try{
        // const response = await fetch(url,{
        //     method:"GET",
        //     headers:{
        //         Cookie:`accessToken=${token}`
        //     }URL
        // })s
        const response = await apiServer.get<APIResponse<FriendSearchResponse>>(url)
        const result =  response.data
        return result.body;
    }
    catch(err:unknown){
        console.log(">> SEARCH: ",err);
        throwClientException(err);
    }
}