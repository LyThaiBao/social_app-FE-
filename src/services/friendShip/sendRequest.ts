import { FriendShipRequest, FriendShipResponse } from "@/types/friendShip/sendRequest";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiClient } from "../axios/apiClient";
import { throwClientException } from "../exception/throwClientException";

export async function sendRequest(request:FriendShipRequest){
    console.log(">>>SEND REQUEST: ",request)
    const url = `/api/friendShip/send`;
    try{
        const response = await  apiClient.post<RouteResponse<FriendShipResponse>>(url,request,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        const result =  response.data;
        return result.data;
    }
    catch(err:unknown){
       throwClientException(err);
    }
}