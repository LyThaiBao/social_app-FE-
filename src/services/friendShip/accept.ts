import { FriendShipRequest, FriendShipResponse } from "@/types/friendShip/sendRequest";
import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function acceptRequest(request:FriendShipRequest){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/friendShip/accept`;
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(request)
        })
        const result:RouteResponse<FriendShipResponse> = await response.json();
        if(!response.ok){
            throw new Error(result.message);
        }
        return result.data;
    }
    catch(err){
            throw err;
    }
}