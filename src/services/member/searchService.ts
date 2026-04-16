import { FriendSearchResponse } from "@/types/friend/friendResponse"
import { RouteResponse } from "@/types/routeResponse/routeResponse"
import { NextResponse } from "next/server";

export async function searchService({keyword,token}:{keyword?:string,token:string}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/member/search?keyword=${keyword}`
    try{
        const response = await fetch(url,{
            method:"GET",
            headers:{
                Cookie:`accessToken=${token}`
            }
        })
        const result:RouteResponse<FriendSearchResponse> = await response.json();
       console.log(">>> SER: ",result)
        if(!response.ok){
           throw new Error(result.message);
        }

        return result.data;
    }
    catch(err){
        if(err instanceof Error){
            throw err // continute throw this err
        }

    }
}