import { FriendShipRequest, FriendShipResponse } from "@/types/friendShip/sendRequest";
import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function unfriend(request:FriendShipRequest){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/friendShip/unfriend`;
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
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