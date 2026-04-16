// call in SC

import { MemberResponseType } from "@/types/member/memberResponse"
import { RouteResponse } from "@/types/routeResponse/routeResponse"

export async function getMemberById({token,id}:{token:string,id:string|number}){
     const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/member/${id}`
    try{
        const response = await fetch(url,{
            method:"GET",
            headers:{
                Cookie:`accessToken=${token}`
            }
        })
        const result:RouteResponse<MemberResponseType> = await response.json();
        if(!response.ok){
            throw new Error(result.message);
        }
        return result.data;

    }
    catch(err){
        throw err;
    }
}