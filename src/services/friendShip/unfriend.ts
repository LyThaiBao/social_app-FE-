import { FriendShipRequest, FriendShipResponse } from "@/types/friendShip/sendRequest";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { throwClientException } from "../exception/throwClientException";
import { apiClient } from "../axios/apiClient";

export async function unfriend(request:FriendShipRequest){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/friendShip/unfriend`;
    try{
      
        const response = await apiClient.post<RouteResponse<FriendShipResponse>>(url,request);
        const result =  response.data;
        
        return result.data;
    }
    catch(err:unknown){
            throwClientException(err);
    }
}