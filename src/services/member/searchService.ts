import { FriendSearchResponse } from "@/types/friend/friendResponse"
import { RouteResponse } from "@/types/routeResponse/routeResponse"
import { NextResponse } from "next/server";
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function searchService({keyword,token}:{keyword?:string,token:string}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/member/search?keyword=${keyword}`
    //   const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/member/search`;
    try{
        // const response = await fetch(url,{
        //     method:"GET",
        //     headers:{
        //         Cookie:`accessToken=${token}`
        //     }
        // })
        const response = await apiClient.get<RouteResponse<FriendSearchResponse>>(url,{
            headers:{
                Cookie:`accessToken=${token}`
            },
            // params:{
            //     keyword:keyword
            // }
        })
        const result =  response.data
        return result.data;
    }
    catch(err:unknown){
        console.log(">> SEARCH: ",err);
        throwClientException(err);
    }
}