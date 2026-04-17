import { FriendStatus } from "@/enums/friendStatus";

export interface FriendShipDetail{
    id:string|number;
    requesterId:number;
    addresserId:number;
    friendShipType:FriendStatus
}