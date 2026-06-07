import { FriendRequest } from "@/types/notification/friendRequest";
import { NewMessageResponse } from "@/types/notification/newMessage";
import { NotificationResponse } from "@/types/notification/notificationResponse";
import { RouteResponse } from "@/types/routeResponse/routeResponse";
import { apiClient } from "../axios/apiClient";

export async function getAllNotification(memberId:number){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notification`;
    try{
       
        const response = await apiClient.post<RouteResponse<NotificationResponse<FriendRequest|NewMessageResponse>[]>>(url,{memberId:memberId})

        const result:RouteResponse<NotificationResponse<FriendRequest|NewMessageResponse>[]> = response.data;

        return result.data;
    }
    catch(err){
        throw err;
    }
}