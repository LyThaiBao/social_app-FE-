import { FriendShipDetail } from "@/types/friendShip/friendShipDetail";
import { FriendShipRequest } from "@/types/friendShip/sendRequest";
import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function getByBothId({token,request}:{token:string,request:FriendShipRequest}){
    
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/friendShip/check`;
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Cookie:`accessToken=${token}`
            },
            body:JSON.stringify(request)
        })

        const result:RouteResponse<FriendShipDetail> = await response.json();
        console.log(">> RESULT: ",result)
        if(!response.ok){
            throw new Error(result.message);
        }
        return result.data;
    }
    catch(err){
        throw err;
    }
}