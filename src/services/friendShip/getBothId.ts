import { FriendShipDetail } from "@/types/friendShip/friendShipDetail";
import { FriendShipRequest } from "@/types/friendShip/sendRequest";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function getByBothId({token,request}:{token:string,request:FriendShipRequest}){
    console.log(">>>BOTHID SERVICE: ",request);
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/friendShip/check`;
    try{
        const response = await apiClient.post<RouteResponse<FriendShipDetail>>(url,request,{
            headers:{
                Cookie:`accessToken=${token}`
            }
        });
        const result =  response.data;
        console.log(">>>CHECK FRIEND: ",result);
        return result.data;
    }
    catch(err:unknown){
        throwClientException(err);
    }
}