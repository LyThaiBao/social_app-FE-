import { FriendRequest } from "@/types/notification/friendRequest";
import { NewMessageResponse } from "@/types/notification/newMessage";
import { NotificationResponse } from "@/types/notification/notificationResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";

export async function getAllNotification(memberId:number){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notification`;
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({memberId:memberId}),
            credentials:"include"
        })

        const result:RouteResponse<NotificationResponse<FriendRequest|NewMessageResponse>[]> = await response.json();
        console.log("[service Log]: ",result)
        if(!response.ok){
            throw new Error(result.message);
        }

        return result.data;
    }
    catch(err){
        throw err;
    }
}