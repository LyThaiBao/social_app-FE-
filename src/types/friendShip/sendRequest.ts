
export interface FriendShipRequest{
    requesterId:number;
    addresserId:number;
}

export interface FriendShipResponse{
    statusText:string;
    createdAt:Date;
    message:string;
}