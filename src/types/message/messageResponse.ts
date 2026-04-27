import { MessageType } from "@/enums/messageType";

export interface MessageResponse{
    content:string;
    mediaUrl:string;
    conversationId:number;
    senderId:number;
    senderName:string;
    sentTime:string;
    messageType:MessageType;
}