
import { MemberResponseType } from "@/types/member/memberResponse"
import { RouteResponse } from "@/types/routeResponse/routeResponse"
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function getMemberById({token,id}:{token:string,id:string|number}){
     const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/member/${id}`
    try{
        const response = await apiClient.get<RouteResponse<MemberResponseType>>(url,{
            headers:{
                Cookie:`accessToken=${token}`
            }
        });
        const result =  response.data;
        return result.data;

    }
    catch(err:unknown){
        throwClientException(err);
    }
}